import { Link } from 'react-router-dom';
import { Users, CreditCard, Upload, Database } from 'lucide-react';

const Dashboard = () => {
  const cards = [
    {
      title: 'Users',
      description: 'View and manage all users',
      icon: Users,
      link: '/users',
      color: 'bg-blue-500',
    },
    {
      title: 'Transactions',
      description: 'View all transaction records',
      icon: CreditCard,
      link: '/transactions',
      color: 'bg-green-500',
    },
    {
      title: 'Upload Data',
      description: 'Upload new zip files with user data',
      icon: Upload,
      link: '/upload',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the admin dashboard. Monitor user data and transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${card.color} rounded-md p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;