import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './MetricCard.css';

function useCountUp(target, duration = 1500) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start = Math.min(start + step, target);
            setValue(Math.floor(start));
            if (start >= target) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return value;
}

export default function MetricCard({ title, value, prefix = '', suffix = '', change, changeLabel, icon: Icon, color = '#6366f1', index = 0 }) {
    const cardRef = useRef(null);
    const numeric = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
    const count = useCountUp(numeric);

    const isPositive = change >= 0;

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    };

    return (
        <motion.div
            ref={cardRef}
            className="metric-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ '--card-color': color }}
        >
            <div className="metric-glow" />
            <div className="metric-top">
                <div className="metric-icon-wrap" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                    <Icon size={20} color={color} />
                </div>
                <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {Math.abs(change)}%
                </div>
            </div>
            <div className="metric-value">
                {prefix}<span>{count.toLocaleString()}</span>{suffix}
            </div>
            <div className="metric-label">{title}</div>
            {changeLabel && <div className="metric-sub">{changeLabel}</div>}
            <div className="metric-bar">
                <motion.div
                    className="metric-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.abs(numeric / 10), 100)}%` }}
                    transition={{ delay: index * 0.08 + 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                />
            </div>
        </motion.div>
    );
}
