import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckCircle2 } from 'lucide-react';
import { StatusBadge, type BadgeStatus } from './StatusBadge';

const ALL: BadgeStatus[] = ['published', 'draft', 'edited', 'approved', 'error', 'step', 'basic', 'intermediate', 'advanced', 'new', 'neutral'];

const meta = {
  title: 'SaaS/StatusBadge',
  parameters: { a11y: { test: 'error' } },
  component: StatusBadge,
  tags: ['autodocs'],
  args: { status: 'published', dot: false },
  argTypes: { status: { control: 'select', options: ALL }, icon: { control: false } },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {};
export const Draft: Story = { args: { status: 'draft' } };
export const Edited: Story = { args: { status: 'edited' } };
export const Approved: Story = { args: { status: 'approved', icon: <CheckCircle2 /> } };
export const Error: Story = { args: { status: 'error', children: 'Export failed' } };
export const Step: Story = { args: { status: 'step', children: 'Step 1 of 2 · Course Details' } };
export const Complexity: Story = {
  render: () => (
    <div className="flex gap-2">
      <StatusBadge status="basic" />
      <StatusBadge status="intermediate" />
      <StatusBadge status="advanced" />
    </div>
  ),
};
export const New: Story = { args: { status: 'new' } };
export const WithDot: Story = { args: { status: 'draft', dot: true } };

export const AllStatuses: Story = {
  render: () => (
    <div className="grid grid-cols-[120px_auto_auto] items-center gap-x-6 gap-y-3">
      {ALL.map((s) => (
        <Fragment key={s}>
          <span className="font-mono text-xs">{s}</span>
          <StatusBadge status={s} />
          <StatusBadge status={s} dot />
        </Fragment>
      ))}
    </div>
  ),
};
