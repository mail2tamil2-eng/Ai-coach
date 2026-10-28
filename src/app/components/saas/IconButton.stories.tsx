import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ArrowLeft, Bell, Copy, Download, Edit, FileUp, Languages, Play, Trash2 } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'SaaS/IconButton',
  parameters: { a11y: { test: 'error' } },
  component: IconButton,
  tags: ['autodocs'],
  args: { label: 'Edit', icon: <Edit />, variant: 'table', tone: 'primary', size: 'md', onClick: fn() },
  argTypes: {
    icon: { control: false },
    variant: { control: 'inline-radio', options: ['table', 'outline', 'ghost', 'solid'] },
    tone: { control: 'inline-radio', options: ['neutral', 'primary', 'success', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table: Story = {};
export const Outline: Story = { args: { variant: 'outline', size: 'sm', label: 'Go back', icon: <ArrowLeft /> } };
export const Ghost: Story = { args: { variant: 'ghost', label: 'Notifications', icon: <Bell /> } };
export const Solid: Story = { args: { variant: 'solid', size: 'sm', label: 'Play narration', icon: <Play /> } };
export const Disabled: Story = { args: { disabled: true, label: 'Publish (no licences left)', icon: <FileUp /> } };

/** The row of actions in CourseTable / DashboardCourseTable. Hover each to see its tone. */
export const CourseRowActions: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton label="Publish" icon={<FileUp />} tone="primary" />
      <IconButton label="Translate" icon={<Languages />} tone="primary" />
      <IconButton label="Download SCORM" icon={<Download />} tone="success" />
      <IconButton label="Edit" icon={<Edit />} tone="primary" />
      <IconButton label="Copy" icon={<Copy />} tone="neutral" />
      <IconButton label="Delete" icon={<Trash2 />} tone="danger" />
      <IconButton label="Download (publish first)" icon={<Download />} disabled />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-[100px_repeat(3,auto)] items-center gap-x-6 gap-y-3 text-[13px]">
      <span /> <span className="text-[#6B7280]">md</span> <span className="text-[#6B7280]">sm</span> <span className="text-[#6B7280]">disabled</span>
      {(['table', 'outline', 'ghost', 'solid'] as const).map((v) => (
        <Fragment key={v}>
          <span className="font-mono text-xs">{v}</span>
          <IconButton variant={v} label="Edit" icon={<Edit />} />
          <IconButton variant={v} size="sm" label="Edit" icon={<Edit />} />
          <IconButton variant={v} label="Edit" icon={<Edit />} disabled />
        </Fragment>
      ))}
    </div>
  ),
};
