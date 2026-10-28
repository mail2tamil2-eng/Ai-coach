import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ArrowRight, Play, Plus, Save, Sparkles, Trash2, Upload, Wand2 } from 'lucide-react';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'soft', 'ai-outline', 'accent', 'inverse', 'danger', 'ghost', 'link'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'SaaS/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Generate Course', variant: 'primary', size: 'md', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  parameters: { a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Product buttons as used in the course wizard, editor and dashboard. Use **one** `primary` per view; pair it with `secondary` or `ai-outline`.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { leftIcon: <Sparkles />, rightIcon: <ArrowRight /> } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancel' } };
export const Soft: Story = { args: { variant: 'soft', size: 'sm', leftIcon: <Wand2 />, children: 'Generate with AI' } };
export const AiOutline: Story = { name: 'AI outline', args: { variant: 'ai-outline', leftIcon: <Sparkles />, children: 'Enhance with AI' } };
export const Accent: Story = { args: { variant: 'accent', leftIcon: <Play fill="currentColor" />, children: 'Resume Editing' } };
export const Inverse: Story = {
  args: { variant: 'inverse', size: 'lg', leftIcon: <Plus />, children: 'Create New Course' },
  decorators: [(S) => <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8"><S /></div>],
};
export const Danger: Story = { args: { variant: 'danger', leftIcon: <Trash2 />, children: 'Delete course' } };
export const Ghost: Story = { args: { variant: 'ghost', leftIcon: <Save />, children: 'Save Draft' } };
export const Link: Story = { args: { variant: 'link', rightIcon: <ArrowRight />, children: 'View All' } };

export const Disabled: Story = { args: { disabled: true, leftIcon: <Sparkles />, rightIcon: <ArrowRight /> } };
export const Loading: Story = { args: { loading: true, loadingText: 'Generating your course…' } };
export const FullWidth: Story = { args: { fullWidth: true, leftIcon: <Upload />, children: 'Publish' }, decorators: [(S) => <div className="w-80"><S /></div>] };

/** Tab moves focus to the button and shows the visible focus ring. */
export const Focused: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole('button')).toHaveFocus();
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {SIZES.map((s) => <Button key={s} {...args} size={s}>{`Size ${s}`}</Button>)}
    </div>
  ),
};

/** Every variant × state. */
export const AllVariants: Story = {
  render: (args) => (
    <table className="border-separate border-spacing-x-4 border-spacing-y-3 text-left text-[13px]">
      <thead>
        <tr className="text-[#6B7280]">
          <th>Variant</th><th>Default</th><th>With icon</th><th>Disabled</th><th>Loading</th>
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((v) => (
          <tr key={v}>
            <td className="font-mono text-xs">{v}</td>
            <td className={v === 'inverse' ? 'rounded-lg bg-blue-700 p-2' : ''}><Button {...args} variant={v}>Button</Button></td>
            <td className={v === 'inverse' ? 'rounded-lg bg-blue-700 p-2' : ''}><Button {...args} variant={v} leftIcon={<Sparkles />}>Button</Button></td>
            <td className={v === 'inverse' ? 'rounded-lg bg-blue-700 p-2' : ''}><Button {...args} variant={v} disabled>Button</Button></td>
            <td className={v === 'inverse' ? 'rounded-lg bg-blue-700 p-2' : ''}><Button {...args} variant={v} loading>Button</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
