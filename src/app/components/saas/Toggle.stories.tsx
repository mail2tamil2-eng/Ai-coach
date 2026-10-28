import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Toggle } from './Toggle';

const meta = {
  title: 'SaaS/Toggle',
  parameters: { a11y: { test: 'error' } },
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'Enable subtitles / captions', checked: true, onChange: fn() },
  decorators: [(S) => <div className="w-80"><S /></div>],
  render: function Render(args) {
    const [on, setOn] = useState(args.checked);
    return <Toggle {...args} checked={on} onChange={(v) => { setOn(v); args.onChange(v); }} />;
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};
export const Off: Story = { args: { checked: false } };
export const WithDescription: Story = { args: { label: 'AI Audio Narration', description: 'Generate a voice-over from the slide script.' } };
export const DisabledOn: Story = { args: { disabled: true } };
export const DisabledOff: Story = { args: { disabled: true, checked: false } };

export const SettingsGroup: Story = {
  render: function Render() {
    const [s, set] = useState({ subtitles: true, autoplay: false, loop: false, music: true });
    return (
      <div className="grid gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4">
        <Toggle label="Enable subtitles / captions" checked={s.subtitles} onChange={(v) => set({ ...s, subtitles: v })} />
        <Toggle label="Autoplay" checked={s.autoplay} onChange={(v) => set({ ...s, autoplay: v })} />
        <Toggle label="Loop" checked={s.loop} onChange={(v) => set({ ...s, loop: v })} />
        <Toggle label="AI background music" checked={s.music} onChange={(v) => set({ ...s, music: v })} />
      </div>
    );
  },
};
