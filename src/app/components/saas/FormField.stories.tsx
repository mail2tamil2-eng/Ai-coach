import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { FormField, SelectInput, TextArea, TextInput } from './FormField';

const LANGUAGES = ['English', 'Tamil', 'Hindi', 'Malayalam', 'Telugu', 'French'];

const meta = {
  title: 'SaaS/Form fields',
  parameters: { a11y: { test: 'error' } },
  component: FormField,
  tags: ['autodocs'],
  decorators: [(S) => <div className="w-[420px]"><S /></div>],
  args: { label: 'Course Title', children: () => null },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { label: 'Course Title', required: true },
  render: (args) => (
    <FormField {...args}>
      {({ id, describedBy, invalid }) => (
        <TextInput id={id} aria-describedby={describedBy} invalid={invalid} placeholder="e.g. Introduction to Machine Learning" />
      )}
    </FormField>
  ),
};

export const WithHint: Story = {
  ...Text,
  args: { label: 'Target Audience', hint: 'Who is this course for? Used to tune tone and examples.' },
};

export const WithError: Story = {
  ...Text,
  args: { label: 'Course Title', required: true, error: 'Add a course title to continue.' },
};

export const Disabled: Story = {
  render: () => (
    <FormField label="Course ID" hint="Generated automatically">
      {({ id, describedBy }) => <TextInput id={id} aria-describedby={describedBy} disabled value="CRS-2026-0142" readOnly />}
    </FormField>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <FormField label="Search courses">
      {({ id }) => <TextInput id={id} leftIcon={<Search />} placeholder="Search here…" />}
    </FormField>
  ),
};

export const Description: Story = {
  render: () => (
    <FormField
      label="Course Description"
      labelAction={<Button variant="soft" size="sm" leftIcon={<Sparkles />}>Generate with AI</Button>}
    >
      {({ id, describedBy, invalid }) => (
        <TextArea id={id} aria-describedby={describedBy} invalid={invalid} placeholder="Describe what this course is about and what learners will gain..." />
      )}
    </FormField>
  ),
};

export const Select: Story = {
  render: () => (
    <FormField label="Language">
      {({ id }) => <SelectInput id={id} options={LANGUAGES} defaultValue="English" />}
    </FormField>
  ),
};

export const NumberWithUnit: Story = {
  name: 'Number + unit (Duration)',
  render: () => (
    <FormField label="Duration">
      {({ id }) => (
        <div className="flex gap-2">
          <TextInput id={id} type="number" min={1} placeholder="30" className="flex-1" />
          <SelectInput aria-label="Duration unit" options={[{ value: 'minutes', label: 'min' }, { value: 'hours', label: 'hrs' }]} className="w-20" />
        </div>
      )}
    </FormField>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-4">
      <FormField label="Default">{({ id }) => <TextInput id={id} placeholder="Placeholder" />}</FormField>
      <FormField label="Filled">{({ id }) => <TextInput id={id} defaultValue="Information Security Essentials" />}</FormField>
      <FormField label="Focused (click or Tab in)">{({ id }) => <TextInput id={id} autoFocus defaultValue="Focus ring" />}</FormField>
      <FormField label="Required" required>{({ id }) => <TextInput id={id} />}</FormField>
      <FormField label="Error" error="This field is required.">
        {({ id, describedBy, invalid }) => <TextInput id={id} aria-describedby={describedBy} invalid={invalid} />}
      </FormField>
      <FormField label="Disabled">{({ id }) => <TextInput id={id} disabled defaultValue="Read only" />}</FormField>
      <FormField label="Select error" error="Pick a language.">
        {({ id, describedBy, invalid }) => <SelectInput id={id} aria-describedby={describedBy} invalid={invalid} options={['', ...LANGUAGES]} />}
      </FormField>
      <FormField label="Textarea disabled">{({ id }) => <TextArea id={id} disabled defaultValue="Locked after publishing." />}</FormField>
    </div>
  ),
};
