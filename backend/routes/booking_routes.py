from flask import Blueprint, request, jsonify

from backend.models import db, Booking


booking_bp = Blueprint(
    "booking",
    __name__,
    url_prefix="/api/bookings"
)


@booking_bp.route("/", methods=["POST"])
def create_booking():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No booking data provided"
        }), 400

    required_fields = [
        "name",
        "phone",
        "email",
        "event_type",
        "event_date",
        "location",
        "team_size",
        "budget",
        "message"
    ]

    missing_fields = [
        field
        for field in required_fields
        if not data.get(field)
    ]

    if missing_fields:
        return jsonify({
            "error": "Missing required fields",
            "fields": missing_fields
        }), 400

    from datetime import datetime

    try:
        event_date = datetime.strptime(
            data["event_date"],
            "%Y-%m-%d"
        ).date()
    except ValueError:
        return jsonify({
            "error": "Invalid event date. Use YYYY-MM-DD."
        }), 400

    booking = Booking(
        name=data["name"],
        phone=data["phone"],
        email=data["email"],
        event_type=data["event_type"],
        event_date=event_date,
        location=data["location"],
        team_size=data["team_size"],
        budget=data["budget"],
        message=data["message"]
    )

    db.session.add(booking)
    db.session.commit()


    return jsonify({
        "message": "Booking request submitted successfully",
        "booking": booking.to_dict()
    }), 201


@booking_bp.route("/", methods=["GET"])
def get_bookings():
    bookings = Booking.query.order_by(
        Booking.created_at.desc()
    ).all()

    return jsonify([
        booking.to_dict()
        for booking in bookings
    ]), 200


@booking_bp.route("/<int:booking_id>", methods=["GET"])
def get_booking(booking_id):
    booking = db.session.get(Booking, booking_id)

    if not booking:
        return jsonify({
            "error": "Booking not found"
        }), 404

    return jsonify({
        "booking": booking.to_dict()
    }), 200


@booking_bp.route("/<int:booking_id>/status", methods=["PATCH"])
def update_booking_status(booking_id):
    booking = db.session.get(Booking, booking_id)

    if not booking:
        return jsonify({
            "error": "Booking not found"
        }), 404

    data = request.get_json()

    if not data or not data.get("status"):
        return jsonify({
            "error": "Status is required"
        }), 400

    allowed_statuses = [
        "pending",
        "confirmed",
        "cancelled",
        "completed"
    ]

    new_status = data["status"].lower()

    if new_status not in allowed_statuses:
        return jsonify({
            "error": "Invalid status",
            "allowed_statuses": allowed_statuses
        }), 400

    booking.status = new_status

    db.session.commit()

    return jsonify({
        "message": "Booking status updated successfully",
        "booking": booking.to_dict()
    }), 200