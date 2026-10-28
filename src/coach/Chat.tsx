import { useEffect, useRef, useState } from 'react';
import { Bot, Mic, Plus, Send, ShieldCheck } from 'lucide-react';
import { Button } from '../app/components/saas/Button';
import { IconButton } from '../app/components/saas/IconButton';
import { TextInput } from '../app/components/saas/FormField';
import { answerFrom, type Message } from './model';

export function Chat({ content, name, preview = false, assessment = false, onMessages, onEnd }: { content: string; name: string; preview?: boolean; assessment?: boolean; onMessages?: (messages: Message[]) => void; onEnd?: () => void }) {
  const [messages,setMessages] = useState<Message[]>([]);
  const [input,setInput] = useState('');
  const [listening,setListening] = useState(false);
  const [voice,setVoice] = useState(false);
  const [voiceError,setVoiceError] = useState('');
  const log = useRef<HTMLDivElement>(null);
  const recognition = useRef<{stop:()=>void;abort:()=>void}|null>(null);
  useEffect(()=>{log.current?.scrollTo({top:log.current.scrollHeight,behavior:'smooth'});},[messages]);
  useEffect(()=>()=>{recognition.current?.abort();},[]);
  const send = (text: string) => {
    if(!text.trim() || text.length>500) return;
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
    r.onresult=e=>{const transcript=e.results[0][0].transcript;if(transcript.length>500){setVoiceError('Your recording exceeds 500 characters. Please shorten it before sending.');}setInput(transcript.slice(0,500));setVoice(true);};
    r.onerror=e=>{setVoiceError(e.error==='not-allowed' ? 'Microphone permission was denied. Allow access in your browser or type your question.' : 'No speech could be transcribed. Please try again or type your question.');setListening(false);};
    r.onend=()=>setListening(false);setVoiceError('');
    try {r.start();setListening(true);}catch{setVoiceError('Unable to start voice input. Please type your question.');}
  };
  return <div className="chat">
    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3"><div className="flex items-center gap-2"><Bot className="size-5 text-blue-600"/><strong>{name}</strong>{preview && <span className="demo-label">Draft preview</span>}</div><Button variant="ghost" size="sm" leftIcon={<Plus className="size-4"/>} onClick={()=>{recognition.current?.abort();setMessages([]);setInput('');setVoice(false);setVoiceError('');onEnd?.();}}>New Chat</Button></div>
    <div ref={log} className="chat-log" role="log" aria-label="Conversation" aria-live="polite">
      {!messages.length ? <div className="chat-welcome"><span className="coach-orb"><Bot className="size-7"/></span><h2 className="text-lg font-bold mb-2">A little guidance. A lot of progress.</h2><p className="muted">Hi! I'm your AI Coach. How can I help you with this course?</p><div className="suggestions">{['Explain a topic','Give me an example','Summarize a concept'].map(t=><button key={t} onClick={()=>send(t)}>{t}</button>)}</div></div> : messages.map((m,i)=><div key={i} className="flex flex-col gap-3"><div className="bubble user">{m.question}{m.mode==='Voice' && <span className="block text-[10px] opacity-80 mt-1">Voice input</span>}</div><div className="bubble assistant">{m.status==='Blocked' && <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-amber-800"><ShieldCheck className="size-3"/>Assessment protection</span>}{m.answer}</div></div>)}
    </div>
    <div className="chat-compose"><form onSubmit={e=>{e.preventDefault();send(input);}} className="flex gap-2"><TextInput aria-label="Ask your coach" value={input} maxLength={500} placeholder={listening ? 'Listening… stop recording when ready' : 'Ask about this course…'} onChange={e=>{setInput(e.target.value);setVoice(false);}} disabled={listening}/><IconButton label={listening ? 'Stop Recording' : 'Start voice input'} icon={<Mic/>} variant={listening ? 'solid' : 'outline'} onClick={startVoice}/><Button type="submit" aria-label="Send question" disabled={!input.trim() || listening}><Send className="size-4"/></Button></form>{voiceError && <p role="alert" className="mt-2 text-xs text-red-700">{voiceError}</p>}<div className="flex justify-between gap-3 text-[11px] text-gray-500 mt-2"><span>{listening ? 'Recording… select the microphone to stop.' : voice ? 'Review your transcript before sending.' : preview ? 'Preview chats are not saved to conversation history.' : 'Course guidance · Assessment protection on'}</span><span>{input.length}/500</span></div></div>
  </div>;
}
