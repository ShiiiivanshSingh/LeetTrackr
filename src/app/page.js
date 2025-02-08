"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchLeetCodeStats } from '@/utils/leetcode';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setStats(null);
    
    try {
      const userData = await fetchLeetCodeStats(username);
      setStats(userData);
    } catch (err) {
      setError(err.message || 'Failed to fetch LeetCode stats. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setStats(null);
    setError('');
  };

  const calculateSuccessRate = () => {
    if (!stats?.submitStats?.totalSubmissionNum?.[0]) return 0;
    const total = stats.submitStats.totalSubmissionNum[0].submissions;
    const accepted = stats.submitStats.acSubmissionNum[0].submissions;
    return ((accepted / total) * 100).toFixed(1);
  };

  const getDifficultyData = () => {
    if (!stats) return [];
    return stats.submitStats.acSubmissionNum.map(item => ({
      name: item.difficulty || 'All',
      value: item.count,
    }));
  };

  const DIFFICULTY_COLORS = {
    Easy: '#00b8a3',
    Medium: '#ffc01e',
    Hard: '#ff375f',
    All: '#8b5cf6',
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-slate-900 animate-pulse" />
      </div>

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto pt-20 px-4 pb-20"
      >
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            LeetCode Stats Tracker
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Track Your LeetCode Progress Like Never Before!
          </p>
        </motion.div>

        {/* Username Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-20"
        >
          <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your LeetCode username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                />
                {username && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Start Tracking'}
              </button>
            </div>
            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}
          </form>
        </motion.div>

        {/* Stats Display */}
        <AnimatePresence>
          {stats && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Main Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-200">Total Solved</h2>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                    {stats.submitStats.acSubmissionNum[0].count}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-200">Success Rate</h2>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                    {calculateSuccessRate()}%
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-200">Ranking</h2>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                    {stats.profile.ranking}
                  </p>
                </motion.div>
              </div>

              {/* Difficulty Distribution */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">Problem Solving Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getDifficultyData().slice(1)} // Exclude 'All'
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getDifficultyData().slice(1).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={DIFFICULTY_COLORS[entry.name]}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value) => <span className="text-gray-300">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
                >
                  <h2 className="text-2xl font-semibold mb-4 text-gray-200">Difficulty Breakdown</h2>
                  <div className="space-y-4">
                    {stats.submitStats.acSubmissionNum.slice(1).map((item, index) => (
                      <div key={item.difficulty} className="space-y-2">
                        <div className="flex justify-between text-gray-300">
                          <span>{item.difficulty}</span>
                          <span>{item.count} solved</span>
                        </div>
                        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(item.count / stats.submitStats.acSubmissionNum[0].count) * 100}%`,
                              backgroundColor: DIFFICULTY_COLORS[item.difficulty]
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
                >
                  <h2 className="text-2xl font-semibold mb-4 text-gray-200">Submission Stats</h2>
                  <div className="space-y-6">
                    {stats.submitStats.totalSubmissionNum.slice(1).map((item) => (
                      <div key={item.difficulty} className="space-y-2">
                        <div className="flex justify-between text-gray-300">
                          <span>{item.difficulty}</span>
                          <span>{item.submissions} submissions</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Success Rate</span>
                          <span>
                            {((stats.submitStats.acSubmissionNum.find(
                              x => x.difficulty === item.difficulty
                            ).submissions / item.submissions) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Additional Metrics */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20"
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">Additional Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-300">Total Submissions</h3>
                    <p className="text-2xl font-bold text-purple-400">
                      {stats.submitStats.totalSubmissionNum[0].submissions}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-300">Accepted Submissions</h3>
                    <p className="text-2xl font-bold text-green-400">
                      {stats.submitStats.acSubmissionNum[0].submissions}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-300">Contribution Points</h3>
                    <p className="text-2xl font-bold text-pink-400">
                      {stats.profile.reputation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}