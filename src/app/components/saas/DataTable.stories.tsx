import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Copy, Download, Edit, FileUp, Languages, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { DataTable, type Column, type SortState } from './DataTable';
import { DropdownMenu } from './DropdownMenu';
import { IconButton } from './IconButton';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';
import { StatusBadge } from './StatusBadge';
import { EmptyState } from './Widgets';

type Course = { id: number; name: string; status: 'published' | 'draft'; by: string; created: string; updated: string; modules: number };
const NAMES = ['Introduction to SCORM', 'Introduction to Literature', 'Technical Design Basics', 'Information Security Essentials', 'Workplace Safety', 'Customer Service Excellence', 'Data Privacy & GDPR', 'Leadership Fundamentals', 'Agile Project Management', 'Effective Communication', 'Anti-Harassment Training', 'Financial Literacy'];
const COURSES: Course[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : ''),
  status: i % 3 === 2 ? 'draft' : 'published',
  by: i % 4 === 0 ? 'Dheva' : 'John Doe',
  created: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
  updated: `2026-0${(i % 9) + 1}-${String((i % 27) + 1).padStart(2, '0')}`,
  modules: (i % 5) + 1,
}));

const actions = (r: Course) => (
  <div className="flex items-center gap-1">
    {r.status === 'draft' && <IconButton label="Publish" icon={<FileUp />} />}
    <IconButton label="Translate" icon={<Languages />} disabled={r.status === 'draft'} />
    <IconButton label="Download SCORM" icon={<Download />} tone="success" disabled={r.status === 'draft'} />
    <IconButton label="Edit" icon={<Edit />} />
    <DropdownMenu
      trigger={<IconButton label="More actions" icon={<MoreHorizontal />} tone="neutral" />}
      items={[
        { label: 'Duplicate', icon: <Copy /> },
        { type: 'separator' },
        { label: 'Delete', icon: <Trash2 />, destructive: true },
      ]}
    />
  </div>
);

const COLUMNS: Column<Course>[] = [
  { key: 'id', header: '#', width: 60, cell: (r) => String(r.id).padStart(2, '0'), sortable: true },
  { key: 'name', header: 'Course Name', sortable: true, cell: (r) => <span className="font-medium text-gray-800">{r.name}</span> },
  { key: 'status', header: 'Status', sortable: true, cell: (r) => <StatusBadge status={r.status} /> },
  { key: 'by', header: 'Created By', cell: (r) => <span className="flex items-center gap-2"><Avatar name={r.by} tone="blue" />{r.by}</span> },
  { key: 'created', header: 'Created On', sortable: true },
  { key: 'updated', header: 'Last Updated', sortable: true },
  { key: 'modules', header: 'Modules', align: 'right', sortable: true },
  { key: 'actions', header: 'Actions', cell: actions },
];

const meta = {
  title: 'SaaS/DataTable',
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Search + sort + select + paginate, like the Course Authoring list. */
export const CourseList: Story = {
  render: function Render() {
    const [q, setQ] = useState('');
    const [sort, setSort] = useState<SortState>({ key: 'updated', direction: 'desc' });
    const [sel, setSel] = useState<(string | number)[]>([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const filtered = useMemo(() => {
      const f = COURSES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
      if (!sort) return f;
      return [...f].sort((a, b) => {
        const av = a[sort.key as keyof Course], bv = b[sort.key as keyof Course];
        return (av > bv ? 1 : av < bv ? -1 : 0) * (sort.direction === 'asc' ? 1 : -1);
      });
    }, [q, sort]);
    const rows = filtered.slice((page - 1) * size, page * size);
    return (
      <DataTable
        caption="Courses"
        title="My Courses"
        subtitle={sel.length ? `${sel.length} selected` : 'All your learning content'}
        toolbar={
          <>
            <SearchBar className="w-72" placeholder="Search courses…" value={q} onChange={(v) => { setQ(v); setPage(1); }} />
            {sel.length > 0 && <Button variant="danger" size="sm" leftIcon={<Trash2 />}>Delete ({sel.length})</Button>}
            <Button leftIcon={<Plus />}>Create Course</Button>
          </>
        }
        columns={COLUMNS}
        rows={rows}
        rowKey={(r) => r.id}
        sort={sort}
        onSortChange={setSort}
        selectedKeys={sel}
        onSelectionChange={setSel}
        empty={<EmptyState title="No courses match your search" description={`Nothing found for “${q}”.`} action={<Button variant="secondary" onClick={() => setQ('')}>Clear search</Button>} />}
        footer={<Pagination page={page} pageSize={size} total={filtered.length} onPageChange={setPage} onPageSizeChange={(s) => { setSize(s); setPage(1); }} itemLabel="courses" />}
      />
    );
  },
};

export const Simple: Story = {
  render: () => <DataTable title="Recent Courses" subtitle="Your latest learning content" columns={COLUMNS.filter((c) => c.key !== 'actions')} rows={COURSES.slice(0, 4)} rowKey={(r) => r.id} />,
};
export const Compact: Story = {
  render: () => <DataTable density="compact" striped columns={COLUMNS} rows={COURSES.slice(0, 8)} rowKey={(r) => r.id} />,
};
export const Loading: Story = {
  render: () => <DataTable title="My Courses" loading columns={COLUMNS} rows={[]} rowKey={(r: Course) => r.id} />,
};
export const Empty: Story = {
  render: () => (
    <DataTable
      title="My Courses"
      columns={COLUMNS}
      rows={[]}
      rowKey={(r: Course) => r.id}
      empty={<EmptyState title="No courses yet" description="Create your first course to see it here." action={<Button leftIcon={<Plus />}>Create Course</Button>} />}
    />
  ),
};
