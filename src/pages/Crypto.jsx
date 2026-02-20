import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';

// Simulated asset data
const ASSETS = [
    { symbol: 'BTC', name: 'Bitcoin', price: 68420.50, change: 3.24, mktCap: '1.34T', vol: '28.4B', color: '#f59e0b', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 3840.20, change: 1.87, mktCap: '461B', vol: '14.2B', color: '#6366f1', icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', price: 192.40, change: -2.13, mktCap: '88B', vol: '4.8B', color: '#10b981', icon: '◎' },
    { symbol: 'BNB', name: 'BNB', price: 582.10, change: 0.94, mktCap: '85B', vol: '2.1B', color: '#f59e0b', icon: 'B' },
    { symbol: 'AAPL', name: 'Apple Inc', price: 219.86, change: 0.62, mktCap: '3.33T', vol: '52.4M', color: '#06b6d4', icon: '' },
    { symbol: 'TSLA', name: 'Tesla', price: 248.42, change: -1.44, mktCap: '793B', vol: '98.2M', color: '#ef4444', icon: '' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 875.13, change: 5.21, mktCap: '2.15T', vol: '44.8M', color: '#10b981', icon: '' },
    { symbol: 'MSFT', name: 'Microsoft', price: 420.55, change: 0.38, mktCap: '3.12T', vol: '22.1M', color: '#06b6d4', icon: '' },
];

const TICKER_SYMBOLS = [...ASSETS, ...ASSETS];

function generateChartData(basePrice, points = 30) {
    let p = basePrice * 0.92;
    return Array.from({ length: points }, (_, i) => {
        p += (Math.random() - 0.47) * (basePrice * 0.012);
        return { i, price: Math.max(p, basePrice * 0.7).toFixed(2) };
    });
}

const TABS = ['1H', '1D', '1W', '1M'];

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px', backdropFilter: 'blur(20px)' }}>
            <p style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700 }}>${Number(payload[0].value).toLocaleString()}</p>
        </div>
    );
};

