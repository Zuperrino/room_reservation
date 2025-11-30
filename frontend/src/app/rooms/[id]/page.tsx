'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import BookingForm from '@/components/reservations/BookingForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { api } from '@/lib/api';
import { MeetingRoom, Reservation } from '@/types';

export default function RoomPage() {
  const params = useParams();
  const roomId = parseInt(params.id as string);
  const [room, setRoom] = useState<MeetingRoom | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRoomData = async () => {
    try {
      setIsLoading(true);
      const [roomData, reservationsData] = await Promise.all([
        api.rooms.getById(roomId),
        api.rooms.getReservations(roomId),
      ]);
      setRoom(roomData);
      setReservations(reservationsData);
    } catch (err: any) {
      setError('Ошибка загрузки данных переговорки');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [roomId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error || !room) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">
              {error || 'Переговорка не найдена'}
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{room.name}</h1>
            {room.description && (
              <p className="mt-2 text-gray-600">{room.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BookingForm roomId={roomId} onSuccess={fetchRoomData} />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Предстоящие бронирования
              </h2>
              {reservations.length === 0 ? (
                <p className="text-gray-500">Нет предстоящих бронирований</p>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="border-l-4 border-primary-500 pl-4 py-2"
                    >
                      <div className="text-sm text-gray-600">
                        {formatDate(reservation.from_reserve)} -{' '}
                        {formatDate(reservation.to_reserve)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

