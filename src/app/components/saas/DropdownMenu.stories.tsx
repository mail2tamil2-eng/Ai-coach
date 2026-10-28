import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChevronDown, Copy, LogOut, MoreHorizontal, Pencil, Save, Settings, Trash2, User } from 'lucide-react';
import { Button } from './Button';
import { DropdownMenu } from './DropdownMenu';
import { IconButton } from './IconButton';

const meta = {
  title: 'SaaS/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'centered', docs: { story: { inline: false, iframeHeight: 360 } } },
  decorators: [(S) => <div className="flex min-h-[320px] items-start justify-center pt-4"><S /></div>],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/** Editor "More" (⋯) menu. */
export const EditorMore: Story = {
  args: {
    open: true,
    modal: false, // forced-open demo; real menus are modal
    trigger: <IconButton variant="outline" label="More options" icon={<MoreHorizontal />} />,
    items: [
      { label: 'Rename', icon: <Pencil />, shortcut: 'F2' },
      { label: 'Save draft', icon: <Save />, shortcut: '⌘S' },
      { label: 'Duplicate', icon: <Copy /> },
      { type: 'separator' },
      { label: 'Delete course', icon: <Trash2 />, destructive: true },
    ],
  },
};

export const UserMenu: Story = {
  args: {
    open: true,
    modal: false, // forced-open demo; real menus are modal
    trigger: <Button variant="ghost" rightIcon={<ChevronDown />}>Dheva</Button>,
    items: [
      { type: 'label', label: 'Signed in as dheva@axlekorp.com' },
      { label: 'Profile', icon: <User /> },
      { label: 'Settings', icon: <Settings /> },
      { label: 'Billing', icon: <Settings />, disabled: true },
      { type: 'separator' },
      { label: 'Log out', icon: <LogOut /> },
    ],
  },
};

export const WithCheckboxes: StoryObj = {
  render: function Render() {
    const [cols, setCols] = useState({ status: true, by: true, modules: false });
    return (
      <DropdownMenu
        open
        modal={false}
        trigger={<Button variant="secondary" rightIcon={<ChevronDown />}>Columns</Button>}
        items={[
          { type: 'label', label: 'Show columns' },
          { type: 'checkbox', label: 'Status', checked: cols.status, onCheckedChange: (v) => setCols({ ...cols, status: v }) },
          { type: 'checkbox', label: 'Created by', checked: cols.by, onCheckedChange: (v) => setCols({ ...cols, by: v }) },
          { type: 'checkbox', label: 'Modules', checked: cols.modules, onCheckedChange: (v) => setCols({ ...cols, modules: v }) },
        ]}
      />
    );
  },
};

export const Closed: Story = { args: { ...EditorMore.args!, open: undefined } as Story['args'] };