const PORTFOLIO_METRICS = [
    { title: 'Portfolio Value', value: 284930, prefix: '$', change: 4.2, changeLabel: 'today\'s gain', icon: TrendingUp, color: '#6366f1' },
    { title: 'Total P&L', value: 12843, prefix: '+$', change: 9.7, changeLabel: 'all time', icon: TrendingUp, color: '#10b981' },
    { title: 'BTC Dominance', value: 52, prefix: '', suffix: '%', change: 1.2, changeLabel: 'market share', icon: Bitcoin, color: '#f59e0b' },
    { title: 'Open Positions', value: 8, prefix: '', change: 0, changeLabel: 'active trades', icon: TrendingUp, color: '#06b6d4' },
];

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export default function Crypto() {
    const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
    const [activeTab, setActiveTab] = useState('1D');
    const [chartData, setChartData] = useState(() => generateChartData(ASSETS[0].price));
    const [prices, setPrices] = useState(() => Object.fromEntries(ASSETS.map(a => [a.symbol, a.price])));

    // Simulate live price updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => {
                const next = { ...prev };
                ASSETS.forEach(a => {
                    next[a.symbol] = +(prev[a.symbol] * (1 + (Math.random() - 0.499) * 0.002)).toFixed(2);
                });
                return next;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSelect = (asset) => {
        setSelectedAsset(asset);
        setChartData(generateChartData(asset.price));
    };

    return (
        <>
            <Header title="Crypto & Stock Market" />
            <div className="page-body page-enter">

                {/* Ticker */}
                <motion.div
                    className="card mb-6"
                    style={{ padding: '12px 20px', overflow: 'hidden' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                    <div className="ticker-container">
                        <div className="ticker-track">
                            {TICKER_SYMBOLS.map((a, i) => {
                                const livePrice = prices[a.symbol] || a.price;
                                const up = a.change >= 0;
                                return (
                                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 28px', borderRight: i < TICKER_SYMBOLS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                        <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{a.symbol}</span>
                                        <span style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>${livePrice.toLocaleString()}</span>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: up ? '#10b981' : '#ef4444' }}>
                                            {up ? '▲' : '▼'} {Math.abs(a.change)}%
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Portfolio Metrics */}
                <motion.div className="grid-4 mb-6" variants={stagger} initial="hidden" animate="show">
                    {PORTFOLIO_METRICS.map((m, i) => <MetricCard key={m.title} {...m} index={i} />)}
                </motion.div>

                {/* Chart + Holdings */}
                <motion.div className="grid-2 mb-6" variants={stagger} initial="hidden" animate="show">
                    {/* Price Chart */}
                    <motion.div className="card" variants={fadeUp}>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="section-title">{selectedAsset.name} <span style={{ color: selectedAsset.color }}>({selectedAsset.symbol})</span></div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
                                    <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                        ${(prices[selectedAsset.symbol] || selectedAsset.price).toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: selectedAsset.change >= 0 ? '#10b981' : '#ef4444' }}>
                                        {selectedAsset.change >= 0 ? '▲' : '▼'} {Math.abs(selectedAsset.change)}%
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {TABS.map(t => (
                                    <button key={t} onClick={() => { setActiveTab(t); setChartData(generateChartData(selectedAsset.price)); }} className="btn btn-ghost" style={{ padding: '5px 12px', fontSize: 12, background: activeTab === t ? 'rgba(99,102,241,0.15)' : '', borderColor: activeTab === t ? 'var(--accent-purple)' : '', color: activeTab === t ? 'var(--accent-purple)' : '' }}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="chart-wrapper-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={selectedAsset.color} stopOpacity={0.4} />
                                            <stop offset="95%" stopColor={selectedAsset.color} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis hide />
                                    <YAxis domain={['auto', 'auto']} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${Number(v).toLocaleString()}`} width={70} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="price" stroke={selectedAsset.color} strokeWidth={2.5} fill="url(#priceGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Asset Selector Mini */}
                    <motion.div className="card" variants={fadeUp} style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                            <div className="section-title">Assets</div>
                        </div>
                        <div style={{ overflow: 'auto', maxHeight: 380 }}>
                            {ASSETS.map((a) => {
                                const lp = prices[a.symbol] || a.price;
                                const up = a.change >= 0;
                                const active = selectedAsset.symbol === a.symbol;
                                return (
                                    <div key={a.symbol} onClick={() => handleSelect(a)}
                                        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer', background: active ? `${a.color}14` : 'transparent', borderLeft: active ? `3px solid ${a.color}` : '3px solid transparent', transition: 'all 0.2s ease' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}22`, border: `1px solid ${a.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, color: a.color, flexShrink: 0 }}>
                                            {a.icon || a.symbol[0]}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{a.symbol}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.name}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>${lp.toLocaleString()}</div>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: up ? '#10b981' : '#ef4444' }}>{up ? '▲' : '▼'} {Math.abs(a.change)}%</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Holdings Table */}
                <motion.div className="card" variants={fadeUp} initial="hidden" animate="show">
                    <div className="section-title mb-4">Holdings</div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Asset</th><th>Price</th><th>24h Change</th><th>Market Cap</th><th>Volume</th><th>Holdings</th><th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ASSETS.slice(0, 6).map((a, i) => {
                                    const lp = prices[a.symbol] || a.price;
                                    const up = a.change >= 0;
                                    const holdings = [0.84, 5.2, 42, 2.1, 15, 3.8][i];
                                    return (
                                        <tr key={a.symbol}>
                                            <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: a.color, fontSize: 13 }}>{a.icon || a.symbol[0]}</div>
                                                <div><div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13 }}>{a.symbol}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.name}</div></div>
                                            </div></td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: 'var(--text-primary)' }}>${lp.toLocaleString()}</td>
                                            <td><span className={`badge ${up ? 'badge-green' : 'badge-red'}`}>{up ? '▲' : '▼'} {Math.abs(a.change)}%</span></td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{a.mktCap}</td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{a.vol}</td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{holdings} {a.symbol}</td>
                                            <td style={{ fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>${(holdings * lp).toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
