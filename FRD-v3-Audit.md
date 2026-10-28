# AI Coach — FRD v3 implementation audit
Date: 28 October 2026
Project: C:/Users/M1582/Downloads/AI Coach
Baseline: User-supplied FRD v3, proposed/revised draft dated 08 October 2026.

## Verdict
**Not all FRD requirements are met.** The current implementation is an interactive frontend prototype. Core authoring, publication and reporting demonstrations work, but it is not ready for production FRD sign-off.

This is a review, not an implementation change. “Implemented in prototype” means the behavior exists locally; it does not imply server-side access control, production security, durable storage or real AI integration. No compliance percentage is assigned because the FRD mixes product behavior, wording, infrastructure and security requirements.

## Verification performed
- npm run test: 7/7 model tests passed.
- npm run test:e2e: 7/7 browser tests passed.
- npm run typecheck: passed.
- npm run build: passed.
- Read all six active coach implementation files: App.tsx, SourceForm.tsx, Chat.tsx, Report.tsx, model.ts and coach.css.
- Existing automated tests exercise duplicate prevention, draft/published separation, failed-publication blocking, basic grounding/refusal, authoring, source activation, learner session reset, report access in UI, filters, mobile fit, upload/extraction failure and document removal.
- Passing tests do NOT prove the uncovered FRD requirements. Real provider calls, microphone permission/language behavior, malicious-file handling, tenant isolation and enrolment integration were not end-to-end verified.
- Application entry is src/main.tsx -> src/coach/App.tsx. Other inherited UI/demo files are not evidence of active product integration.

## Release-blocking findings
1. **Access is simulated.** A role dropdown changes client state. Courses, creator identity and learner identity are hardcoded. Source and Session records have no tenant ID. There is no authenticated tenant/course authorization or enrolment expiry/suspension/unenrolment enforcement. See App.tsx:31, 48, 54, 58 and model.ts:1.
2. **No real AI/service integration.** Chat calls answerFrom synchronously; it ranks paragraphs by English keyword overlap. There is no provider/model/API-key mapping, tenant-credit or quota check, timeout/network-error path, generation retry or request deduplication. See Chat.tsx:17 and model.ts:39.
3. **All required document formats are not processed.** Only TXT, DOCX and PPTX have local extraction. PDF, DOC and PPT are accepted by the picker but intentionally fail during processing. Persistent tenant-isolated storage and a document service are absent. See SourceForm.tsx:10.
4. **Follow-up context is not used.** The message list is displayed, but response selection receives only the current question and content. A context-dependent follow-up such as “What about the second one?” does not receive previous turns. See Chat.tsx:19.
5. **Assessment protection is a demo guard.** The UI’s Knowledge Check tab passes a local boolean; a keyword regex also blocks some questions. There is no trusted LMS metadata or authorized matching. Active mode refuses every request rather than providing safe conceptual assistance. Uploaded content is returned verbatim when matched; there is no policy-aware malicious-content filtering. See model.ts:39 and App.tsx:64, 68.
6. **Audit and durable reporting are missing.** All data, including raw learner conversations, lives in one localStorage record. No protected configuration/failure/usage audit exists. Read-only report controls do not establish immutable tenant-isolated records. See App.tsx:21–25, 46 and 54.

