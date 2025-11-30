'use client';

import { useState } from 'react';
import { Reservation } from '@/types';
import { api } from '@/lib/api';

interface ReservationCardProps {
  reservation: Reservation;
  onDelete?: () => void;
}

export default function ReservationCard({
  reservation,
  onDelete,
}: ReservationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите отменить это бронирование?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.reservations.delete(reservation.id);
      if (onDelete) {
        onDelete();
      }
    } catch (err: any) {
      alert('Ошибка при отмене бронирования');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-2">
            Переговорка #{reservation.meetingroom_id}
          </div>
          <div className="space-y-1">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Начало:</span>{' '}
              <span className="text-gray-900">
                {formatDate(reservation.from_reserve)}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-700">Окончание:</span>{' '}
              <span className="text-gray-900">
                {formatDate(reservation.to_reserve)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Отмена...' : 'Отменить'}
        </button>
      </div>
    </div>
  );
}

