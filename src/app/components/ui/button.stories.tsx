import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from './button';

const meta = {
  title: 'Primitives (shadcn)/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete course' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Link: Story = { args: { variant: 'link' } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  args: { children: <><Plus /> Create course</> },
};

export const IconOnly: Story = {
  args: { size: 'icon', 'aria-label': 'Delete', children: <Trash2 /> },
};

export const Loading: Story = {
  args: { disabled: true, 'aria-busy': true, children: <><Loader2 className="animate-spin" /> Publishing…</> },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          {(['sm', 'default', 'lg'] as const).map((size) => (
            <Button key={size} {...args} variant={variant} size={size}>
              {variant} / {size}
            </Button>
          ))}
          <Button {...args} variant={variant} disabled>
            disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};
