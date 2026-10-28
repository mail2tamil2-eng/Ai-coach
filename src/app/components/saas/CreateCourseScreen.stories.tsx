import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowRight, ClipboardCheck, FileText, HelpCircle, Image, ListChecks, Sparkles } from 'lucide-react';
import { ActionBar, Button, Chip, FormField, PageHeader, SectionCard, SelectInput, SelectionCard, StatusBadge, TextArea, TextInput } from '.';

/** The Create Course step 1 screen composed only from SaaS components — a reference for building new screens. */
function CreateCourseScreen() {
  const [title, setTitle] = useState('');
  const [complexity, setComplexity] = useState('basic');
  const [touched, setTouched] = useState(false);
  const canGenerate = title.trim().length > 0;
  return (
    <div className="flex h-[900px] flex-col bg-[#F9FAFB]" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-[min(1120px,calc(100%-64px))] pb-8 pt-6">
          <PageHeader
            title="Create Course"
            onBack={() => {}}
            badge={<StatusBadge status="step">Step 1 of 2 · Course Details</StatusBadge>}
            breadcrumbs={[{ label: 'Home', onClick: () => {} }, { label: 'My Courses', onClick: () => {} }, { label: 'Create Course' }]}
          />
          <div className="grid grid-cols-[minmax(0,760px)_320px] items-start gap-6 pt-7">
            <div className="flex flex-col gap-4">
              <SectionCard title="Course Information">
                <div className="grid gap-3.5">
                  <FormField label="Course Title" required error={touched && !canGenerate ? 'Add a course title to continue.' : undefined}>
                    {({ id, describedBy, invalid }) => (
                      <TextInput id={id} aria-describedby={describedBy} invalid={invalid} value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setTouched(true)} placeholder="e.g. Introduction to Machine Learning" />
                    )}
                  </FormField>
                  <FormField label="Course Description">
                    {({ id }) => <TextArea id={id} placeholder="Describe what this course is about and what learners will gain..." />}
                  </FormField>
                </div>
              </SectionCard>
              <SectionCard title="Course Complexity" action="Sets available slide types">
                <div role="group" aria-label="Course complexity" className="grid grid-cols-3 gap-2.5">
                  <SelectionCard title="Basic" dotColor="#10B981" description="Text, images, knowledge checks, quizzes" selected={complexity === 'basic'} onSelect={() => setComplexity('basic')} />
                  <SelectionCard title="Intermediate" dotColor="#3B82F6" description="Basic + video, audio, spokesperson, scenarios" selected={complexity === 'intermediate'} onSelect={() => setComplexity('intermediate')} />
                  <SelectionCard title="Advanced" dotColor="#8B5CF6" description="Intermediate + summaries, branching scenarios" selected={complexity === 'advanced'} onSelect={() => setComplexity('advanced')} />
                </div>
              </SectionCard>
              <SectionCard title="Duration & Language">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Duration">
                    {({ id }) => (
                      <div className="flex gap-2">
                        <TextInput id={id} type="number" min={1} placeholder="30" className="flex-1" />
                        <SelectInput aria-label="Duration unit" options={[{ value: 'hours', label: 'hrs' }, { value: 'minutes', label: 'min' }]} className="w-20" />
                      </div>
                    )}
                  </FormField>
                  <FormField label="Language">{({ id }) => <SelectInput id={id} options={['English', 'Tamil', 'Hindi', 'French']} />}</FormField>
                </div>
              </SectionCard>
              <SectionCard title="Learning Objectives" subtitle="What learners will be able to do after this course" action={<Button variant="soft" size="sm" leftIcon={<Sparkles />}>Generate with AI</Button>}>
                <TextArea aria-label="Learning objectives" placeholder="One objective per line" />
              </SectionCard>
            </div>
            <div className="sticky top-6 flex flex-col gap-3.5">
              <SectionCard variant="eyebrow" padding="compact" title="Live Preview">
                <div className="flex aspect-video items-center justify-center rounded-lg bg-[#134780] text-lg font-bold text-white">{title || 'Your Course Title'}</div>
                <p className="mt-2 text-center text-[13px] text-[#6B7280]">Updates as you fill in the details</p>
              </SectionCard>
              <SectionCard variant="eyebrow" padding="compact" title="Slide types included" action={<StatusBadge status={complexity as 'basic'} />}>
                <div className="flex flex-wrap gap-1.5">
                  <Chip icon={<FileText />}>Title + Text</Chip>
                  <Chip icon={<ListChecks />}>Bullet Points</Chip>
                  <Chip icon={<Image />}>Image / Visual</Chip>
                  <Chip icon={<ClipboardCheck />}>Knowledge Check</Chip>
                  <Chip icon={<HelpCircle />}>Quiz</Chip>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
      <ActionBar
        start={<Button variant="secondary">Cancel</Button>}
        hint={!canGenerate ? 'Add a course title to continue' : undefined}
        end={<Button disabled={!canGenerate} leftIcon={<Sparkles />} rightIcon={<ArrowRight />}>Generate Course</Button>}
      />
    </div>
  );
}

const meta = {
  title: 'SaaS/Screens/Create Course',
  component: CreateCourseScreen,
  parameters: { a11y: { test: 'error' }, layout: 'fullscreen' },
} satisfies Meta<typeof CreateCourseScreen>;

export default meta;
export const Step1: StoryObj<typeof meta> = {};
