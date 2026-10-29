import { useRef, useState } from 'react';
import { ArrowLeft, Bot, CheckCircle2, FileText, Info, LoaderCircle, Play, Trash2, Upload } from 'lucide-react';
import JSZip from 'jszip';
import { Button } from '../app/components/saas/Button';
import { FormField, SelectInput, TextArea } from '../app/components/saas/FormField';
import { categories, courses, courseOf, validateSource, type Source } from './model';

async function extractFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'txt') return file.text();
  if (ext === 'docx' || ext === 'pptx') {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const entries = Object.keys(zip.files).filter(p => ext === 'docx' ? p === 'word/document.xml' : /^ppt\/slides\/slide\d+\.xml$/.test(p)).sort((a,b) => a.localeCompare(b,undefined,{numeric:true}));
    const parts = await Promise.all(entries.map(async p => {
      const xml = new DOMParser().parseFromString(await zip.file(p)!.async('string'),'application/xml');
      if (xml.querySelector('parsererror')) throw new Error('The document is corrupted. Upload a readable replacement.');
      return Array.from(xml.getElementsByTagNameNS('*','p')).map(el => Array.from(el.getElementsByTagNameNS('*','t')).map(t => t.textContent).join('')).join('\n\n');
    }));
    return parts.join('\n\n');
  }
  throw new Error('PDF, DOC and PPT processing requires the document service. For this local prototype, upload TXT, DOCX or PPTX, or use manual content.');
}

