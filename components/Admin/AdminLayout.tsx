import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Sidebar />
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
