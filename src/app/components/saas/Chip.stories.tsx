import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { ClipboardCheck, FileText, HelpCircle, Image, ListChecks } from 'lucide-react';
import { Chip } from './Chip';

const meta = {
  title: 'SaaS/Chip',
  parameters: { a11y: { test: 'error' } },
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Title + Text', icon: <FileText /> },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = {};
export const Selected: Story = { args: { selected: true, onClick: fn() } };
export const Selectable: Story = { args: { selected: false, onClick: fn() } };
export const Removable: Story = { args: { children: 'Compliance', icon: undefined, onRemove: fn() } };
export const Disabled: Story = { args: { disabled: true, onClick: fn() } };

/** "Slide types included" panel from the course wizard. */
export const SlideTypes: Story = {
  render: () => (
    <div className="flex max-w-xs flex-wrap gap-1.5">
      <Chip icon={<FileText />}>Title + Text</Chip>
      <Chip icon={<ListChecks />}>Bullet Points</Chip>
      <Chip icon={<Image />}>Image / Visual</Chip>
      <Chip icon={<ClipboardCheck />}>Knowledge Check</Chip>
      <Chip icon={<HelpCircle />}>Quiz</Chip>
    </div>
  ),
};

export const FilterGroup: Story = {
  render: function Render() {
    const [sel, setSel] = useState<string[]>(['Published']);
    const toggle = (v: string) => setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
    return (
      <div className="flex gap-1.5" role="group" aria-label="Filter by status">
        {['Published', 'Draft', 'Edited'].map((v) => (
          <Chip key={v} selected={sel.includes(v)} onClick={() => toggle(v)}>{v}</Chip>
        ))}
      </div>
    );
  },
};
