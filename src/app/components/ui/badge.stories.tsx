import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from './badge';

const meta = {
  title: 'Primitives (shadcn)/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
  argTypes: { variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline'] } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const WithIcon: Story = { args: { children: <><CheckCircle2 /> Published</> } };

/** Course status badges as used in CourseTable / DashboardCourseTable. Colour is always paired with text. */
export const CourseStatus: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-green-50 text-green-700 border-green-200">Published</Badge>
      <Badge className="bg-amber-50 text-amber-700 border-amber-200">Draft</Badge>
      <Badge className="bg-blue-50 text-blue-700 border-blue-200">Edited</Badge>
    </div>
  ),
};
