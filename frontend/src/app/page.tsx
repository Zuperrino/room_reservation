'use client';

import Layout from '@/components/layout/Layout';
import RoomList from '@/components/rooms/RoomList';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Доступные переговорки
            </h1>
            <p className="mt-2 text-gray-600">
              Выберите переговорку для бронирования
            </p>
          </div>
          <RoomList />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

