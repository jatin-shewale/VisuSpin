import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChartBarIcon, ChartPieIcon, ListBulletIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { FaDownload, FaRandom } from 'react-icons/fa'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import ListView from './components/ListView'
import DataControls from './components/DataControls'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [view, setView] = useState('bar')
  const [data, setData] = useState([])
  const [dataType, setDataType] = useState('numbers')
  const [isGenerating, setIsGenerating] = useState(false)
  const [theme, setTheme] = useState('light')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    generateRandomData(15)
  }, [])

  const generateRandomData = (count = 10) => {
    setIsGenerating(true)
    setTimeout(() => {
      const newData = Array.from({ length: count }, (_, i) => ({
        id: i,
        label: `Item ${i + 1}`,
        value: Math.floor(Math.random() * 100) + 1
      }))
      setData(newData)
      setIsGenerating(false)
    }, 500)
  }

  // Filtered data based on filterText
  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(filterText.toLowerCase())
  )

  // Stats
  const values = filteredData.map(d => d.value)
  const sum = values.reduce((a, b) => a + b, 0)
  const mean = values.length ? (sum / values.length).toFixed(2) : 0
  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 0

  // Export as CSV
  const exportCSV = () => {
    const csv = [
      ['Label', 'Value'],
      ...filteredData.map(item => [item.label, item.value])
    ].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'visuspin-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Randomize data order
  const randomizeData = () => {
    setData(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  const views = [
    { id: 'bar', icon: ChartBarIcon, label: 'Bar Chart' },
    { id: 'pie', icon: ChartPieIcon, label: 'Pie Chart' },
    { id: 'list', icon: ListBulletIcon, label: 'List View' }
  ]

  return (
    <div className={`min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <Navbar theme={theme} setTheme={setTheme} view={view} setView={setView} />
      <main className="flex-1 flex flex-col pt-20 pb-20 px-0 w-full">
        <div className="flex flex-1 w-full h-full">
          <div className="flex flex-row h-full w-full gap-x-8 px-8">
            <div className="flex-shrink-0 w-[320px]">
              <DataControls 
                onGenerate={generateRandomData}
                dataType={dataType}
                setDataType={setDataType}
                theme={theme}
                view={view}
                setView={setView}
              />
            </div>
            <div className="flex-1 flex items-stretch">
              <div className={`w-full h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 transition-colors duration-300 flex flex-col`}>
                {/* Filter, Stats, Export, Randomize Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={filterText}
                      onChange={e => setFilterText(e.target.value)}
                      placeholder="Filter by label..."
                      className={`rounded-md px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${theme === 'dark' ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                      style={{ minWidth: 180 }}
                    />
                    <button
                      onClick={randomizeData}
                      className="ml-2 flex items-center px-3 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      title="Randomize Data"
                    >
                      <FaRandom className="mr-2" /> Randomize
                    </button>
                    <button
                      onClick={exportCSV}
                      className="ml-2 flex items-center px-3 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                      title="Export as CSV"
                    >
                      <FaDownload className="mr-2" /> Export CSV
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm font-medium">
                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200">Mean: {mean}</span>
                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200">Min: {min}</span>
                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200">Max: {max}</span>
                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200">Sum: {sum}</span>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex-1 min-h-0"
                  >
                    {isGenerating ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin" />
                      </div>
                    ) : (
                      <div className="w-full h-full max-h-[70vh] overflow-auto">
                        {view === 'bar' && <BarChart data={filteredData} theme={theme} />}
                        {view === 'pie' && <PieChart data={filteredData} theme={theme} />}
                        {view === 'list' && <ListView data={filteredData} theme={theme} />}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  )
}

export default App