export function SourceForm({ source, sources, onClose, onSave }: { source?: Source; sources: Source[]; onClose: () => void; onSave: (s: Source) => void }) {
  const [category,setCategory] = useState(source ? courseOf(source.courseId).category : '');
  const [courseId,setCourseId] = useState(source?.courseId ?? '');
  const [type,setType] = useState<Source['type']>(source?.type ?? 'Manual');
  const [content,setContent] = useState(source?.content ?? '');
  const [file,setFile] = useState<File>();
  const [existingFileName,setExistingFileName] = useState(source?.type === 'Document' ? source.fileName : undefined);
  const fileInput = useRef<HTMLInputElement>(null);
  const documentName = file?.name ?? existingFileName;
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [phase,setPhase] = useState('');
  const removeDocument = () => {
    setFile(undefined);
    setExistingFileName(undefined);
    setError('');
    if (fileInput.current) fileInput.current.value = '';
  };
  const chooseFile = (next?: File) => {
    setError('');
    if (!next) return;
    if (!/\.(pdf|docx?|txt|pptx?)$/i.test(next.name)) { setError('Upload a PDF, DOC, DOCX, TXT, PPT or PPTX file.'); return; }
    if (next.size > 20*1024*1024) { setError('The file must be 20 MB or smaller.'); return; }
    if (!next.size) { setError('This file is empty. Upload a file with readable text.'); return; }
    setFile(next);
  };
  const save = async () => {
    const now = new Date().toISOString();
    let next: Source = { id: source?.id ?? crypto.randomUUID(), courseId, type, content: type === 'Manual' ? content : source?.content ?? '', state: 'Completed', inactive: source?.inactive ?? false, published: source?.published, dirty: true, created: source?.created ?? now, modified: now, author: 'Priya Sharma', fileName: type === 'Document' ? documentName : undefined };
    const validation = validateSource(next, sources);
    if(validation) {setError(validation); return;}
    if(type === 'Document' && !documentName) {setError('Upload one knowledge document.'); return;}
    if(type === 'Document' && !file && source?.state === 'Failed') {setError('Upload a readable replacement to retry processing.'); return;}
    if (busy) return;
    setBusy(true); setError(''); setPhase('Preparing your preview');
    const loadingStarted = Date.now();
    await new Promise(resolve => setTimeout(resolve, 50));
    if(file && type === 'Document') {
      setPhase('Pending');
      await new Promise(resolve => setTimeout(resolve,250));
      setPhase('Processing');
      try {
        const text = (await extractFile(file)).trim();
        if(!text || !/[\p{L}\p{N}]/u.test(text)) throw new Error('No readable text was found. Upload a text-based document.');
        next = { ...next, content: text };
      } catch(e) { next = { ...next, content: '', state: 'Failed', error: e instanceof Error ? e.message : 'Unable to read this document. Upload an unprotected, readable replacement.' }; }
    }
    if (next.state === 'Completed') {
      setPhase('Preparing your preview');
      await new Promise(resolve => setTimeout(resolve, Math.max(0, 1000 - (Date.now() - loadingStarted))));
    }
    onSave(next); setBusy(false);
  };
  if (busy) return <section className="panel flex min-h-[520px] items-center justify-center p-8" aria-busy="true" aria-label="Preparing AI Coach preview">
    <div className="w-full max-w-md text-center">
      <div className="relative mx-auto mb-7 flex size-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Bot className="size-9" aria-hidden="true"/><LoaderCircle className="absolute -bottom-2 -right-2 size-8 animate-spin rounded-full bg-white p-1 motion-reduce:animate-none" aria-hidden="true"/></div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Save and preview</p>
      <h1 className="text-2xl font-bold text-gray-900">Getting your AI Coach ready</h1>
      <p className="mt-3 text-sm leading-6 text-gray-500">{courseOf(courseId).title}</p>
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-7 rounded-xl border border-gray-100 bg-gray-50 p-5 text-left">
        <div className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="size-5 text-green-600" aria-hidden="true"/>Knowledge source checked</div>
        <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-blue-700"><LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true"/>{phase}</div>
      </div>
      <p className="mt-6 text-sm leading-6 text-gray-500">Your preview will open automatically. Please keep this page open.</p>
      <p className="mt-2 text-xs text-gray-400">Your source remains a draft until you publish.</p>
    </div>
  </section>;
  return <div className="source-editor-page">
    <Button variant="ghost" size="sm" disabled={busy} leftIcon={<ArrowLeft className="size-4" />} onClick={onClose}>Back</Button>
    <div className="page-heading mt-4"><div><h1>{source ? "Edit Knowledge Source" : "Add Knowledge Source"}</h1><p className="muted">Add course knowledge, save your draft, then test the Coach before publishing.</p></div></div>
    <form className="panel" onSubmit={e => {e.preventDefault();if (!busy) void save();}}>

    <div className="source-form space-y-5 p-5 sm:p-7">
      {source?.published && <div className="info-note"><Info/><span>Learners keep using the published version until you publish these changes.</span></div>}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Course Category" required>{({id}) => <SelectInput id={id} disabled={!!source || busy} value={category} onChange={e => {setCategory(e.target.value);setCourseId('');}} options={[{value:'',label:'Select category'},...categories.map(c=>({value:c,label:c}))]}/>}</FormField>
        <FormField label="Course Title" required>{({id}) => <SelectInput id={id} disabled={!!source || !category || busy} value={courseId} onChange={e=>setCourseId(e.target.value)} options={[{value:'',label:'Select course'},...courses.filter(c=>c.category===category).map(c=>({value:c.id,label:`${c.title}${sources.some(s=>s.courseId===c.id && s.id!==source?.id) ? ' · Already configured' : ''}`}))]}/>}</FormField>
      </div>
      <fieldset disabled={busy}><legend className="mb-2 text-[13px] font-semibold">Knowledge Source <span className="text-red-600">*</span></legend><div className="grid grid-cols-2 gap-3">{(['Manual','Document'] as const).map(t=><label key={t} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${type===t ? 'border-blue-500 bg-blue-50/40' : 'border-gray-200'}`}><input type="radio" className="accent-blue-600" name="sourceType" value={t} checked={type===t} onChange={()=>{setType(t);setError('');}}/><span><strong className="block text-[13px]">{t==='Manual' ? 'Enter manually' : 'Upload document'}</strong><span className="text-xs text-gray-500">{t==='Manual' ? 'Write or paste course knowledge' : 'One document per course'}</span></span></label>)}</div></fieldset>
      {type==='Manual' ? <FormField label="Knowledge Content" required labelAction={<span className="text-xs text-gray-500">{content.length.toLocaleString()} / 20,000</span>} hint="Include the concepts, explanations, and examples learners can ask about.">{({id})=><TextArea id={id} disabled={busy} rows={9} maxLength={20000} value={content} onChange={e=>setContent(e.target.value)} placeholder="Enter course-specific knowledge…"/>}</FormField> : <div><label className="upload-zone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(!busy){if(e.dataTransfer.files.length>1)setError('Upload one document at a time.');else chooseFile(e.dataTransfer.files[0]);}}}><Upload className="mx-auto mb-3 size-7 text-blue-600"/><strong className="block">{documentName ?? 'Choose a file or drag it here'}</strong><span className="muted block mt-1">PDF, DOC, DOCX, TXT, PPT, PPTX · Maximum 20 MB</span><input ref={fileInput} aria-label="Knowledge document" type="file" disabled={busy} accept=".pdf,.doc,.docx,.txt,.ppt,.pptx" onChange={e=>chooseFile(e.target.files?.[0])} className="mt-4 block w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700"/></label>{documentName && <div className="mt-3 flex justify-end"><Button variant="ghost" size="sm" disabled={busy} leftIcon={<Trash2 className="size-4"/>} type="button" onClick={removeDocument}>Remove document</Button></div>}<p className="muted mt-2 flex gap-2"><FileText className="size-4 shrink-0"/>Local processing supports TXT, DOCX and PPTX. Other formats need the document service.</p></div>}
      <div className="flex items-start gap-2 text-xs text-gray-500"><Info className="size-4 shrink-0"/>Assessment protection is always on. The coach helps explain concepts without answering active assessments.</div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {busy && <p role="status" className="text-blue-700">{phase} document. Please keep this page open.</p>}
    </div>
    <div className="source-editor-actions"><p className="muted">Save as a draft to preview. Publish when you are ready.</p><div className="flex gap-2"><Button type="button" variant="secondary" disabled={busy} onClick={onClose}>Cancel</Button><Button type="submit" loading={busy} disabled={busy} leftIcon={<Play className="size-4" />}>{busy ? (phase || "Saving") + "…" : "Save and Preview"}</Button></div></div>
    </form>
  </div>;
}
