import os

from flask import Blueprint, request, jsonify, session


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/admin"
)


ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "epic123")


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Login details are required"
        }), 400

    username = data.get("username")
    password = data.get("password")

    if (
        username == ADMIN_USERNAME
        and password == ADMIN_PASSWORD
    ):
        session["admin_logged_in"] = True

        return jsonify({
            "message": "Login successful",
            "authenticated": True
        }), 200

    return jsonify({
        "error": "Invalid username or password"
    }), 401


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("admin_logged_in", None)

    return jsonify({
        "message": "Logged out successfully"
    }), 200


@auth_bp.route("/me", methods=["GET"])
def me():
    if not session.get("admin_logged_in"):
        return jsonify({
            "authenticated": False
        }), 401

    return jsonify({
        "authenticated": True
    }), 200
