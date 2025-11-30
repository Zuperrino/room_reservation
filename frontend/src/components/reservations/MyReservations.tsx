'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Reservation } from '@/types';
import ReservationCard from './ReservationCard';

export default function MyReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const data = await api.reservations.getMy();
      setReservations(data);
    } catch (err: any) {
      setError('Ошибка загрузки бронирований');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = () => {
    fetchReservations();
  };

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

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">У вас пока нет бронирований</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

