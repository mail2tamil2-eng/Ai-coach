import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Switch } from './switch';
import { Textarea } from './textarea';

const meta = {
  title: 'Primitives (shadcn)/Form controls',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="course-title">Course title</Label>
      <Input id="course-title" placeholder="e.g., Introduction to Machine Learning" />
    </div>
  ),
};

export const InputStates: Story = {
  render: () => (
    <div className="grid w-80 gap-4">
      <div className="grid gap-2">
        <Label htmlFor="filled">Filled</Label>
        <Input id="filled" defaultValue="Information Security Management" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" disabled defaultValue="Read only" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="error">With error</Label>
        <Input id="error" aria-invalid aria-describedby="error-msg" defaultValue="" />
        <p id="error-msg" role="alert" className="text-sm text-destructive">Course title is required.</p>
      </div>
    </div>
  ),
};

export const TextArea: Story = {
  render: () => (
    <div className="grid w-96 gap-2">
      <Label htmlFor="desc">Description</Label>
      <Textarea id="desc" placeholder="What will learners achieve?" />
    </div>
  ),
};

export const SelectField: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="lang">Language</Label>
      <Select defaultValue="en">
        <SelectTrigger id="lang">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['English', 'Tamil', 'Hindi', 'Malayalam', 'Telugu', 'French'].map((l) => (
            <SelectItem key={l} value={l === 'English' ? 'en' : l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const CheckboxAndSwitch: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="seek" defaultChecked />
        <Label htmlFor="seek">Allow seek bar</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-cb" disabled />
        <Label htmlFor="disabled-cb">Disabled option</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="music" defaultChecked />
        <Label htmlFor="music">AI background music</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="music-off" disabled />
        <Label htmlFor="music-off">Disabled switch</Label>
      </div>
    </div>
  ),
};
