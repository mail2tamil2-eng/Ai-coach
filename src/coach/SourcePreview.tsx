import { ArrowLeft, CheckCircle2, FileText, Pencil, ShieldCheck, Upload } from 'lucide-react';
import { Button } from '../app/components/saas/Button';
import { StatusBadge } from '../app/components/saas/StatusBadge';
import { Chat } from './Chat';
import { courseOf, type Source } from './model';

export function SourcePreview({ source, name, onBack, onEdit, onPublish }: {
  source: Source; name: string; onBack: () => void; onEdit: () => void; onPublish: () => void;
}) {
  const course = courseOf(source.courseId);
  const published = !!source.published && !source.dirty;
  return <>
    <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />} onClick={onBack}>All Knowledge Sources</Button>
    <div className="page-heading mt-4">
      <div><h1>Preview AI Coach</h1><p className="muted">Test your saved knowledge before making it available to learners.</p></div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" leftIcon={<Pencil className="size-4" />} onClick={onEdit}>Edit Knowledge Source</Button>
        <Button disabled={source.state !== 'Completed' || published} leftIcon={published ? <CheckCircle2 className="size-4" /> : <Upload className="size-4" />} onClick={onPublish}>{published ? 'Published' : 'Publish'}</Button>
      </div>
    </div>
    <div className="info-note mb-5"><ShieldCheck /><span>{published
      ? source.inactive ? 'This knowledge is published, but the Coach is deactivated. Reactivate it from the source list when ready.' : 'This knowledge is published and available to learners.'
      : source.published ? 'Your changes are saved as a draft. Learners keep using the previous version until you publish.' : 'Your source is saved as a draft. Learners cannot access this Coach until you publish.'}</span></div>
    <div className="source-preview-grid">
      <section className="panel source-preview-chat" aria-label="AI Coach preview">
        <Chat key={`${source.id}-${source.modified}`} content={source.content} name={name} preview />
      </section>
      <aside className="space-y-5">
        <section className="panel p-5">
          <div className="flex items-center justify-between gap-2 mb-5"><h2 className="subheading !mb-0">Knowledge Source</h2><StatusBadge status={published ? 'published' : 'draft'}>{published ? 'Published' : 'Draft'}</StatusBadge></div>
          <dl className="meta-list">
            <div><dt>Course category</dt><dd>{course.category}</dd></div>
            <div><dt>Course title</dt><dd>{course.title}</dd></div>
            <div><dt>Source type</dt><dd>{source.type === 'Manual' ? 'Manual entry' : 'Document upload'}</dd></div>
            {source.fileName && <div><dt>Document</dt><dd className="flex items-start gap-2 break-all"><FileText className="size-4 shrink-0" />{source.fileName}</dd></div>}
            <div><dt>Processing status</dt><dd className="text-green-700">Completed</dd></div>
          </dl>
        </section>
        <section className="panel p-5"><h2 className="subheading">Check before publishing</h2><p className="muted">Ask a few questions about the course and check the responses. Edit the knowledge if anything needs improving, then save and preview again.</p><p className="muted mt-3">Preview conversations are not included in learner reports. Assessment protection remains enabled.</p></section>
      </aside>
    </div>
  </>;
}
