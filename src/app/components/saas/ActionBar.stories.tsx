import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ActionBar } from './ActionBar';
import { Button } from './Button';

const meta = {
  title: 'SaaS/ActionBar',
  component: ActionBar,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'fullscreen' },
  argTypes: { start: { control: false }, end: { control: false } },
} satisfies Meta<typeof ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blocked: Story = {
  args: {
    start: <Button variant="secondary">Cancel</Button>,
    hint: 'Add a course title to continue',
    end: <Button disabled leftIcon={<Sparkles />} rightIcon={<ArrowRight />}>Generate Course</Button>,
  },
};
export const Ready: Story = {
  args: {
    start: <Button variant="secondary">Cancel</Button>,
    end: <Button leftIcon={<Sparkles />} rightIcon={<ArrowRight />}>Generate Course</Button>,
  },
};
export const Generating: Story = {
  args: {
    start: <Button variant="secondary" disabled>Cancel</Button>,
    end: <Button loading loadingText="Generating your course…">Generate Course</Button>,
  },
};
export const BackAndTwoActions: Story = {
  args: {
    start: <Button variant="secondary" leftIcon={<ArrowLeft />}>Back</Button>,
    end: (
      <>
        <Button variant="ai-outline" leftIcon={<Sparkles />}>Enhance with AI</Button>
        <Button rightIcon={<ArrowRight />}>Generate Outline</Button>
      </>
    ),
  },
};
