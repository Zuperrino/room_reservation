from datetime import datetime, timezone, timedelta
from typing import Optional
from pydantic import BaseModel, model_validator, field_validator, Field

FROM_TIME = (
    datetime.now() + timedelta(minutes=10)
).isoformat(timespec='minutes')

TO_TIME = (
    datetime.now() + timedelta(hours=1)
).isoformat(timespec='minutes')


class ReservationBase(BaseModel):
    from_reserve: datetime = Field(examples=[FROM_TIME])
    to_reserve: datetime = Field(examples=[TO_TIME])

    class Config:
        extra = 'forbid'


class ReservationUpdate(ReservationBase):

    @field_validator('from_reserve')
    def check_from_reserve_later_than_now(cls, value):
        # Приводим текущее время к UTC
        now = datetime.now(timezone.utc)

        # Если value naive, считаем его UTC
        if value.tzinfo is None:
            value_utc = value.replace(tzinfo=timezone.utc)
        else:
            value_utc = value.astimezone(timezone.utc)

        if value_utc <= now:
            raise ValueError(
                'Время начала бронирования '
                'не может быть меньше текущего времени'
            )
        return value

    @model_validator(mode='after')
    def check_from_reserve_before_to_reserve(self):
        if self.from_reserve >= self.to_reserve:
            raise ValueError(
                'Время начала бронирования '
                'не может быть больше времени окончания'
            )
        return self


# Этот класс наследуем от ReservationUpdate с валидаторами.
class ReservationCreate(ReservationUpdate):
    meetingroom_id: int


# Класс ReservationDB нельзя наследовать от ReservationCreate:
# тогда унаследуется и валидатор check_from_reserve_later_than_now,
# и при получении старых объектов из БД он будет выдавать ошибку валидации:
# ведь их from_time вполне может быть меньше текущего времени.

class ReservationDB(ReservationBase):
    id: int
    meetingroom_id: int
    user_id: Optional[int]

    class Config:
        from_attributes = True  # orm_mode переименован в from_attributes
