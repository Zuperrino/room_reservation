export interface MeetingRoom {
  id: number;
  name: string;
  description?: string | null;
}

export interface MeetingRoomCreate {
  name: string;
  description?: string | null;
}

export interface MeetingRoomUpdate {
  name?: string;
  description?: string | null;
}

