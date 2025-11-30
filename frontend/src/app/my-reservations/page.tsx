'use client';

import Layout from '@/components/layout/Layout';
import MyReservations from '@/components/reservations/MyReservations';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function MyReservationsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Мои бронирования
            </h1>
            <p className="mt-2 text-gray-600">
              Список ваших текущих и предстоящих бронирований
            </p>
          </div>
          <MyReservations />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

