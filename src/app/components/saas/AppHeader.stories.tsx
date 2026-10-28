import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { HelpCircle } from 'lucide-react';
import { AppHeader } from './AppHeader';
import { IconButton } from './IconButton';

const meta = {
  title: 'SaaS/Layout/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'fullscreen' },
  args: { userName: 'Dheva', userRole: 'Course Creator', notificationCount: 3, onSearch: fn(), onNotificationsClick: fn(), onUserMenuClick: fn() },
  argTypes: { actions: { control: false } },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoNotifications: Story = { args: { notificationCount: 0 } };
export const SiteAdmin: Story = { args: { userName: 'Priya Raman', userRole: 'Site Admin' } };
export const WithoutSearch: Story = { args: { showSearch: false } };
export const WithActions: Story = { args: { actions: <IconButton variant="ghost" label="Help" icon={<HelpCircle />} /> } };
