from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)

    # Client details
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(120), nullable=False)

    # Event details
    event_type = db.Column(db.String(100), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(200), nullable=False)

    # Booking requirements
    team_size = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

    # Booking management
    status = db.Column(
        db.String(30),
        nullable=False,
        default="pending"
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "event_type": self.event_type,
            "event_date": (
                self.event_date.isoformat()
                if self.event_date
                else None
            ),
            "location": self.location,
            "team_size": self.team_size,
            "budget": self.budget,
            "message": self.message,
            "status": self.status,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }