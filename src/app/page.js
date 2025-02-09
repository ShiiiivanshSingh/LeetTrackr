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
import ShareCard from '@/components/ShareCard';
import dynamic from 'next/dynamic';

// The ShareCard component needs to be client-side only due to html2canvas
const DynamicShareCard = dynamic(() => import('@/components/ShareCard'), {
  ssr: false
});

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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="backdrop-blur-md bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                  </p>
                </div>
              </motion.div>
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
                          backgroundColor: 'rgba(17, 24, 39, 0.9)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          color: '#fff',
                          outline: 'none'
                        }}
                        formatter={(value, name) => [
                          <span key={`value-${name}`} style={{ color: '#fff' }}>{value}</span>,
                          <span key={`name-${name}`} style={{ color: '#fff' }}>{name}</span>
                        ]}
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

              {/* Share Card and Buttons */}
              <div className="space-y-4 flex flex-col items-center">
                <DynamicShareCard stats={stats} username={username} />
                
                {/* Share Buttons Container */}
                <div className="space-y-4 flex flex-col items-center">
                  {/* Twitter Share Button */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `🎯 My LeetCode Stats:\n` +
                      `✅ Problems Solved: ${stats.submitStats.acSubmissionNum[0].count}\n` +
                      `📈 Success Rate: ${((stats.submitStats.acSubmissionNum[0].submissions / 
                        stats.submitStats.totalSubmissionNum[0].submissions) * 100).toFixed(1)}%\n` +
                      `\nCheck out your LeetCode Stats with LeetTrackr by @de_mirage_fan! \n🚀\t leet-trackr-one.vercel.app`
                    )}`}


                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Share on Twitter
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}