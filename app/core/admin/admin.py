from sqladmin import Admin
from sqladmin.models import ModelView
from app.core.db import engine
from app.models import MeetingRoom, Reservation, User
from fastapi import FastAPI


def init_admin(app: FastAPI) -> Admin:
    admin = Admin(app, engine)

    class UserAdmin(ModelView, model=User):
        column_list = [
            User.email,
            User.is_active,
            User.is_superuser,
            User.is_verified,
        ]

    class MeetingRoomAdmin(ModelView, model=MeetingRoom):
        column_list = [
            MeetingRoom.name,
            MeetingRoom.description,
        ]

    class ReservationAdmin(ModelView, model=Reservation):
        column_list = [
            Reservation.from_reserve,
            Reservation.to_reserve,
            Reservation.meetingroom_id,
            Reservation.user_id,
        ]

    admin.add_view(UserAdmin)
    admin.add_view(MeetingRoomAdmin)
    admin.add_view(ReservationAdmin)

    return admin
