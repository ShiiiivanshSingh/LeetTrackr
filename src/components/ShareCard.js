"use client";
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

export default function ShareCard({ stats, username }) {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    try {
      if (cardRef.current) {
        // Add a temporary background for the capture
        const originalBg = cardRef.current.style.background;
        cardRef.current.style.background = 'linear-gradient(to bottom right, rgb(15 23 42), rgb(88 28 135), rgb(15 23 42))';
        
        const canvas = await html2canvas(cardRef.current, {
          scale: 2, // Higher resolution
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
        });
        
        // Restore original background
        cardRef.current.style.background = originalBg;

        // Convert to blob for better quality
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `leettrackr-${username}-stats.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 'image/png', 1.0);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex flex-col items-center gap-4"
    >
      <div
        ref={cardRef}
        className="p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 max-w-lg w-full"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-2xl font-bold text-purple-400 shrink-0">
              LeetTrackr Stats
            </h3>
            <span className="text-gray-400 text-sm break-all">
              @{username}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Solved</p>
              <p className="text-2xl font-bold text-purple-400">
                {stats.submitStats.acSubmissionNum[0].count}
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-pink-400">
                {((stats.submitStats.acSubmissionNum[0].submissions / 
                   stats.submitStats.totalSubmissionNum[0].submissions) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Difficulty Distribution */}
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Difficulty Breakdown</p>
            <div className="space-y-2">
              {stats.submitStats.acSubmissionNum.slice(1).map((item) => (
                <div key={item.difficulty} className="flex items-center gap-2">
                  <span className="text-sm text-gray-300 w-16">{item.difficulty}</span>
                  <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.count / stats.submitStats.acSubmissionNum[0].count) * 100}%`,
                        backgroundColor: item.difficulty === 'Easy' ? '#00b8a3' : 
                                      item.difficulty === 'Medium' ? '#ffc01e' : '#ff375f'
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-300 w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center space-y-1">
            <div className="text-sm text-gray-400">
              Generated with LeetTrackr
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span>leettrackr.vercel.app</span>
              <span>•</span>
              <span>by Shivansh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Stats Card
      </button>
    </motion.div>
  );
} 