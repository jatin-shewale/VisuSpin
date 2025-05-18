import { motion } from 'framer-motion';

function ListView({ data, theme }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="overflow-x-auto"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <tr>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              } uppercase tracking-wider`}
            >
              Item
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              } uppercase tracking-wider`}
            >
              Value
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              } uppercase tracking-wider`}
            >
              Percentage
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {data.map((row, index) => {
            const total = data.reduce((sum, curr) => sum + curr.value, 0);
            const percentage = ((row.value / total) * 100).toFixed(1);
            
            return (
              <motion.tr
                key={row.id}
                variants={item}
                className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                } transition-colors duration-150`}
              >
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {row.label}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {row.value}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span>{percentage}%</span>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}

export default ListView; 