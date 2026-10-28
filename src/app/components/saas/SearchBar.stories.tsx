import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'SaaS/SearchBar',
  parameters: { a11y: { test: 'error' } },
  component: SearchBar,
  tags: ['autodocs'],
  args: { placeholder: 'Search here…', variant: 'filled', size: 'md', onChange: fn(), onSearch: fn() },
  argTypes: { variant: { control: 'inline-radio', options: ['filled', 'outline'] }, size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(S) => <div className="w-[440px]"><S /></div>],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderSearch: Story = {};
export const Outline: Story = { args: { variant: 'outline', placeholder: 'Search courses…' } };
export const WithValue: Story = { args: { defaultValue: 'SCORM' } };
export const WithShortcut: Story = { args: { shortcut: '⌘K' } };
export const Loading: Story = { args: { defaultValue: 'secur', loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Sizes: Story = {
  render: (args) => (
    <div className="grid gap-3">
      <SearchBar {...args} size="sm" placeholder="Small" />
      <SearchBar {...args} size="md" placeholder="Medium" />
      <SearchBar {...args} size="lg" placeholder="Large" />
    </div>
  ),
};
