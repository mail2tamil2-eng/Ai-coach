import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FileText, Palette, Settings, Sparkles } from 'lucide-react';
import { Tabs, type TabItem } from './Tabs';

const ITEMS: TabItem[] = [
  { value: 'content', label: 'Content', icon: <FileText />, content: 'Slide content editor.' },
  { value: 'design', label: 'Design', icon: <Palette />, content: 'Theme, template and colours.' },
  { value: 'ai', label: 'AI Assist', icon: <Sparkles />, content: 'Rewrite, summarise and translate with AI.' },
  { value: 'settings', label: 'Settings', icon: <Settings />, content: 'Player and completion settings.' },
];

const meta = {
  title: 'SaaS/Tabs',
  parameters: { a11y: { test: 'error' } },
  component: Tabs,
  tags: ['autodocs'],
  args: { items: ITEMS, variant: 'underline', size: 'md', 'aria-label': 'Editor panels', onValueChange: fn() },
  argTypes: { variant: { control: 'inline-radio', options: ['underline', 'pills', 'enclosed'] }, size: { control: 'inline-radio', options: ['sm', 'md'] }, items: { control: false } },
  decorators: [(S) => <div className="w-[560px]"><S /></div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {};
export const Pills: Story = { args: { variant: 'pills' } };
export const Enclosed: Story = { args: { variant: 'enclosed' } };
export const Small: Story = { args: { size: 'sm' } };
export const FullWidth: Story = { args: { variant: 'pills', fullWidth: true } };
export const WithCounts: Story = {
  args: {
    'aria-label': 'Course status',
    items: [
      { value: 'all', label: 'All', count: 42, content: '42 courses' },
      { value: 'published', label: 'Published', count: 28, content: '28 published' },
      { value: 'draft', label: 'Draft', count: 14, content: '14 drafts' },
      { value: 'archived', label: 'Archived', count: 0, disabled: true },
    ],
  },
};
export const WithDisabled: Story = { args: { items: [...ITEMS.slice(0, 3), { ...ITEMS[3], disabled: true }] } };
export const TextOnly: Story = { args: { items: ITEMS.map(({ icon, ...t }) => t) } };
