import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'SaaS/Checkbox',
  parameters: { a11y: { test: 'error' } },
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'All slides viewed', checked: true, onChange: fn() },
  render: function Render(args) {
    const [on, setOn] = useState(args.checked);
    return <Checkbox {...args} checked={on} onChange={(v) => { setOn(v); args.onChange(v); }} />;
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {};
export const Unchecked: Story = { args: { checked: false } };
export const Indeterminate: Story = { args: { checked: false, indeterminate: true, label: 'Select all courses' } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledUnchecked: Story = { args: { disabled: true, checked: false } };

/** Completion criteria from Player Settings. */
export const CompletionCriteria: Story = {
  render: function Render() {
    const opts = ['All slides viewed', 'Quiz passed', 'Time spent', 'Video completed'];
    const [sel, setSel] = useState(['All slides viewed', 'Quiz passed']);
    return (
      <fieldset className="grid gap-2.5">
        <legend className="mb-2 text-[13px] font-semibold text-[#374151]">Completion criteria</legend>
        {opts.map((o) => (
          <Checkbox key={o} label={o} checked={sel.includes(o)} onChange={(c) => setSel((s) => (c ? [...s, o] : s.filter((x) => x !== o)))} />
        ))}
      </fieldset>
    );
  },
};
