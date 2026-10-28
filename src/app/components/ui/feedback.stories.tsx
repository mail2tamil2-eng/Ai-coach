import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Progress } from './progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta = {
  title: 'Primitives (shadcn)/Feedback & overlays',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
  render: () => (
    <div className="grid w-[480px] gap-4">
      <Alert>
        <Info />
        <AlertTitle>Licence usage</AlertTitle>
        <AlertDescription>Publishing a course uses one licence.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>No licences left</AlertTitle>
        <AlertDescription>Contact your administrator to publish more courses.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const ProgressBar: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <span className="text-sm" id="progress-label">Generating outline — 60%</span>
      <Progress value={60} aria-labelledby="progress-label" />
    </div>
  ),
};

export const TabSet: Story = {
  render: () => (
    <Tabs defaultValue="content" className="w-96">
      <TabsList>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="content">Slide content editor.</TabsContent>
      <TabsContent value="design">Theme and template options.</TabsContent>
      <TabsContent value="settings">Player settings.</TabsContent>
    </Tabs>
  ),
};

export const TooltipOnIcon: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Licence info"><Info /></Button>
        </TooltipTrigger>
        <TooltipContent>Licence info</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const ConfirmDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete course</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this course?</DialogTitle>
          <DialogDescription>This removes the draft and its translations. This cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