## Requirement coverage matrix
| FRD area | Assessment | Implementation / gap |
| --- | --- | --- |
| 1–2: course-specific explanation | Partial | Paragraph lookup is scoped to the supplied course content but is not semantic AI and has no conversation reasoning. |
| 2: VILT knowledge only when explicitly supplied | Implemented in prototype | Manual text or supported document text can contain supplied notes. No automatic meeting integration is present. |
| 2: no automatic LMS/SCORM/quiz reading | Aligned | Active implementation does not scrape these sources. |
| 3: configured provider/model/credentials/credits | Missing | No configuration mapping or service dependency checks. |
| 3: course/enrolment and processing/storage dependencies | Missing integrations | Hardcoded courses; local document extraction and browser storage. |
| 4: Tenant Admin name, Org Admin management/report, Course Creator authoring | Partial | Screen/navigation restrictions exist; backend authorization and creator-course permissions do not. |
| 4/7.5.1: active enrolment and completed-learner eligibility | Partial | Published/inactive visibility is demonstrated; a completed demo course is supported. No enrolment records or denial on expiry, suspension or unenrolment. |
| 6/7.1: tenant-wide name, required, 100 characters | Partial | One shared local name, required validation and maxLength=100. No tenant scope or API-key mapping. Exact empty/length/success messages are not implemented; maxLength prevents the over-limit UI state. |
| 6/7.2: course association and duplicate prevention | Implemented in prototype | Known course required; duplicate source rejected, including inactive sources; existing source editable. No tenant key or server uniqueness constraint. |
| 7.2/7.3: category and filtered title | Partial | Category dropdown filters title and title is disabled until category chosen. No distinct category-required validation message. |
| 7.3: source-type dropdown | UI deviation | Uses two radio cards with Manual selected by default. Type cannot be empty via UI, so required-type message is absent. |
| 7.3: manual knowledge required, 20,000 characters | Implemented in prototype | Required and length validation plus maxLength. Empty-content wording differs. |
| 7.3: one document, accepted extensions and 20 MB | Partial | Single file, extension and size checks exist; multi-file drop is rejected. Format support is narrower than the accepted list. |
| 7.3: selected document removal/replacement | Implemented in prototype | Remove document clears selected/existing filename and picker; replacement is required before saving document mode. New test covers re-uploading the same file and removing an existing document. |
| 7.3: Pending -> Processing -> Completed/Failed | Partial | Pending/Processing are transient modal labels for new document extraction. Stored state supports only Completed/Failed; manual entry skips those phases. No durable job or interrupted-job recovery. |
| 7.3: empty/unreadable/encrypted/corrupt files | Partial | Empty file rejected before processing; unreadable extracted text fails; malformed XML has a failure message. Password-protected files have no explicit classification. Some ZIP errors may be shown raw to authors. |
| 7.3/12: retry interrupted/failed processing | Partial | Replace Document & Retry opens the edit form and requires selecting a replacement. No retry of a retained original file or interrupted processing job. |
| 7.3: created and last-modified identity/date | Partial | Dates are stored, but one hardcoded author field is reused for both identities. Original creator and latest modifier are not distinct authenticated actors. |
| 7.3: list/search/status/category/actions | Implemented in prototype with presentation deviation | Search, filters, list and actions exist. Source type displays Document rather than the actual PDF/DOCX/etc. format shown in the FRD example. |
| 7.3: edit keeps previous published knowledge | Implemented in prototype | Draft content and published string are separate; failed processing retains the previous published string. |
| 7.3: publish/deactivate/reactivate/delete | Implemented in prototype | Publication checks successful processing; inactive sources hide learner access on subsequent opens; reactivation uses last published content; deletion asks confirmation. No cross-client enforcement or server audit. |
| 7.4: draft-only preview and publication gate | Implemented in prototype | Preview uses draft content; failed processing disables Preview/Publish; preview has a draft marker and does not record learner sessions. |
| 7.4: preview service unavailable / credits exhausted | Missing | No service or quota checks and no corresponding states. |
| 7.5.2: input/send/history/scroll | Partial | Text input, send and scrolling exist; response is synchronous with no generation loading state. |
| 7.5.2: voice input, permission and stop | Partial / not runtime verified | Browser speech recognition, Stop Recording and generic errors exist. English en-US is fixed; no language selector or dedicated unsupported-language state. Spoken output is unimplemented and remains a provider/product decision in the FRD. |
| 7.5.2: switching text/voice retains context | Partial | Displayed messages remain, but AI follow-up context is not implemented. Editing a transcript changes the recorded mode to Text. |
| 7.5.3: close/reopen/refresh/New Chat clear visible messages | Implemented in prototype | Chat state remounts on reopen; New Chat clears state and ends the report session. Old conversations are not restored in learner UI. |
| 7.5.3: each new session uses latest published knowledge | Partial | Opening chat takes a published snapshot. New Chat only clears messages and ends the report session; it does not refresh that snapshot. Cross-tab/server publication updates are not synchronized. |
| 7.5.3/10: New conversation started notification | Missing | New Chat returns to welcome screen but emits no required confirmation. |
| 7.6.1: report filters | Partial | Category, course, text search for learner/email/ID, date range and session status work. Learner search is not a searchable dropdown as specified. |
| 7.6.2: separate session rows, IDs and query counts | Implemented in prototype | New recorded sessions get unique IDs; repeated sessions remain distinct; query count uses messages.length. All generated learner records use one hardcoded learner. |
| 7.6.2–3: detail view/chat layout/read-only/empty state | Implemented in prototype | In-place detail navigation, user/course details, chat bubbles and read-only UI; exact empty-state wording exists. No shareable session URL. |
| 7.6.3: timestamp/mode/status and failed response display | Partial | Fields exist and “Response not generated” is rendered for Failed. Live chat never generates a Failed response record because there is no failure path. |
| 7.6.3: authorized Org Admin tenant-only reporting | Missing production enforcement | Org Admin UI gate exists; role switch and localStorage can expose all local records. No tenant partitioning. |
| 8.1: welcome, generic prompts and clarification | Mostly implemented | Exact welcome and three suggested prompts exist; generic prompts request a topic. Arbitrary unclear questions go to keyword lookup/fallback rather than explicit clarification. |
| 8.2: unsupported-content fallback | Implemented in prototype | Section 8.2’s exact fallback exists. Keyword relevance is weak and not semantic evidence checking. |
| 8.3: always-on assessment guard/no admin override | Partial | No disable control; shared answerFrom used by preview and learner chat. Reliable LMS context, authorized matching and safe conceptual responses are absent. |
| 9/12: network/timeout/outage/retry/deduplication | Missing | No asynchronous generation/request lifecycle. |
| 9: question length and error message | Partial | Local limit is 500, silently rejected above limit in send and constrained in input. Exact FRD message is absent; FRD needs to specify the numeric limit. |
| 9: credit exhaustion/provider quotas | Missing | No checks, block behavior, messages or failure logging. |
| 10: notification wording | Partial | Welcome, course fallback, refusal, empty report and failed-report placeholder match. Most other messages differ or are absent; see message matrix. |
| 11: configuration/processing/service/usage audits | Missing | Current records are overwritten in localStorage; no separate append-only events, aggregate counters or protected audit storage. |
| 12: malicious instructions cannot override policy | Not established | Local assessment flag takes precedence, but matched source paragraphs are returned directly and there is no trust boundary or adversarial evaluation. |
| 12: no raw technical errors to learners | Partial | Current learner responses are local generic strings; no provider-error sanitization path has been implemented or tested. |

