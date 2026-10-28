import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { FormField, TextInput } from './FormField';
import { ConfirmDialog, Modal, type ModalSize, type ModalTone } from './Modal';
import { ProgressBar } from './Widgets';

type Args = { size: ModalSize; tone: ModalTone; title: string; description: string; withFooter: boolean };

const meta = {
  title: 'SaaS/Modal (popup)',
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'centered', docs: { story: { inline: false, iframeHeight: 520 } } },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    tone: { control: 'inline-radio', options: ['default', 'info', 'success', 'warning', 'danger'] },
  },
  args: { size: 'md', tone: 'default', title: 'Create New Course', description: "Choose how you'd like to create your course", withFooter: true },
  render: function Render({ withFooter, ...args }) {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open modal</Button>}
        footer={withFooter ? <><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Continue</Button></> : undefined}
      >
        <p className="m-0">Modal body content. Press <kbd>Esc</kbd> or click outside to close; focus stays inside while open.</p>
      </Modal>
    );
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const ExtraLarge: Story = { args: { size: 'xl' } };
export const Info: Story = { args: { tone: 'info', title: 'Licence usage', description: 'Publishing a course uses one licence.' } };
export const Success: Story = { args: { tone: 'success', title: 'Course published', description: 'Your SCORM package is ready to download.' } };
export const Warning: Story = { args: { tone: 'warning', title: 'Unsaved changes', description: 'Leave without saving your edits?' } };
export const Danger: Story = { args: { tone: 'danger', title: 'Export failed', description: 'The SCORM package could not be generated.' } };
export const WithoutFooter: Story = { args: { withFooter: false } };

export const WithForm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);
    const [name, setName] = useState('');
    return (
      <Modal open={open} onOpenChange={setOpen} trigger={<Button>Rename course</Button>} title="Rename course" size="sm"
        footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button disabled={!name.trim()} onClick={() => setOpen(false)}>Save</Button></>}>
        <FormField label="Course name" required>{({ id }) => <TextInput id={id} autoFocus value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
      </Modal>
    );
  },
};

export const Progress: Story = {
  name: 'Blocking progress',
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <Modal open={open} onOpenChange={setOpen} trigger={<Button>Publish</Button>} title="Publishing course…" description="Packaging SCORM 1.2 files" hideClose size="sm">
        <ProgressBar label="Packaging" value={64} />
      </Modal>
    );
  },
};

export const Confirm: Story = {
  name: 'Confirm dialog',
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete course</Button>
        <ConfirmDialog open={open} onOpenChange={setOpen} title="Delete this course?" description="This action cannot be undone. This will permanently delete the course." confirmLabel="Delete" onConfirm={fn()} />
      </>
    );
  },
};

export const ConfirmLoading: Story = {
  render: () => <ConfirmDialog open onOpenChange={() => {}} title="Delete this course?" description="Deleting…" confirmLabel="Delete" loading onConfirm={fn()} />,
};
