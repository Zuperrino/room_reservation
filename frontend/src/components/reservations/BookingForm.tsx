'use client';

import { useState, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '@/lib/api';
import { ReservationCreate } from '@/types';

interface BookingFormProps {
  roomId: number;
  onSuccess?: () => void;
}

export default function BookingForm({ roomId, onSuccess }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() + 10 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(Date.now() + 70 * 60 * 1000)
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const reservationData: ReservationCreate = {
        from_reserve: startDate.toISOString(),
        to_reserve: endDate.toISOString(),
        meetingroom_id: roomId,
      };

      await api.reservations.create(reservationData);
      setSuccess(true);
      
      // Сброс формы
      setStartDate(new Date(Date.now() + 10 * 60 * 1000));
      setEndDate(new Date(Date.now() + 70 * 60 * 1000));
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        'Ошибка бронирования. Возможно, это время уже занято.';
      setError(
        Array.isArray(errorMessage)
          ? errorMessage.map((e: any) => e.msg).join(', ')
          : errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Забронировать переговорку
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}
        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-800">
              Бронирование успешно создано!
            </div>
          </div>
        )}
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Начало бронирования
          </label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd.MM.yyyy HH:mm"
            minDate={new Date()}
            className="w-full"
            required
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Окончание бронирования
          </label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd.MM.yyyy HH:mm"
            minDate={startDate}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Бронирование...' : 'Забронировать'}
        </button>
      </form>
    </div>
  );
}

