import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/products" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Add, edit, or delete products</p>
          </Link>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Orders</h2>
            <p className="text-gray-600 dark:text-gray-400">View and manage orders (coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;