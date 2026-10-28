import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Music2, Settings, Sparkles, Volume2 } from 'lucide-react';
import { Accordion, type AccordionItemData, type AccordionProps } from './Accordion';
import { StatusBadge } from './StatusBadge';
import { Toggle } from './Toggle';

const ITEMS: AccordionItemData[] = [
  { value: 'seek', title: 'Seek bar', icon: <Settings />, meta: 'Allowed', content: 'Learners can jump to any point in a slide.' },
  { value: 'audio', title: 'AI audio narration', icon: <Volume2 />, meta: <StatusBadge status="new" />, content: <Toggle label="Enable narration" checked onChange={() => {}} /> },
  { value: 'music', title: 'Background music', icon: <Music2 />, content: 'Upload a track or let AI choose one.' },
  { value: 'ai', title: 'AI transitions', icon: <Sparkles />, content: 'Automatically choose transitions between slides.', disabled: true },
];

const meta = {
  title: 'SaaS/Accordion',
  parameters: { a11y: { test: 'error' } },
  component: Accordion as React.ComponentType<AccordionProps>,
  tags: ['autodocs'],
  args: { items: ITEMS, variant: 'bordered', type: 'single', defaultValue: 'seek' },
  argTypes: { variant: { control: 'inline-radio', options: ['bordered', 'separated', 'flush'] }, items: { control: false } },
  decorators: [(S) => <div className="w-[480px]"><S /></div>],
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Bordered: Story = {};
export const Separated: Story = { args: { variant: 'separated' } };
export const Flush: Story = { args: { variant: 'flush' } };
export const Multiple: Story = { args: { type: 'multiple', defaultValue: ['seek', 'music'] } };
export const AllClosed: Story = { args: { defaultValue: undefined } };
export const FAQ: Story = {
  args: {
    items: [
      { value: 'q1', title: 'What is a SCORM package?', content: 'A ZIP file containing your course and a manifest any LMS can import.' },
      { value: 'q2', title: 'How are licences used?', content: 'Each first publish of a course uses one licence. Republishing is free.' },
      { value: 'q3', title: 'Can I translate a course?', content: 'Yes — after publishing, open Translations and pick a language.' },
    ],
    defaultValue: undefined,
  },
};
