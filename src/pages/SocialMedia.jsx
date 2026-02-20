import { motion } from 'framer-motion';
import {
    LineChart, Line, BarChart, Bar, RadialBarChart, RadialBar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Instagram, Twitter, Youtube, Heart, MessageCircle, Share2, Eye, Users, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';

const PLATFORMS = [
    { name: 'Instagram', icon: Instagram, color: '#ec4899', followers: 284920, posts: 342, engagement: 4.8, growth: 12.4 },
    { name: 'Twitter/X', icon: Twitter, color: '#06b6d4', followers: 193840, posts: 1284, engagement: 2.3, growth: 5.7 },
    { name: 'YouTube', icon: Youtube, color: '#ef4444', followers: 142500, posts: 89, engagement: 6.1, growth: 18.2 },
    { name: 'TikTok', icon: Users, color: '#6366f1', followers: 420100, posts: 215, engagement: 8.4, growth: 31.5 },
];

const engagementData = [
    { day: 'Mon', likes: 1240, comments: 340, shares: 180 },
    { day: 'Tue', likes: 1890, comments: 420, shares: 240 },
    { day: 'Wed', likes: 1420, comments: 280, shares: 160 },
    { day: 'Thu', likes: 2100, comments: 580, shares: 310 },
    { day: 'Fri', likes: 2840, comments: 720, shares: 420 },
    { day: 'Sat', likes: 3200, comments: 880, shares: 500 },
    { day: 'Sun', likes: 2680, comments: 640, shares: 380 },
];

const demographicsData = [
    { age: '13-17', pct: 12 }, { age: '18-24', pct: 34 }, { age: '25-34', pct: 28 },
    { age: '35-44', pct: 16 }, { age: '45-54', pct: 7 }, { age: '55+', pct: 3 },
];

const growthData = [
    { name: 'TikTok', value: 31.5, fill: '#6366f1' },
    { name: 'YouTube', value: 18.2, fill: '#ef4444' },
    { name: 'Instagram', value: 12.4, fill: '#ec4899' },
    { name: 'Twitter', value: 5.7, fill: '#06b6d4' },
];

const topPosts = [
    { platform: 'Instagram', desc: 'Product launch reel', likes: 48200, comments: 1840, views: '280K', color: '#ec4899' },
    { platform: 'TikTok', desc: 'Behind the scenes', likes: 92400, comments: 3210, views: '1.2M', color: '#6366f1' },
    { platform: 'YouTube', desc: 'Tutorial series ep.8', likes: 18400, comments: 842, views: '94K', color: '#ef4444' },
    { platform: 'Twitter', desc: 'Thread: 10 growth tips', likes: 6240, comments: 380, views: '42K', color: '#06b6d4' },
];

const METRICS = [
    { title: 'Total Followers', value: 1041360, prefix: '', change: 14.2, changeLabel: 'across all platforms', icon: Users, color: '#ec4899' },
    { title: 'Total Posts', value: 1930, prefix: '', change: 8.4, changeLabel: 'this month', icon: Eye, color: '#6366f1' },
    { title: 'Avg Engagement', value: 53, prefix: '', suffix: '%', change: 2.1, changeLabel: 'engagement rate', icon: Heart, color: '#10b981' },
    { title: 'Monthly Reach', value: 4820000, prefix: '', change: 22.8, changeLabel: 'unique impressions', icon: TrendingUp, color: '#f59e0b' },
];

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(20px)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 6 }}>{label}</p>
            {payload.map((p, i) => <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>{p.name}: {p.value.toLocaleString()}</p>)}
        </div>
    );
};

function useCountUp(target) {
    const [v, setV] = useState(0);
    const { motion: m } = arguments[1] || {};
    import('react').then(({ useEffect }) => { });
    return v;
}

