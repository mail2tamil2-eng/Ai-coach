import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialSources, publish, validateSource, answerFrom, sourceStatus } from './model.ts';
test('one source per course includes inactive sources',()=>{
  const inactive=initialSources.find(s=>s.inactive)!;
  assert.match(validateSource({...inactive,id:'another'},initialSources),/already has/);
  assert.equal(validateSource(inactive,initialSources),'');
});
test('draft edits retain published snapshot until successful publish',()=>{
  const original=initialSources[0];
  const draft={...original,content:'Updated knowledge',dirty:true};
  assert.equal(sourceStatus(draft),'Draft');
  assert.equal(draft.published,original.content);
  assert.equal(publish(draft).published,'Updated knowledge');
  assert.equal(publish(draft).dirty,false);
});
test('failed processing cannot replace published knowledge',()=>{
  const failed={...initialSources[0],state:'Failed' as const,content:'',dirty:true};
  assert.throws(()=>publish(failed),/processing/);
  assert.equal(failed.published,initialSources[0].published);
});
test('deactivation takes priority over draft status',()=>{
  assert.equal(sourceStatus({...initialSources[0],inactive:true,dirty:true}),'Inactive');
});
test('assessment context blocks even a normal concept question',()=>{
  assert.equal(answerFrom('Leadership builds teamwork.','What is leadership?',true).status,'Blocked');
  assert.equal(answerFrom('Leadership builds teamwork.','What is the correct answer?').status,'Blocked');
});
test('answers stay within available course content',()=>{
  assert.equal(answerFrom('Leadership builds teamwork.','What is leadership?').answer,'Leadership builds teamwork.');
  assert.match(answerFrom('Leadership builds teamwork.','Explain quantum physics').answer,/couldn't find/);
  assert.match(answerFrom('Leadership builds teamwork.','Give me an example').answer,/Which topic/);
});
test('manual knowledge has a required value and length limit',()=>{
  assert.match(validateSource({...initialSources[0],type:'Manual',content:' '},[]),/Enter/);
  assert.match(validateSource({...initialSources[0],type:'Manual',content:'a'.repeat(20001)},[]),/20,000/);
});
