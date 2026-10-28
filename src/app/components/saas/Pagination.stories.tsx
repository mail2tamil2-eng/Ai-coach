import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

const meta = {
  title: 'SaaS/Pagination',
  parameters: { a11y: { test: 'error' } },
  component: Pagination,
  tags: ['autodocs'],
  args: { page: 1, pageSize: 10, total: 42, itemLabel: 'courses', variant: 'full', onPageChange: fn(), onPageSizeChange: fn() },
  argTypes: { variant: { control: 'inline-radio', options: ['full', 'compact'] } },
  decorators: [(S) => <div className="w-[900px] rounded-2xl border border-gray-100 bg-white px-6 py-4"><S /></div>],
  render: function Render(args) {
    const [page, setPage] = useState(args.page);
    const [size, setSize] = useState(args.pageSize);
    return <Pagination {...args} page={page} pageSize={size} onPageChange={(p) => { setPage(p); args.onPageChange(p); }} onPageSizeChange={args.onPageSizeChange ? (s) => { setSize(s); setPage(1); } : undefined} />;
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MiddlePage: Story = { args: { page: 10, total: 240 } };
export const LastPage: Story = { args: { page: 5 } };
export const SinglePage: Story = { args: { total: 4 } };
export const Empty: Story = { args: { total: 0 } };
export const WithoutPageSize: Story = { args: { onPageSizeChange: undefined } };
export const Compact: Story = { args: { variant: 'compact', page: 3 } };
