from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.validators import (
    check_meeting_room_exists,
    check_reservation_intersections,
    check_reservation_before_edit,
)
from app.core.db import get_async_session
from app.crud.reservation import reservation_crud
from app.schemas.reservation import (
    ReservationCreate, ReservationDB, ReservationUpdate
)
from app.core.user import current_user
from app.models.user import User

router = APIRouter()


@router.post('/', response_model=ReservationDB)
async def create_reservation(
        reservation: ReservationCreate,
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_user),
):
    await check_meeting_room_exists(
        reservation.meetingroom_id, session
    )
    await check_reservation_intersections(
        # Так как валидатор принимает **kwargs,
        # аргументы должны быть переданы с указанием ключей.
        from_reserve=reservation.from_reserve,
        to_reserve=reservation.to_reserve,
        meetingroom_id=reservation.meetingroom_id,
        session=session
    )
    new_reservation = await reservation_crud.create(
        reservation, session, user
    )
    return new_reservation


@router.get(
    '/',
    response_model=list[ReservationDB],
    dependencies=[Depends(current_user)],
)
async def get_all_reservations(
        session: AsyncSession = Depends(get_async_session)
):
    reservations = await reservation_crud.get_multi(session)
    return reservations


@router.delete('/{reservation_id}', response_model=ReservationDB)
async def delete_reservation(
        reservation_id: int,
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_user),
):
    """Только для суперюзеров и создателя бронирования"""
    reservation = await check_reservation_before_edit(
        reservation_id, session, user)
    reservation = await reservation_crud.remove(reservation, session)
    return reservation


@router.patch('/{reservation_id}', response_model=ReservationDB)
async def update_reservation(
        reservation_id: int,
        obj_in: ReservationUpdate,
        session: AsyncSession = Depends(get_async_session),
        user: User = Depends(current_user),
):
    """Только для суперюзеров и создателя бронирования"""
    reservation = await check_reservation_before_edit(
        reservation_id, session, user)
    await check_reservation_intersections(
        **obj_in.model_dump(),
        reservation_id=reservation_id,
        meetingroom_id=reservation.meetingroom_id,
        session=session
    )
    reservation = await reservation_crud.update(
        db_obj=reservation, obj_in=obj_in, session=session)
    return reservation

@router.get(
    '/my_reservations',
    response_model=list[ReservationDB],
    response_model_exclude={'user_id'},
)
async def get_my_reservations(
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_user),
):
    reservations = await reservation_crud.get_by_user(
        session=session, user=user)
    return reservations
