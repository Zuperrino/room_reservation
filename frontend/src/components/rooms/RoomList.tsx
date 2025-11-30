'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { MeetingRoom } from '@/types';
import RoomCard from './RoomCard';

export default function RoomList() {
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await api.rooms.getAll();
        setRooms(data);
      } catch (err: any) {
        setError('Ошибка загрузки переговорок');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-800">{error}</div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Нет доступных переговорок</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

