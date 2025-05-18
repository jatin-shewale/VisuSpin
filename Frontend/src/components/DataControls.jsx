import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, ChartBarIcon, ChartPieIcon, ListBulletIcon, CurrencyDollarIcon, HashtagIcon } from '@heroicons/react/24/outline';

function DataControls({ onGenerate, dataType, setDataType, theme, view, setView }) {
  const [count, setCount] = useState(15);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [animation, setAnimation] = useState(false);

  const handleGenerate = () => {
    setAnimation(true);
    setTimeout(() => {
      onGenerate(count);
      setAnimation(false);
    }, 500);
  };

  const dataTypes = [
    { id: 'numbers', icon: HashtagIcon, label: 'Numbers' },
    { id: 'percentages', icon: ChartBarIcon, label: 'Percentages' },
    { id: 'currency', icon: CurrencyDollarIcon, label: 'Currency' }
  ];

  const views = [
    { id: 'bar', icon: ChartBarIcon, label: 'Bar Chart' },
    { id: 'pie', icon: ChartPieIcon, label: 'Pie Chart' },
    { id: 'list', icon: ListBulletIcon, label: 'List View' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 transition-colors duration-300`}
    >
      <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
        <SparklesIcon className="w-5 h-5 mr-2 text-blue-500" />
        Data Controls
      </h2>

      {/* Visualization Type */}
      <div className="mb-8">
        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Visualization Type</label>
        <div className="flex gap-3 justify-between">
          {views.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl text-base font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full ${
                view === id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                  : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`
              }`}
            >
              <Icon className="w-7 h-7 mb-1" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Data Type */}
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Data Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {dataTypes.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setDataType(id)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-105 ${
                  dataType === id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Number of Items
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {count}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Min Value
              </label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(parseInt(e.target.value))}
                className={`w-full rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Max Value
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(parseInt(e.target.value))}
                className={`w-full rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        <motion.button
          onClick={handleGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center ${
            animation ? 'animate-pulse' : ''
          }`}
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          Generate Data
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DataControls; 