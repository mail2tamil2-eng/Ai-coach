import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Info } from 'lucide-react';
import { IconButton } from './IconButton';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'SaaS/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'centered' },
  args: { content: 'Download SCORM package', side: 'top', tone: 'dark', open: true, children: <IconButton label="Download" icon={<Download />} tone="success" /> },
  argTypes: { side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] }, tone: { control: 'inline-radio', options: ['dark', 'light'] }, children: { control: false } },
  decorators: [(S) => <div className="p-20"><S /></div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {};
export const Light: Story = { args: { tone: 'light', content: 'Publishing uses one licence. Republishing an edited course is free.', children: <IconButton variant="ghost" label="Licence info" icon={<Info />} /> } };
export const Right: Story = { args: { side: 'right' } };
export const Bottom: Story = { args: { side: 'bottom' } };
export const OnHover: Story = { args: { open: undefined } };
