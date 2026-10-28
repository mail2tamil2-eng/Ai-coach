import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BookOpen, Clock, FileCheck, LayoutDashboard, Plus, XCircle } from 'lucide-react';
import logo from '../../../imports/AXLE-Korp-LOGO__2_.jpg';
import { AppHeader, AppSidebar, Button, DataTable, Pagination, StatWidget, StatusBadge, Avatar } from '.';

type Row = { id: number; name: string; status: 'published' | 'draft'; by: string; updated: string; modules: number };
const ROWS: Row[] = [
  { id: 1, name: 'Introduction to SCORM', status: 'published', by: 'John Doe', updated: '2026-01-30', modules: 2 },
  { id: 2, name: 'Introduction to Literature', status: 'published', by: 'John Doe', updated: '2026-01-30', modules: 2 },
  { id: 3, name: 'Technical Design Basics', status: 'draft', by: 'Dheva', updated: '2026-02-04', modules: 3 },
];

/** Header + sidebar + dashboard content, all SaaS components. */
function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [page, setPage] = useState(1);
  return (
    <div className="flex h-[900px] bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
      <AppSidebar
        groups={[{ items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'courses', label: 'Course Authoring', icon: BookOpen }] }]}
        activeId={active}
        onNavigate={setActive}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        logo={<img src={logo} alt="Axle KORP" className="h-9 w-auto max-w-[160px] object-contain" />}
        logoMark={<span className="block size-9 overflow-hidden rounded-lg"><img src={logo} alt="Axle KORP" className="size-full object-cover object-left" /></span>}
        footer={<>Powered by <b className="font-semibold">NOVACTECH</b></>}
        footerCollapsed={<b>NT</b>}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader userName="Dheva" notificationCount={2} />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="m-0 text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button leftIcon={<Plus />}>Create New Course</Button>
          </div>
          <div className="mb-6 grid grid-cols-3 gap-6">
            <StatWidget label="Total Course Created" value={3} icon={FileCheck} tone="blue" trend={12} />
            <StatWidget label="Total course in Draft" value={1} icon={Clock} tone="amber" />
            <StatWidget label="Used vs Available License" value={3} hint="47 Available license" icon={XCircle} tone="pink" />
          </div>
          <DataTable
            title="Recent Courses"
            subtitle="Your latest learning content"
            rows={ROWS}
            rowKey={(r) => r.id}
            columns={[
              { key: 'id', header: '#', cell: (r) => String(r.id).padStart(2, '0') },
              { key: 'name', header: 'Course Name' },
              { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
              { key: 'by', header: 'Created By', cell: (r) => <span className="flex items-center gap-2"><Avatar name={r.by} tone="blue" />{r.by}</span> },
              { key: 'updated', header: 'Last Updated' },
              { key: 'modules', header: 'Modules', align: 'right' },
            ]}
            footer={<Pagination page={page} pageSize={10} total={3} onPageChange={setPage} itemLabel="courses" />}
          />
        </main>
      </div>
    </div>
  );
}

const meta = { title: 'SaaS/Screens/App shell', component: AppShell, parameters: { a11y: { test: 'error' }, layout: 'fullscreen' } } satisfies Meta<typeof AppShell>;
export default meta;
export const Dashboard: StoryObj<typeof meta> = {};
