import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'SaaS/Avatar',
  parameters: { a11y: { test: 'error' } },
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Dheva', tone: 'orange', size: 'md' },
  argTypes: { tone: { control: 'inline-radio', options: ['orange', 'blue', 'gray'] }, size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentUser: Story = {};
export const OtherUser: Story = { args: { name: 'John Doe', tone: 'blue' } };
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(['orange', 'blue', 'gray'] as const).map((t) =>
        (['sm', 'md', 'lg'] as const).map((s) => <Avatar key={t + s} name="John Doe" tone={t} size={s} />),
      )}
    </div>
  ),
};
