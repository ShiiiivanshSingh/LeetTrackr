"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: 'https://github.com/ShiiiivanshSingh/LeetTrackr', label: 'Contribute', external: true },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full hover:bg-white/10 transition-colors duration-200"
        aria-label="Toggle Menu"
      >
        <div className="w-6 h-6 relative flex items-center justify-center">
          <span className={`absolute h-0.5 w-6 bg-gray-300 transform transition-all duration-300 ${
            isOpen ? 'rotate-45' : '-translate-y-1.5'
          }`} />
          <span className={`absolute h-0.5 w-6 bg-gray-300 transform transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`} />
          <span className={`absolute h-0.5 w-6 bg-gray-300 transform transition-all duration-300 ${
            isOpen ? '-rotate-45' : 'translate-y-1.5'
          }`} />
        </div>
      </button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed right-0 top-0 bottom-0 w-64 bg-black/80 backdrop-blur-xl z-50"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <motion.li
                      key={item.href}
                      whileHover={{ x: 4 }}
                      className="border-b border-white/5"
                    >
                      <Link
                        href={item.href}
                        className="block py-3 text-gray-300 hover:text-white transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 