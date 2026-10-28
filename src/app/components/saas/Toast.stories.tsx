import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { Button } from './Button';
import { AppToaster, notify } from './Toast';

const meta = {
  title: 'SaaS/Toaster',
  component: AppToaster,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' }, layout: 'padded', docs: { story: { inline: false, iframeHeight: 420 } } },
  decorators: [(S) => <div className="min-h-[380px]"><S /><AppToaster /></div>],
} satisfies Meta<typeof AppToaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const show = (fire: () => void) =>
  function Render() {
    // Defer so the sibling <AppToaster/> has subscribed before the toast fires.
    useEffect(() => { const t = setTimeout(fire, 50); return () => { clearTimeout(t); notify.dismiss(); }; }, []);
    return <p className="text-[13px] text-[#6B7280]">Toast appears top-right.</p>;
  };

export const Success: Story = { render: show(() => notify.success('Course published', { description: 'Introduction to SCORM v2 is ready to download.', duration: 1e9 })) };
export const Error: Story = { render: show(() => notify.error('Export failed', { description: 'Check your connection and try again.', duration: 1e9 })) };
export const Warning: Story = { render: show(() => notify.warning('Licence limit almost reached', { description: '2 of 50 licences left.', duration: 1e9 })) };
export const Info: Story = { render: show(() => notify.info('Autosaved', { description: 'Draft saved at 10:42.', duration: 1e9 })) };
export const Loading: Story = { render: show(() => notify.loading('Generating your course…', { duration: 1e9 })) };
export const WithAction: Story = { render: show(() => notify.success('Course deleted', { action: { label: 'Undo', onClick: () => {} }, duration: 1e9 })) };

export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => notify.success('Course published', { description: 'Ready to download.' })}>Success</Button>
      <Button variant="secondary" onClick={() => notify.error('Export failed', { description: 'Please try again.' })}>Error</Button>
      <Button variant="secondary" onClick={() => notify.warning('Almost out of licences')}>Warning</Button>
      <Button variant="secondary" onClick={() => notify.info('Draft saved')}>Info</Button>
      <Button variant="secondary" onClick={() => notify.success('Course deleted', { action: { label: 'Undo', onClick: () => notify.info('Restored') } })}>With action</Button>
      <Button
        onClick={() =>
          notify.promise(new Promise((r) => setTimeout(r, 1500)), { loading: 'Publishing…', success: 'Published!', error: 'Failed to publish' })
        }
      >
        Promise
      </Button>
    </div>
  ),
};
