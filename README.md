# Axle Korp AI Coach

Standalone React prototype based on `Axle_Korp_AI_Coach_FRD.docx` and the supplied HTML reference. Reuses the AI Credit Management SaaS components, navigation, dialogs, action icons and Storybook design system. The original reference files are preserved in this folder.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5174
npm run storybook -- --host 127.0.0.1 --port 6007
```

```sh
npm run build
npm run build-storybook
npm test
```

## Included flows

- Org Admin: knowledge sources, search and filters, create/edit, draft preview, publish, deactivate/reactivate, delete, read-only conversation reports with learner/course/category/date/status filters.
- Course Creator: knowledge-source workflow without conversation reports.
- Tenant Admin: tenant-wide coach name, required and limited to 100 characters.
- Learner: enrolled sample courses, published coach, text/voice questions, new conversation, assessment refusal. New chats, closed/reopened chats and refreshes start without prior learner messages. Org Admin can review recorded sessions.
- One source per course, including inactive sources. Published snapshots remain available while edited drafts are unpublished or failed. Deactivation and deletion require confirmation.
- Manual content up to 20,000 characters; single-file upload up to 20 MB. Local text extraction for TXT, DOCX and PPTX. PDF, DOC and PPT fail with an explicit service-required message; no fabricated extraction success. Retry by replacing a failed document.
- Shared component stories and AI Coach role, form, preview, assessment and report stories.

## Prototype boundaries

This is a UI prototype, not a production AI service. Responses use deterministic paragraph matching against course content. Browser speech recognition is used when available; permission, transcription and unsupported-browser failures offer text input. Voice transcripts require review and Send. Speech recognition availability and processing depend on the browser/provider.

Data is stored only in this browser's localStorage (`axle-ai-coach-v1`). There is no backend, authentication, API key handling, production tenant isolation, enrollment validation, credit charging, processing queue or server audit trail. Role switching previews the UI; it is not an authorization boundary. Sample PDF sources use fixture text, while newly uploaded PDFs require the future document service. Do not use confidential or production learner data.

The assessment screen blocks all coach questions while active; copied assessment prompts use a limited keyword heuristic. Production protection must use trusted LMS assessment state and server-side enforcement. Before deployment for real use, integrate authentication, tenant/course permissions, current enrollment/access checks, AI and document services, service-limit/timeout/retry states, secure session retention, auditing and privacy controls. Course lesson content and progress are representative fixtures.

The existing AI Credit Management project is unchanged. Git remote: https://github.com/mail2tamil2-eng/Ai-coach
