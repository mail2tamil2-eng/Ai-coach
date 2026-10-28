import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'Primitives (shadcn)/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Introduction to SCORM</CardTitle>
        <CardDescription>2 modules · Last updated 30 Jan 2026</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Learn how SCORM packages communicate with an LMS.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button>Publish</Button>
        <Button variant="outline">Preview</Button>
      </CardFooter>
    </Card>
  ),
};

export const Empty: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardContent className="py-8 text-center text-sm text-muted-foreground">No courses yet.</CardContent>
    </Card>
  ),
};
