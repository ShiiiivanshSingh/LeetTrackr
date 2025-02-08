"use client";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ShiiiivanshSingh",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shivansh-pratap-singh-23b3b92b1",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://x.com/de_mirage_fan",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/ShivanshPratapSingh/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
      )
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-slate-900 animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            About LeetTrackr
          </h1>
          <p className="text-lg text-gray-300/90">
            Your companion in the coding journey
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-8">
          <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Project Overview</h2>
            <p className="text-gray-300/90 leading-relaxed">
              LeetCode Stats Tracker is a modern web application designed to help developers track their LeetCode progress with style. 
              Built with Next.js and TailwindCSS, it provides a beautiful and intuitive interface to monitor your coding journey.
            </p>
          </div>

          <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">How to Use</h2>
            <div className="space-y-4 text-gray-300/90">
              <p>Getting started with LeetTrackr is simple:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Visit your LeetCode profile page</li>
                <li>Your username is in the URL: leetcode.com/username</li>
                <li>Enter this username in LeetTrackr search box</li>
                <li>Click Start Tracking to view your statistics</li>
              </ol>
              <p className="mt-4 text-sm bg-white/5 p-4 rounded-lg">
                <span className="font-semibold">Pro tip:</span> Make sure your LeetCode profile is public to access all features!
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Try Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Contribute</h2>
            <div className="space-y-4 text-gray-300/90">
              <p>
                LeetTrackr is an open-source project and we welcome contributions from the community! Whether youre fixing bugs, adding features, or improving documentation, your help is valuable.
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Ways to contribute:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Report bugs and suggest features</li>
                  <li>Submit pull requests</li>
                  <li>Improve documentation</li>
                  <li>Share the project</li>
                </ul>
              </div>
              <div className="pt-4 flex justify-center">
                <a
                  href="https://github.com/ShiiiivanshSingh/LeetTrackr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View on GitHub
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Features</h2>
            <ul className="space-y-3 text-gray-300/90">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Real-time statistics tracking
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Beautiful, responsive design
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Interactive progress visualization
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Detailed submission history
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Connect With Me</h2>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white hover:-translate-y-0.5"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
} 