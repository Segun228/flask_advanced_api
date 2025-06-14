from flask import Flask, jsonify, request
from flask_cors import CORS
from config.config import DEBUG
from config.config import PORT
from config.config import HOST
from data.fake_data import users


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def find_user_by_id(id, users=users):
    user_index = next((
        single_user_index for single_user_index, single_user
        in enumerate(users)
        if str(single_user["id"]) == str(id)), None)
    if user_index is not None:
        found_user = users[user_index]
        return user_index, found_user
    else:
        return None


@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify(users)


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = next((
        single_user for single_user in users
        if str(single_user["id"]) == str(user_id)), None)
    if user is None:
        return jsonify({"error": "user not found"}), 404
    return jsonify(user)


@app.route("/api/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    user_index, _ = find_user_by_id(user_id)
    if user_index is None:
        return jsonify({"error": "user not found"}), 404
    return jsonify(users.pop(user_index)), 200


@app.route("/api/users/<user_id>", methods=["PUT"])
def edit_user(user_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "no data provided with the request"}), 400
    username = data.get("username")
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    age = data.get("age")
    country = data.get("country")

    if (not username
            or not email
            or not first_name
            or not last_name
            or not isinstance(age, int)
            or not country):
        return jsonify({"error":
                        "invalid data provided with the request"}), 400

    result = find_user_by_id(user_id, users)
    if result is None:
        return jsonify({"error": "User not found"}), 404
    user_index, _ = result

    users[user_index].update({
        "username": username,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "age": age,
        "country": country
    })

    return jsonify({
            "message": "User edited successfully",
            "user": users[user_index]
        }), 200


@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "no data provided with the request"}), 400
    username = data.get("username")
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    age = data.get("age")
    country = data.get("country")

    if (not username
            or not email
            or not first_name
            or not last_name
            or not country):
        return jsonify({"error":
                        "invalid data provided with the request"}), 400
    try:
        age = int(age)
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid age format"}), 400

    new_id = max((int(user.get("id")) for user in users), default=0) + 1
    users.append({
        "id": new_id,
        "username": username,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "age": age,
        "country": country
    })

    return jsonify({
            "message": "User created successfully",
            "user": users[-1]
        }), 201


if __name__ == "__main__":
    app.run(debug=DEBUG, port=int(PORT), host=HOST)
