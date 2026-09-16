from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from models import db
from routes.booking_routes import booking_bp
from routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        supports_credentials=True,
        origins=[
        "http://localhost:5177",
        "http://127.0.0.1:5177"
    ]
)

    db.init_app(app)

    app.register_blueprint(booking_bp)
    app.register_blueprint(auth_bp)

    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return jsonify({
            "message": "Epic Hosts KE API is running"
        })

    @app.route("/api/health")
    def health():
        return jsonify({
            "status": "ok",
            "message": "Epic Hosts KE backend is healthy"
        })

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5001
    )