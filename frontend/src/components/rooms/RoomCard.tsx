'use client';

import Link from 'next/link';
import { MeetingRoom } from '@/types';

interface RoomCardProps {
  room: MeetingRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
      {room.description && (
        <p className="text-gray-600 mb-4">{room.description}</p>
      )}
      <Link
        href={`/rooms/${room.id}`}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Забронировать
      </Link>
    </div>
  );
}

