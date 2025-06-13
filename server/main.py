from flask import Flask, jsonify
from config.config import DEBUG
from config.config import PORT
from config.config import HOST
from data.fake_data import users


app = Flask(__name__)


@app.route("/api/me")
def me_api():
    return jsonify({"name": "Nestor", "age": 18})


@app.route("/api/users")
def users_api():
    return jsonify(users)


if __name__ == "__main__":
    app.run(debug=DEBUG, port=int(PORT), host=HOST)
