from flask import Flask

app = Flask(__name__)


@app.route("/me")
def me_api():
    return "<p>Hello, World!</p>"


@app.route("/users")
def users_api():
    return "<p>Hello, World!</p>"


if __name__ == "__main__":
    app.run(debug=True, port=3000, host="localhost")
