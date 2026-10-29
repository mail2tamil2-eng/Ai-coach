export type Role = 'Admin' | 'Learner';
export type Source = { id: string; courseId: string; type: 'Manual' | 'Document'; content: string; fileName?: string; state: 'Completed' | 'Failed'; error?: string; published?: string; inactive: boolean; dirty: boolean; created: string; modified: string; author: string };
export type Message = { question: string; answer: string; mode: 'Text' | 'Voice'; status: 'Success' | 'Blocked' | 'Failed'; error?: string; time: string };
export type Session = { id: string; learner: string; email: string; learnerId: string; courseId: string; date: string; status: 'Active' | 'Completed' | 'Disconnected'; messages: Message[] };
export const courses = [
  { id: 'c1', title: 'Communication Skills', category: 'Soft Skills', progress: 68 },
  { id: 'c2', title: 'Leadership Skills', category: 'Management', progress: 42 },
  { id: 'c3', title: 'Data Privacy Basics', category: 'Compliance', progress: 0 },
  { id: 'c4', title: 'Customer Handling', category: 'Soft Skills', progress: 100 },
  { id: 'c5', title: 'Time Management', category: 'Management', progress: 15 },
  { id: 'c6', title: 'Business Writing', category: 'Professional Skill', progress: 0 },
  { id: 'c7', title: 'Presentation Skills', category: 'Professional Skill', progress: 0 },
  { id: 'c8', title: 'POSH Awareness', category: 'Compliance', progress: 0 },
  { id: 'c9', title: 'Excel for Analysts', category: 'Technology', progress: 0 },
  { id: 'c10', title: 'Performance Reviews', category: 'Management', progress: 0 },
];
export const categories = [...new Set(courses.map(c => c.category))];
export const courseOf = (id: string) => courses.find(c => c.id === id)!;
const knowledge = [
  'Active listening means giving your full attention, paraphrasing what you hear, and asking clarifying questions. For example, restate a colleague’s concern before suggesting a solution.\n\nCommunication barriers include physical, language, emotional, and cultural barriers. Reduce barriers by using clear language, checking understanding, and choosing the right communication channel.\n\nNon-verbal communication includes posture, eye contact, tone, and gestures. Effective feedback describes the situation, behavior, and impact (SBI), then invites a discussion.',
  'Leadership is the ability to guide, motivate, and support a team toward shared goals. An effective leader identifies challenges, distributes responsibilities, and supports the team in meeting deadlines.\n\nLeadership inspires a shared vision. Management focuses on planning, organizing, and monitoring work. Both are important for team success.\n\nKey leadership skills include active listening, clear communication, constructive feedback, decision-making, and teamwork. For example, a leader listens to a team member’s concern and agrees on a practical next step.\n\nLeadership styles include democratic, autocratic, transformational, and servant leadership. Democratic leadership involves the team in decisions. Servant leadership puts the team’s needs first.',
  'Protect personal information by collecting only what is needed, limiting access, and following your organization’s retention policy. Report a suspected data breach promptly.',
  'Use HEARD when helping an unhappy customer: Hear, Empathize, Apologize, Resolve, and Diagnose. Listen without interruption, acknowledge the concern, and agree on the next step.\n\nFor example, say: I understand how frustrating this delay is. Let me check the order and give you an update. Be honest about what you can resolve and escalate when needed.',
  'Prioritize tasks by urgency and importance. Do urgent important tasks, schedule important non-urgent tasks, delegate urgent less-important tasks, and drop unnecessary tasks. Block focused time for important work.',
];
export const initialSources: Source[] = courses.slice(0, 5).map((c, i) => ({ id: `src-${i + 1}`, courseId: c.id, type: i % 2 ? 'Manual' : 'Document', content: knowledge[i], fileName: i % 2 ? undefined : `${c.title.replaceAll(' ', '_')}.pdf`, state: 'Completed', published: i === 2 ? undefined : knowledge[i], dirty: i === 2, inactive: i === 4, created: '2026-10-08T09:00:00', modified: `2026-10-${20 + i}T10:30:00`, author: 'Priya Sharma' }));
export function sourceStatus(s: Source) { return s.inactive ? 'Inactive' : s.state === 'Failed' ? 'Failed' : s.dirty || !s.published ? 'Draft' : 'Published'; }
export function publish(s: Source): Source {
  if (s.state !== 'Completed' || !s.content.trim()) throw new Error('Complete processing before publishing.');
  return { ...s, published: s.content, dirty: false, inactive: false, modified: new Date().toISOString() };
}
export function validateSource(s: Source, existing: Source[]) {
  if (!courses.some(c => c.id === s.courseId)) return 'Select a course.';
  if (existing.some(v => v.courseId === s.courseId && v.id !== s.id)) return 'This course already has a knowledge source. Edit the existing source instead.';
  if (s.type === 'Manual' && !s.content.trim()) return 'Enter the knowledge content.';
  if (s.type === 'Manual' && s.content.length > 20000) return 'Knowledge content cannot exceed 20,000 characters.';
  return '';
}
export function answerFrom(content: string, question: string, assessment = false): Pick<Message, 'answer' | 'status'> {
  if (assessment || /\b(quiz|assessment|exam|correct answer|option [abcd])\b/i.test(question)) return { answer: "I can help explain the concept, but I can't provide the answer to an active assessment.", status: 'Blocked' };
  if (/^(explain a topic|give me an example|summarize a concept)$/i.test(question.trim())) return { answer: 'Which topic from this course would you like to explore?', status: 'Success' };
  const words = question.toLowerCase().match(/[a-z]{4,}/g)?.filter(w => !['what', 'does', 'with', 'that', 'this', 'explain', 'please', 'about', 'give', 'example', 'summarize'].includes(w)) ?? [];
  const matches = content.split(/\n\s*\n/).map(text => ({ text, score: words.filter(w => text.toLowerCase().includes(w)).length })).sort((a,b) => b.score-a.score);
  return { answer: matches[0]?.score ? matches[0].text : "I couldn't find that information in this course's provided knowledge.", status: 'Success' };
}
export const initialSessions: Session[] = ['Kavya Nair', 'Rahul Menon', 'Sanjay Iyer', 'Learner A', 'Learner B'].map((learner, i) => ({ id: `S-2410${i}`, learner, email: `${learner.toLowerCase().replaceAll(' ', '.')}@axlekorp.com`, learnerId: `AK-10${42+i}`, courseId: ['c1','c4','c4','c1','c2'][i], date: `2026-10-${23-i}T10:30:00`, status: i === 0 ? 'Disconnected' : 'Completed', messages: [{ question: i === 4 ? 'What is the correct answer to the assessment?' : 'Give me an example', answer: i === 4 ? "I can help explain the concept, but I can't provide the answer to an active assessment." : 'Which topic from this course would you like to explore?', mode: i === 1 ? 'Voice' : 'Text', status: i === 0 ? 'Failed' : i === 4 ? 'Blocked' : 'Success', error: i === 0 ? 'Connection failure. The response could not be completed because the chat was disconnected.' : undefined, time: `2026-10-${23-i}T10:30:00` }] }));
// Sample failures for reviewing Conversation Details in the prototype.
initialSessions[0].messages.push(
  { question: 'Please explain every course topic with practical examples and detailed exercises. '.repeat(14).trim(), answer: '', mode: 'Text', status: 'Failed', error: 'Your question exceeds the maximum allowed character limit.', time: '2026-10-23T10:31:00' },
  { question: 'How can I communicate more effectively with my team?', answer: '', mode: 'Text', status: 'Failed', error: 'AI Coach is temporarily unavailable due to the AI service limit. Please contact your administrator.', time: '2026-10-23T10:32:00' },
  { question: 'Give me an example of active listening.', answer: '', mode: 'Voice', status: 'Failed', error: 'Unable to generate a response. Please try again.', time: '2026-10-23T10:33:00' },
);
export const dateLabel = (date: string) => new Intl.DateTimeFormat('en-GB', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(date));
