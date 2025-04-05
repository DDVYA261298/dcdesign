import { Home, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">DC Design Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <LogOut className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