export default function SocialMedia() {
    return (
        <>
            <Header title="Social Media Dashboard" />
            <div className="page-body page-enter">
                {/* KPI */}
                <motion.div className="grid-4 mb-6" variants={stagger} initial="hidden" animate="show">
                    {METRICS.map((m, i) => <MetricCard key={m.title} {...m} index={i} />)}
                </motion.div>

                {/* Platform Cards */}
                <motion.div className="grid-4 mb-6" variants={stagger} initial="hidden" animate="show">
                    {PLATFORMS.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={p.name} className="card" variants={fadeUp}
                                style={{ '--card-color': p.color, borderColor: 'var(--border)', cursor: 'default' }}
                                whileHover={{ y: -4, boxShadow: `0 0 30px ${p.color}30`, borderColor: p.color }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}22`, border: `1px solid ${p.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={20} color={p.color} />
                                    </div>
                                    <span className="badge badge-green">+{p.growth}%</span>
                                </div>
                                <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>{p.followers.toLocaleString()}</div>
                                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>{p.name} Followers</div>
                                <div style={{ display: 'flex', gap: 14 }}>
                                    <div style={{ fontSize: 12 }}><span style={{ color: p.color, fontWeight: 700 }}>{p.posts}</span> <span style={{ color: 'var(--text-muted)' }}>posts</span></div>
                                    <div style={{ fontSize: 12 }}><span style={{ color: p.color, fontWeight: 700 }}>{p.engagement}%</span> <span style={{ color: 'var(--text-muted)' }}>engagement</span></div>
                                </div>
                                <div className="progress-bar" style={{ marginTop: 12 }}>
                                    <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${p.engagement * 10}%` }} transition={{ delay: i * 0.1 + 0.3, duration: 1 }} style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Engagement Chart + Growth Radial */}
                <motion.div className="grid-2 mb-6" variants={stagger} initial="hidden" animate="show">
                    <motion.div className="card" variants={fadeUp}>
                        <div className="section-title mb-4">Weekly Engagement</div>
                        <div className="chart-wrapper-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={engagementData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }} />
                                    <Line type="monotone" dataKey="likes" stroke="#ec4899" strokeWidth={2.5} dot={false} name="Likes" />
                                    <Line type="monotone" dataKey="comments" stroke="#6366f1" strokeWidth={2.5} dot={false} name="Comments" />
                                    <Line type="monotone" dataKey="shares" stroke="#10b981" strokeWidth={2.5} dot={false} name="Shares" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div className="card" variants={fadeUp}>
                        <div className="section-title mb-4">Platform Growth Rate</div>
                        <div style={{ height: 200 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={growthData} startAngle={90} endAngle={-270}>
                                    <RadialBar minAngle={15} background dataKey="value" cornerRadius={4} />
                                    <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)' }} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                            {growthData.map(g => (
                                <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: g.fill, flexShrink: 0 }} />
                                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{g.name}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>+{g.value}%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Top Posts + Demographics */}
                <motion.div className="grid-2" variants={stagger} initial="hidden" animate="show">
                    <motion.div className="card" variants={fadeUp}>
                        <div className="section-title mb-4">Top Performing Posts</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {topPosts.map((p, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < topPosts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}22`, border: `1px solid ${p.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ color: p.color, fontSize: 12, fontWeight: 700 }}>{p.platform[0]}</span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.desc}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.platform}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Heart size={11} /> {(p.likes / 1000).toFixed(1)}k</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MessageCircle size={11} /> {p.comments}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Eye size={11} /> {p.views}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="card" variants={fadeUp}>
                        <div className="section-title mb-4">Audience Demographics</div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={demographicsData} layout="vertical" barSize={16}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                                    <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                                    <YAxis type="category" dataKey="age" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} width={45} />
                                    <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)' }} />
                                    <Bar dataKey="pct" fill="#ec4899" radius={[0, 6, 6, 0]} name="Audience %">
                                        {demographicsData.map((_, i) => <Bar key={i} fill={`hsl(${310 + i * 12}, 70%, 60%)`} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
