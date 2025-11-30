export interface Reservation {
  id: number;
  from_reserve: string;
  to_reserve: string;
  meetingroom_id: number;
  user_id?: number | null;
}

export interface ReservationCreate {
  from_reserve: string;
  to_reserve: string;
  meetingroom_id: number;
}

export interface ReservationUpdate {
  from_reserve?: string;
  to_reserve?: string;
}

