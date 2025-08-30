import { useParams, Link } from "react-router-dom";
import { useUser } from "../hooks/useUsers";
import { ArrowLeft, Calendar, Phone, MapPin, CreditCard } from "lucide-react";

const UserDetail = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useUser(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error loading user: {error.message}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/users" className="inline-flex items-center text-blue-600 hover:text-blue-500">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-20 w-20">
              {user.avatarPath ? (
                <img
                  className="h-20 w-20 rounded-full"
                  src={`${import.meta.env.VITE_API_URL}/avatars/${user.avatarPath}`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-700">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">User Details</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Country
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{user.country}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Birthday
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user.birthday).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {user.transactions && user.transactions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Transactions ({user.transactions.length})
          </h2>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {user.transactions.map((transaction) => (
                <li key={transaction.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">#{transaction.reference}</p>
                      {transaction.message && (
                        <p className="text-sm text-gray-600 mt-1">{transaction.message}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.amount} {transaction.currency}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
