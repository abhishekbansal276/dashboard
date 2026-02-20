import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
    Shield, Users, ShoppingCart, Ticket, MoreHorizontal, UserCheck, UserX
} from 'lucide-react';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';

const ROLES = ['Admin', 'Editor', 'Viewer', 'Manager', 'Developer'];
const STATUSES = ['Active', 'Pending', 'Suspended'];

function generateUsers(n = 60) {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank', 'Iris', 'Jack', 'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rose', 'Sam', 'Tina'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore'];
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.io', 'mail.dev'];

    return Array.from({ length: n }, (_, i) => {
        const fn = firstNames[i % firstNames.length];
        const ln = lastNames[i % lastNames.length];
        const status = STATUSES[Math.floor(Math.random() * 3)];
        const joined = new Date(Date.now() - Math.random() * 365 * 3 * 24 * 3600000);
        return {
            id: i + 1,
            name: `${fn} ${ln}`,
            initials: `${fn[0]}${ln[0]}`,
            email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${domains[i % domains.length]}`,
            role: ROLES[i % ROLES.length],
            status,
            joined: joined.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            orders: Math.floor(Math.random() * 200),
            color: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'][i % 5],
        };
    });
}

const ALL_USERS = generateUsers(60);

const ADMIN_METRICS = [
    { title: 'Total Users', value: 60, prefix: '', change: 8.4, changeLabel: 'new this month', icon: Users, color: '#6366f1' },
    { title: 'Total Orders', value: 4821, prefix: '', change: 14.2, changeLabel: 'orders processed', icon: ShoppingCart, color: '#06b6d4' },
    { title: 'Revenue', value: 189430, prefix: '$', change: 6.8, changeLabel: 'monthly revenue', icon: Shield, color: '#10b981' },
    { title: 'Support Tickets', value: 38, prefix: '', change: -12.4, changeLabel: 'open tickets', icon: Ticket, color: '#f59e0b' },
];

const statusStyle = {
    Active: 'badge-green',
    Pending: 'badge-amber',
    Suspended: 'badge-red',
};

const PAGE_SIZE = 10;

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AdminPanel() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortKey, setSortKey] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('asc'); }
        setPage(1);
    };

    const filtered = useMemo(() => {
        let data = ALL_USERS;
        if (search) data = data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
        if (roleFilter !== 'All') data = data.filter(u => u.role === roleFilter);
        if (statusFilter !== 'All') data = data.filter(u => u.status === statusFilter);
        data = [...data].sort((a, b) => {
            const av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
            return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        });
        return data;
    }, [search, roleFilter, statusFilter, sortKey, sortDir]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const SortIcon = ({ k }) => sortKey !== k ? null : sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;

    return (
        <>
            <Header title="Admin Panel" />
            <div className="page-body page-enter">
                {/* KPI */}
                <motion.div className="grid-4 mb-6" variants={stagger} initial="hidden" animate="show">
                    {ADMIN_METRICS.map((m, i) => <MetricCard key={m.title} {...m} index={i} />)}
                </motion.div>

                {/* Table Card */}
                <motion.div className="card" variants={fadeUp} initial="hidden" animate="show" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Toolbar */}
                    <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                className="input"
                                style={{ paddingLeft: 32 }}
                                placeholder="Search users..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                            />
                        </div>
                        <select className="input" style={{ width: 130 }} value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
                            <option value="All">All Roles</option>
                            {ROLES.map(r => <option key={r}>{r}</option>)}
                        </select>
                        <select className="input" style={{ width: 140 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
                            <option value="All">All Statuses</option>
                            {STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{filtered.length} users</div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    {[['id', '#'], ['name', 'User'], ['email', 'Email'], ['role', 'Role'], ['status', 'Status'], ['orders', 'Orders'], ['joined', 'Joined']].map(([k, label]) => (
                                        <th key={k} onClick={() => handleSort(k)} style={{ cursor: 'pointer' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{label} <SortIcon k={k} /></span>
                                        </th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageData.map((u, i) => (
                                    <motion.tr
                                        key={u.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                    >
                                        <td style={{ color: 'var(--text-muted)', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>#{u.id.toString().padStart(3, '0')}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${u.color}22`, border: `1.5px solid ${u.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: u.color, flexShrink: 0 }}>{u.initials}</div>
                                                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{u.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{u.email}</td>
                                        <td><span className={`badge ${u.role === 'Admin' ? 'badge-purple' : u.role === 'Manager' ? 'badge-cyan' : 'badge-amber'}`}>{u.role}</span></td>
                                        <td><span className={`badge badge-dot ${statusStyle[u.status]}`}>{u.status}</span></td>
                                        <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: 'var(--text-primary)' }}>{u.orders}</td>
                                        <td style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{u.joined}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 11, gap: 3 }} title="Approve"><UserCheck size={12} /></button>
                                                <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 11, gap: 3, color: 'var(--accent-red)', borderColor: 'rgba(239,68,68,0.25)' }} title="Suspend"><UserX size={12} /></button>
                                                <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 11 }}><MoreHorizontal size={12} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button className="btn btn-ghost" style={{ padding: '6px 10px' }} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const p = i + 1;
                                return (
                                    <button key={p} className="btn btn-ghost" onClick={() => setPage(p)}
                                        style={{ padding: '6px 12px', minWidth: 36, background: page === p ? 'rgba(99,102,241,0.15)' : '', borderColor: page === p ? 'var(--accent-purple)' : '', color: page === p ? 'var(--accent-purple)' : '' }}>
                                        {p}
                                    </button>
                                );
                            })}
                            <button className="btn btn-ghost" style={{ padding: '6px 10px' }} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
