import { useTransactions } from '../hooks/useTransactions';
import { CreditCard, User, Calendar } from 'lucide-react';

const Transactions = () => {
  const { data: transactions, isLoading, error } = useTransactions();

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
        <div className="text-red-800">Error loading transactions: {error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="mt-1 text-gray-600">All transaction records in the system</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {transactions && transactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.reference}
                        </p>
                        {transaction.message && (
                          <p className="text-sm text-gray-600 mt-1">
                            {transaction.message}
                          </p>
                        )}
                        <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {transaction.user ? 
                              `${transaction.user.firstName} ${transaction.user.lastName}` : 
                              'Unknown User'
                            }
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(transaction.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {transaction.amount} {transaction.currency}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;