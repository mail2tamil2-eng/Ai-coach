import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { FileText, Layers, Sparkles } from 'lucide-react';
import { SelectionCard } from './SelectionCard';

const meta = {
  title: 'SaaS/SelectionCard',
  parameters: { a11y: { test: 'error' } },
  component: SelectionCard,
  tags: ['autodocs'],
  args: { title: 'Basic', description: 'Text, images, knowledge checks, quizzes', selected: true, dotColor: '#10B981', onSelect: fn() },
  argTypes: { icon: { control: false } },
  decorators: [(S) => <div className="w-60"><S /></div>],
} satisfies Meta<typeof SelectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {};
export const Unselected: Story = { args: { selected: false } };
export const Disabled: Story = { args: { selected: false, disabled: true, title: 'Advanced', dotColor: '#8B5CF6', description: 'Requires an Advanced licence' } };
export const WithIcon: Story = { args: { dotColor: undefined, icon: <Sparkles />, title: 'AI Generated', description: 'Let AI draft the outline' } };

/** Course Complexity group (single choice). */
export const ComplexityGroup: Story = {
  decorators: [(S) => <div className="w-[720px]"><S /></div>],
  render: function Render() {
    const [v, setV] = useState('basic');
    const items = [
      { id: 'basic', title: 'Basic', dot: '#10B981', d: 'Text, images, knowledge checks, quizzes' },
      { id: 'intermediate', title: 'Intermediate', dot: '#3B82F6', d: 'Basic + video, audio, spokesperson, scenarios' },
      { id: 'advanced', title: 'Advanced', dot: '#8B5CF6', d: 'Intermediate + summaries, branching scenarios' },
    ];
    return (
      <div role="group" aria-label="Course complexity" className="grid grid-cols-3 gap-2.5">
        {items.map((i) => (
          <SelectionCard key={i.id} title={i.title} description={i.d} dotColor={i.dot} selected={v === i.id} onSelect={() => setV(i.id)} />
        ))}
      </div>
    );
  },
};

/** Creation-method choice, as in CreateCourseModal. */
export const CreationMethod: Story = {
  decorators: [(S) => <div className="w-[720px]"><S /></div>],
  render: function Render() {
    const [v, setV] = useState('ai');
    return (
      <div className="grid grid-cols-3 gap-2.5">
        <SelectionCard icon={<Sparkles />} title="Create with AI" description="Generate a full course from a topic" selected={v === 'ai'} onSelect={() => setV('ai')} />
        <SelectionCard icon={<FileText />} title="From document" description="Upload a PDF, DOCX or PPTX" selected={v === 'doc'} onSelect={() => setV('doc')} />
        <SelectionCard icon={<Layers />} title="From scratch" description="Start with a blank outline" selected={v === 'blank'} onSelect={() => setV('blank')} />
      </div>
    );
  },
};
