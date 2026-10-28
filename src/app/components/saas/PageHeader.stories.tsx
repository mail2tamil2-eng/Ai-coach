import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Plus } from 'lucide-react';
import { Button } from './Button';
import { PageHeader } from './PageHeader';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'SaaS/PageHeader',
  parameters: { a11y: { test: 'error' } },
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Create Course',
    onBack: fn(),
    badge: <StatusBadge status="step">Step 1 of 2 · Course Details</StatusBadge>,
    breadcrumbs: [{ label: 'Home', onClick: fn() }, { label: 'My Courses', onClick: fn() }, { label: 'Create Course' }],
  },
  argTypes: { badge: { control: false }, actions: { control: false } },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WizardStep: Story = {};
export const StepTwo: Story = { args: { badge: <StatusBadge status="step">Step 2 of 2 · Design & Outline</StatusBadge> } };
export const TitleOnly: Story = { args: { title: 'Course Authoring', onBack: undefined, badge: undefined, breadcrumbs: undefined } };
export const WithActions: Story = {
  args: {
    title: 'Course Authoring',
    onBack: undefined,
    badge: undefined,
    breadcrumbs: [{ label: 'Home', onClick: fn() }, { label: 'Course Authoring' }],
    actions: <Button leftIcon={<Plus />}>Create New Course</Button>,
  },
};