## Notification/message matrix
| ID | Result |
| --- | --- |
| N1 | Exact welcome and optional prompts implemented. |
| N2 | “New conversation started.” absent. |
| N3 | Exact section 8.2 fallback implemented. |
| N4 | Exact refusal implemented, subject to the limited demo guard. |
| N5 | Both credit/quota variants absent; final wording still needs product confirmation. |
| N6 | Generation-failed message/retry absent. |
| N7 | Preview-credit message absent. |
| N8 | Preview-unavailable message absent. |
| N9 | Generic document error/replacement workflow exists; exact message and retry-in-place absent. |
| N10 | Save/publish/reactivate toasts exist with different text and capitalization. |
| N11 | “Coach settings saved.” used instead of “AI Coach name saved successfully.” |
| N12 | Exact “No conversation records found.” implemented. |
| N13 | Exact placeholder implemented in report rendering, but no live failed-generation flow populates it. |

Other wording mismatches include name required, course/category selection, manual required, file required/type/size, unreadable/corrupt/encrypted document and microphone errors. The radio/default selection and maxlength controls prevent some specified validation states from being reached in the UI. These are still deviations if the FRD’s exact messages and controls are acceptance criteria.

## FRD questions to resolve before sign-off
- Choose a final N5 credit-limit message; the document intentionally lists multiple alternatives.
- Align the two unsupported-content phrasings in sections 8.2 and 9.
- Define the numeric learner question limit (prototype uses 500).
- Confirm whether radio cards may replace the required source-type dropdown and text search may replace the learner searchable dropdown.
- Confirm which roles may create a new configuration versus only manage an assigned course: section 4 and section 7.3 use overlapping Admin/Org Admin/Course Creator wording.
- Define trusted assessment-context and authorized-match API contracts; distinguish enforced active mode from best-effort copied-question detection.
- Confirm voice language support and whether spoken output is in acceptance scope.
- Define conversation/audit retention and secure storage ownership separately from the learner’s session-only visible history.

## Recommended completion order
1. Finish prototype acceptance gaps: exact messages, report learner selector, source-type control decision, generation loading/error/retry states, explicit preview outage/quota states, creator/modifier separation and processing lifecycle/retry behavior.
2. Implement real service contracts: identity/tenant/course permissions, enrolment enforcement, provider/model mapping, AI quota accounting, tenant-isolated document processing/storage and all required file types.
3. Implement model/session policy: course-only retrieval, follow-up history, refresh published knowledge at every new session, trusted assessment gating, safe conceptual help and adversarial content handling.
4. Add protected session reporting and audit events, request idempotency and lifecycle tests.
5. Validate with a full FRD acceptance suite, including expired/suspended/unenrolled users, cross-tenant access attempts, voice denial/language failure, protected/corrupt files, outages, exhausted credits and interrupted processing.

Do not present this prototype as fully FRD-compliant based solely on the passing current tests.

