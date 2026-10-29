import { useEffect, useRef, useState } from 'react';
import { Bot, Mic, Send, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '../app/components/saas/Button';
import { IconButton } from '../app/components/saas/IconButton';
import { TextInput } from '../app/components/saas/FormField';
import { answerFrom, type Message } from './model';
import aiCoachIcon from '../imports/ai-coach-icon.png';

export function Chat({ content, name, preview = false, assessment = false, onMessages }: { content: string; name: string; preview?: boolean; assessment?: boolean; onMessages?: (messages: Message[]) => void }) {
  const inputLimit = preview ? 1000 : 500;
  const [messages,setMessages] = useState<Message[]>([]);
  const [input,setInput] = useState('');
  const inputError = input.length > inputLimit ? `Please enter no more than ${inputLimit} characters. Shorten your text or voice transcript before sending.` : '';
  const [listening,setListening] = useState(false);
  const [voice,setVoice] = useState(false);
  const [voiceError,setVoiceError] = useState('');
  const log = useRef<HTMLDivElement>(null);
  const recognition = useRef<{stop:()=>void;abort:()=>void}|null>(null);
  useEffect(()=>{log.current?.scrollTo({top:log.current.scrollHeight,behavior:'smooth'});},[messages]);
  useEffect(()=>()=>{recognition.current?.abort();},[]);
  const send = (text: string) => {
    if(!text.trim() || text.length>inputLimit) return;
    const next = [...messages,{question:text.trim(),...answerFrom(content,text,assessment),mode:voice ? 'Voice' as const : 'Text' as const,time:new Date().toISOString()}];
    setMessages(next);onMessages?.(next);setInput('');setVoice(false);
  };
  const startVoice = () => {
    if(listening){recognition.current?.stop();return;}
    type Recognition = {lang:string;interimResults:boolean;onresult:((event:{results:{[index:number]:{[index:number]:{transcript:string}}}})=>void)|null;onerror:((event:{error:string})=>void)|null;onend:(()=>void)|null;start:()=>void;stop:()=>void;abort:()=>void};
    const host = window as unknown as {SpeechRecognition?:new()=>Recognition;webkitSpeechRecognition?:new()=>Recognition};
    const Constructor = host.SpeechRecognition ?? host.webkitSpeechRecognition;
    if(!Constructor){setVoiceError('Voice input is unavailable in this browser. Please type your question.');return;}
    const r = new Constructor();recognition.current=r;r.lang='en-US';r.interimResults=false;
    r.onresult=e=>{const transcript=e.results[0][0].transcript;setVoiceError('');setInput(transcript);setVoice(true);};
    r.onerror=e=>{setVoiceError(e.error==='not-allowed' ? 'Microphone permission was denied. Allow access in your browser or type your question.' : 'No speech could be transcribed. Please try again or type your question.');setListening(false);};
    r.onend=()=>setListening(false);setVoiceError('');
    try {r.start();setListening(true);}catch{setVoiceError('Unable to start voice input. Please type your question.');}
  };
  return <div className={`chat ${preview ? 'chat-preview' : ''}`}>
    {preview ? <div className="preview-chat-header"><img src={aiCoachIcon} alt=""/><strong>{name}</strong></div> : <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3"><div className="flex items-center gap-2"><Bot className="size-5 text-blue-600"/><strong>{name}</strong></div></div>}
    <div ref={log} className="chat-log" role="log" aria-label="Conversation" aria-live="polite">
      {!messages.length ? <div className="chat-welcome"><span className="coach-orb"><Bot className="size-7"/></span><h2 className="text-lg font-bold mb-2">A little guidance. A lot of progress.</h2><p className="muted">Hi! I'm your AI Coach. How can I help you with this course?</p><div className="suggestions">{['Explain a topic','Give me an example','Summarize a concept'].map(t=><button key={t} onClick={()=>send(t)}>{t}</button>)}</div></div> : messages.map((m,i)=><div key={i} className="chat-message-pair">
        <div className={preview ? 'preview-message user-message' : 'contents'}><div className="bubble user">{m.question}{m.mode==='Voice' && <span className="block text-[10px] opacity-80 mt-1">Voice input</span>}</div>{preview && <span className="preview-user-avatar" role="img" aria-label="You"><UserRound aria-hidden="true"/></span>}</div>
        <div className={preview ? 'preview-message assistant-message' : 'contents'}>{preview && <span className="preview-ai-avatar" role="img" aria-label="AI Coach"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1C13.6 8.5 15.5 10.4 23 12C15.5 13.6 13.6 15.5 12 23C10.4 15.5 8.5 13.6 1 12C8.5 10.4 10.4 8.5 12 1Z" fill="currentColor"/></svg></span>}<div className="bubble assistant">{m.status==='Blocked' && <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-amber-800"><ShieldCheck className="size-3"/>Assessment protection</span>}{m.answer}</div></div>
      </div>)}
    </div>
    <div className="chat-compose"><form onSubmit={e=>{e.preventDefault();send(input);}} className="flex gap-2"><TextInput aria-label="Ask your coach" value={input} maxLength={preview ? undefined : inputLimit} aria-invalid={!!inputError} aria-describedby={inputError ? "coach-input-error" : undefined} placeholder={listening ? 'Listening… stop recording when ready' : 'Ask about this course…'} onChange={e=>{setInput(e.target.value);setVoice(false);}} disabled={listening}/><IconButton label={listening ? 'Stop Recording' : 'Start voice input'} icon={<Mic/>} variant={listening ? 'solid' : 'outline'} onClick={startVoice}/><Button type="submit" aria-label="Send question" disabled={!input.trim() || listening || !!inputError}><Send className="size-4"/></Button></form>{inputError && <p id="coach-input-error" role="alert" className="mt-2 text-xs text-red-700">{inputError}</p>}{voiceError && <p role="alert" className="mt-2 text-xs text-red-700">{voiceError}</p>}<div className="flex justify-between gap-3 text-[11px] text-gray-500 mt-2"><span>{listening ? 'Recording… select the microphone to stop.' : voice ? 'Review your transcript before sending.' : preview ? 'Preview chats are not saved to conversation history.' : 'Course guidance · Assessment protection on'}</span><span>{input.length}/{inputLimit}</span></div></div>
  </div>;
}
