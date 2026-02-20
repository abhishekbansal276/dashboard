import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, TrendingUp, Users, Settings,
    ChevronLeft, ChevronRight, Zap, Sun, Moon,
    BarChart2, Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

const NAV_ITEMS = [
    { path: '/', icon: BarChart2, label: 'Analytics', color: '#6366f1' },
    { path: '/crypto', icon: TrendingUp, label: 'Crypto/Stock', color: '#06b6d4' },
    { path: '/social', icon: Users, label: 'Social Media', color: '#ec4899' },
    { path: '/admin', icon: Shield, label: 'Admin Panel', color: '#10b981' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <motion.aside
            className="sidebar"
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* Logo */}
            <div className="sidebar-logo">
                <motion.div className="logo-icon" animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                    <Zap size={20} color="#6366f1" />
                </motion.div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.span
                            className="logo-text"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            NexaDash
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                        <NavLink key={item.path} to={item.path} className={`nav-item ${active ? 'nav-item--active' : ''}`} style={active ? { '--item-color': item.color } : {}}>
                            <motion.div
                                className="nav-icon"
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                style={active ? { color: item.color } : {}}
                            >
                                <Icon size={20} />
                            </motion.div>
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="nav-label"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {active && (
                                <motion.div className="nav-active-bar" layoutId="activeBar" style={{ background: item.color }} />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom controls */}
            <div className="sidebar-footer">
                <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
                    <motion.div
                        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>

                <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>
        </motion.aside>
    );
}
