import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to DC Design</h1>
        <p className="text-lg mb-6">Manage your projects and inquiries efficiently.</p>
        <Link 
          href="/admin/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Go to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
