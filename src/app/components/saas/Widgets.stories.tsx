import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Clock, Download, FileCheck, FileUp, Languages, Plus, Users, XCircle } from 'lucide-react';
import { Button } from './Button';
import { ActivityList, EmptyState, ProgressBar, ProgressWidget, StatWidget } from './Widgets';

const meta = {
  title: 'SaaS/Widgets',
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatCards: Story = {
  render: () => (
    <div className="grid w-[1100px] grid-cols-4 gap-6">
      <StatWidget label="Total Course Created" value={3} icon={FileCheck} tone="blue" />
      <StatWidget label="Total course in Draft" value={1} icon={Clock} tone="amber" />
      <StatWidget label="Used vs Available License" value={3} hint="47 Available license" icon={XCircle} tone="pink" />
      <StatWidget label="Learners" value="1,284" icon={Users} tone="green" />
    </div>
  ),
};

export const StatTrends: Story = {
  render: () => (
    <div className="grid w-[900px] grid-cols-3 gap-6">
      <StatWidget label="Published this month" value={12} icon={FileUp} tone="green" trend={20} />
      <StatWidget label="Downloads" value={86} icon={Download} tone="violet" trend={-8} />
      <StatWidget label="Translations" value={5} icon={Languages} tone="orange" trend={0} />
    </div>
  ),
};

export const StatLoading: Story = {
  render: () => <div className="w-72"><StatWidget label="Total Course Created" value={0} icon={BookOpen} loading /></div>,
};

export const AllTones: Story = {
  render: () => (
    <div className="grid w-[1100px] grid-cols-3 gap-6">
      {(['blue', 'amber', 'pink', 'green', 'orange', 'violet'] as const).map((t) => (
        <StatWidget key={t} label={`Tone: ${t}`} value={42} icon={BookOpen} tone={t} />
      ))}
    </div>
  ),
};

export const LicenceUsage: Story = {
  render: () => (
    <div className="grid w-[1000px] grid-cols-3 gap-6">
      <ProgressWidget title="Licences" used={3} total={50} />
      <ProgressWidget title="Licences" used={42} total={50} />
      <ProgressWidget title="Licences" used={50} total={50} footer={<Button variant="secondary" size="sm">Request more</Button>} />
    </div>
  ),
};

export const ProgressBars: Story = {
  render: () => (
    <div className="grid w-96 gap-4">
      <ProgressBar label="Generating outline" value={30} />
      <ProgressBar label="Translation reviewed" value={100} tone="success" />
      <ProgressBar label="Licences used" value={84} tone="warning" />
      <ProgressBar label="Storage" value={100} tone="danger" />
      <ProgressBar label="Small bar" value={55} size="sm" />
    </div>
  ),
};

export const RecentActivity: Story = {
  render: () => (
    <div className="w-[420px]">
      <ActivityList
        title="Recent Activity"
        action={<Button variant="link" size="sm">View all</Button>}
        items={[
          { id: '1', title: 'Introduction to SCORM published', meta: '5 minutes ago', icon: FileUp, tone: 'green' },
          { id: '2', title: 'Tamil translation approved', meta: '1 hour ago', icon: Languages, tone: 'orange' },
          { id: '3', title: 'Information Security Management System 2026 edited', meta: 'Yesterday', icon: BookOpen, tone: 'blue', action: <Button variant="soft" size="sm">Open</Button> },
        ]}
      />
    </div>
  ),
};

export const ActivityEmpty: Story = { render: () => <div className="w-[420px]"><ActivityList title="Recent Activity" items={[]} /></div> };

export const Empty: Story = {
  render: () => (
    <div className="w-[560px] rounded-2xl border border-gray-100 bg-white">
      <EmptyState title="No courses yet" description="Create your first course and it will show up here." action={<Button leftIcon={<Plus />}>Create Course</Button>} />
    </div>
  ),
};
