import { ArrowLeft, CheckCircle2, Pencil, ShieldCheck, Upload } from 'lucide-react';
import { Button } from '../app/components/saas/Button';

import { Chat } from './Chat';
import { type Source } from './model';

export function SourcePreview({ source, name, onBack, onEdit, onPublish }: {
  source: Source; name: string; onBack: () => void; onEdit: () => void; onPublish: () => void;
}) {

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
    </div>
  </>;
}
