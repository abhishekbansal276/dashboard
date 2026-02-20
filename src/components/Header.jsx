import { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';
import './Header.css';

export default function Header({ title }) {
    const [time, setTime] = useState(new Date());
    const [notifOpen, setNotifOpen] = useState(false);

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fmtDate = (d) => d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <header className="app-header">
            <div className="header-left">
                <h1 className="page-title">{title}</h1>
                <span className="header-date">{fmtDate(time)} · {fmt(time)}</span>
            </div>
            <div className="header-right">
                <div className="search-wrapper">
                    <Search size={15} className="search-icon" />
                    <input className="search-input" placeholder="Search..." />
                </div>
                <button
                    className={`icon-btn notif-btn ${notifOpen ? 'active' : ''}`}
                    onClick={() => setNotifOpen(o => !o)}
                >
                    <Bell size={18} />
                    <span className="notif-dot" />
                </button>
                <div className="header-avatar">
                    <div className="avatar-placeholder" style={{ width: 36, height: 36, fontSize: 14 }}>AB</div>
                </div>
            </div>
        </header>
    );
}
