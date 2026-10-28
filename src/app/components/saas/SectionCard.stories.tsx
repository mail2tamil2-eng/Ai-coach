import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, HelpCircle, ListChecks, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Chip } from './Chip';
import { FormField, TextInput } from './FormField';
import { StatusBadge } from './StatusBadge';
import { SectionCard } from './SectionCard';

const meta = {
  title: 'SaaS/SectionCard',
  parameters: { a11y: { test: 'error' } },
  component: SectionCard,
  tags: ['autodocs'],
  args: { title: 'Course Information', variant: 'default', padding: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'eyebrow'] },
    padding: { control: 'inline-radio', options: ['default', 'compact', 'none'] },
  },
  decorators: [(S) => <div className="w-[560px] bg-[#F9FAFB] p-6"><S /></div>],
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SectionCard {...args}>
      <FormField label="Course Title" required>{({ id }) => <TextInput id={id} placeholder="e.g. Introduction to Machine Learning" />}</FormField>
    </SectionCard>
  ),
};

export const WithHelperText: Story = {
  args: { title: 'Course Complexity', action: 'Sets available slide types' },
  render: (args) => <SectionCard {...args}><p className="text-[13px] text-[#6B7280]">…selection cards…</p></SectionCard>,
};

export const WithSubtitleAndAction: Story = {
  args: {
    title: 'Learning Objectives',
    subtitle: 'What learners will be able to do after this course',
    action: <Button variant="soft" size="sm" leftIcon={<Sparkles />}>Generate with AI</Button>,
  },
  render: (args) => <SectionCard {...args}><p className="text-[13px] text-[#6B7280]">No objectives yet.</p></SectionCard>,
};

export const Eyebrow: Story = {
  args: { variant: 'eyebrow', padding: 'compact', title: 'Slide types included', action: <StatusBadge status="basic" /> },
  render: (args) => (
    <SectionCard {...args}>
      <div className="flex flex-wrap gap-1.5">
        <Chip icon={<FileText />}>Title + Text</Chip>
        <Chip icon={<ListChecks />}>Bullet Points</Chip>
        <Chip icon={<HelpCircle />}>Quiz</Chip>
      </div>
    </SectionCard>
  ),
};

export const Empty: Story = {
  args: { title: 'Recent Courses' },
  render: (args) => (
    <SectionCard {...args}>
      <div className="py-8 text-center">
        <p className="text-sm font-semibold text-[#111827]">No courses yet</p>
        <p className="mt-1 text-[13px] text-[#6B7280]">Create your first course to see it here.</p>
      </div>
    </SectionCard>
  ),
};
