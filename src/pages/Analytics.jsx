import { motion } from 'framer-motion';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import {
    DollarSign, Users, MousePointerClick, Clock,
    Activity, Eye, ArrowUpRight
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Header from '../components/Header';

const revenueData = [
    { name: 'Mon', revenue: 4200, expenses: 2400 },
    { name: 'Tue', revenue: 5800, expenses: 2200 },
    { name: 'Wed', revenue: 4900, expenses: 3100 },
    { name: 'Thu', revenue: 7200, expenses: 2900 },
    { name: 'Fri', revenue: 8100, expenses: 3400 },
    { name: 'Sat', revenue: 6700, expenses: 2100 },
    { name: 'Sun', revenue: 9400, expenses: 3800 },
];

const trafficData = [
    { name: 'Organic', visits: 4300 },
    { name: 'Social', visits: 3100 },
    { name: 'Direct', visits: 2800 },
    { name: 'Referral', visits: 1900 },
    { name: 'Email', visits: 1400 },
    { name: 'Paid', visits: 2600 },
];

const categoryData = [
    { name: 'Electronics', value: 32, color: '#6366f1' },
    { name: 'Fashion', value: 24, color: '#06b6d4' },
    { name: 'Home', value: 18, color: '#10b981' },
    { name: 'Sports', value: 14, color: '#f59e0b' },
    { name: 'Other', value: 12, color: '#ec4899' },
];

const activityData = [
    { time: '2m ago', msg: 'New user registered', type: 'user' },
    { time: '5m ago', msg: 'Order #4821 completed', type: 'order' },
    { time: '12m ago', msg: 'Revenue target reached 95%', type: 'revenue' },
    { time: '1h ago', msg: 'Server deployment successful', type: 'system' },
    { time: '2h ago', msg: '500 new signups today', type: 'user' },
];

const typeColor = { user: '#6366f1', order: '#10b981', revenue: '#f59e0b', system: '#06b6d4' };

const METRICS = [
    { title: 'Total Revenue', value: 284930, prefix: '$', change: 12.4, changeLabel: 'vs last month', icon: DollarSign, color: '#6366f1' },
    { title: 'Active Users', value: 48291, prefix: '', change: 8.1, changeLabel: 'vs last week', icon: Users, color: '#06b6d4' },
    { title: 'Conversions', value: 3842, prefix: '', suffix: '', change: 5.3, changeLabel: 'new this week', icon: MousePointerClick, color: '#10b981' },
    { title: 'Avg. Session', value: 427, prefix: '', suffix: 's', change: -2.1, changeLabel: 'session length', icon: Clock, color: '#f59e0b' },
];

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(20px)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 6 }}>{label}</p>
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
            ))}
        </div>
    );
};

export default function Analytics() {
    return (
        <>
            <Header title="Analytics Dashboard" />
            <div className="page-body page-enter">
                {/* KPI Row */}
                <motion.div className="grid-4 mb-6" variants={stagger} initial="hidden" animate="show">
                    {METRICS.map((m, i) => <MetricCard key={m.title} {...m} index={i} />)}
                </motion.div>

                {/* Charts Row 1 */}
                <motion.div className="grid-2 mb-6" variants={stagger} initial="hidden" animate="show">
                    <motion.div className="card" variants={fadeUp}>
                        <div className="flex justify-between items-center mb-4">
                            <div><div className="section-title">Revenue Overview</div><div className="section-subtitle">Weekly revenue vs expenses</div></div>
                            <span className="badge badge-green">↑ 12.4%</span>
                        </div>
                        <div className="chart-wrapper-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" />
                                    <Area type="monotone" dataKey="expenses" stroke="#06b6d4" strokeWidth={2.5} fill="url(#expGrad)" name="Expenses" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div className="card" variants={fadeUp}>
                        <div className="flex justify-between items-center mb-4">
                            <div><div className="section-title">Traffic Sources</div><div className="section-subtitle">Breakdown by channel</div></div>
                            <span className="badge badge-purple">7 days</span>
                        </div>
                        <div className="chart-wrapper-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trafficData} layout="vertical" barSize={14}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                                    <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="visits" fill="url(#barGrad)" radius={[0, 6, 6, 0]} name="Visits">
                                        {trafficData.map((_, i) => (
                                            <Cell key={i} fill={`hsl(${240 + i * 20}, 80%, 65%)`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Charts Row 2 */}
                <motion.div className="grid-2 mb-6" variants={stagger} initial="hidden" animate="show">
                    <motion.div className="card" variants={fadeUp}>
                        <div className="flex justify-between items-center mb-4">
                            <div><div className="section-title">Category Breakdown</div><div className="section-subtitle">Sales by category</div></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 260 }}>
                            <ResponsiveContainer width="60%" height="100%">
                                <PieChart>
                                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                                        {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {categoryData.map((c) => (
                                    <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                                        <span style={{ fontSize: 13, color: 'var(--text-secondary)', flexShrink: 0 }}>{c.name}</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginLeft: 'auto' }}>{c.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="card" variants={fadeUp}>
                        <div className="section-title mb-4">Recent Activity</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {activityData.map((a, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < activityData.length - 1 ? '1px solid var(--border)' : 'none' }}
                                >
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColor[a.type], flexShrink: 0, boxShadow: `0 0 8px ${typeColor[a.type]}` }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{a.msg}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                                    </div>
                                    <ArrowUpRight size={14} color="var(--text-muted)" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
