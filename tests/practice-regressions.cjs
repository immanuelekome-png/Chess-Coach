const assert=require('node:assert/strict');
const {ctx,run}=require('./core-regressions.cjs');
ctx.Worker=class{terminate(){}};
run(`initializeAnalysisWorker=async()=>{};let queued=[];analyzeWithWorker=async()=>{const x=queued.shift();if(x instanceof Error)throw x;if(!x)throw Error('Missing analysis fixture');return x;};const queueAnalyzer=analyzeWithWorker;
function evalFixture(best,cp=0){return {cp,mate:null,best,pv:best?[best]:[],depth:10};}
function startFixture(){const before=initial(),m=lessonMove(before,'f2f3');academyPracticeSource={before,m,after:make(before,m),loss:300,label:'Blunder',best:lessonMove(before,'e2e4')};openLesson('Review your mistake','','');}
async function attempt(u){const a=academyState,before=a.states[a.step],m=lessonMove(before,u);if(!m)throw Error('Invalid fixture '+u);await evaluatePracticeMove(a,m,make(before,m));}`);
(async()=>{
 let count=0;const test=async(name,fn)=>{await fn();count++;console.log('PASS '+name)};
 await test('practice rejects a bad alternative without changing the board',async()=>{
  run(`startFixture();queued=[evalFixture('e2e4'),evalFixture('e7e5',300),evalFixture('e7e5',300)];`);await run(`attempt('a2a3')`);
  assert.equal(run('academyState.step'),0);assert.equal(run('academyState.acceptedMoves.length'),0);assert.equal(run('academyState.practiceAttempts'),1);
 });
 await test('three accepted decisions receive three legal replies and finish without curriculum credit',async()=>{
  const completed=run('academyCompleted.size');
  run(`startFixture();queued=[evalFixture('e2e4'),evalFixture('e7e5',300),evalFixture('e7e5')];`);await run(`attempt('e2e4')`);
  assert.equal(run('academyState.step'),2);assert.equal(run('academyState.finished'),false);assert.equal(run('academyState.states[2].turn'), 'w');
  run(`queued=[evalFixture('g1f3'),evalFixture('b8c6')];`);await run(`attempt('g1f3')`);
  run(`queued=[evalFixture('f1c4'),evalFixture('g8f6')];`);await run(`attempt('f1c4')`);
  assert.equal(run('academyState.step'),6);assert.equal(run('academyState.finished'),true);assert.equal(run('academyCompleted.size'),completed);assert.match(run('academyState.practiceSummary'),/3\/3 decisions.*3 attempts/);
 });
 await test('failed engine reply can be retried without replaying or recounting the learner move',async()=>{
  run(`startFixture();queued=[evalFixture('e2e4'),evalFixture('e7e5',300),evalFixture('a8a1')];`);await run(`attempt('e2e4')`);
  assert.equal(run('academyState.awaitingReply'),true);assert.equal(run('academyState.step'),1);
  run(`queued=[evalFixture('e7e5')];`);await run(`evaluatePracticeMove(academyState,null,null)`);
  assert.equal(run('academyState.step'),2);assert.equal(run('academyState.practiceAttempts'),1);assert.equal(run('academyState.acceptedMoves.length'),1);
 });
 await test('continuation moves must be sound, rather than compared to the original mistake again',async()=>{
  run(`queued=[evalFixture('g1f3'),evalFixture('b8c6',150)];`);await run(`attempt('a2a3')`);
  assert.equal(run('academyState.step'),2);assert.equal(run('academyState.acceptedMoves.length'),1);
 });
 await test('changing lessons cancels pending results',async()=>{
  run(`startFixture();let release;analyzeWithWorker=()=>new Promise(r=>release=r);`);
  const promise=run(`attempt('e2e4')`);await Promise.resolve();await Promise.resolve();
  run(`openLesson('Pins','','');release(evalFixture('e2e4'));`);
  // The cancelled worker is modeled as an already terminated request; no follow-up result may touch the new lesson.
  run(`analyzeWithWorker=async()=>evalFixture('e7e5');`);await promise;
  assert.equal(run('academyState.title'),'Pins');assert.equal(run('academyState.step'),0);
 });
 await test('terminal practice outcome uses session history instead of the main game history',()=>{
  run(`startFixture();const a=academyState,s=a.states[0];history=[s,s,s,s,s];`);
  assert.equal(run('practiceTerminal(academyState)'),null);
 });
 await test('Black-side practice keeps control of Black through three decisions',async()=>{
  run(`analyzeWithWorker=queueAnalyzer;const before=make(initial(),lessonMove(initial(),'e2e4')),m=lessonMove(before,'f7f6');academyPracticeSource={before,m,after:make(before,m),loss:300,label:'Blunder',best:lessonMove(before,'e7e5')};openLesson('Review your mistake','','');queued=[evalFixture('e7e5'),evalFixture('g1f3',300),evalFixture('g1f3')];`);
  await run(`attempt('e7e5')`);assert.equal(run('academyState.states[2].turn'),'b');
  run(`queued=[evalFixture('b8c6'),evalFixture('f1c4')];`);await run(`attempt('b8c6')`);
  run(`queued=[evalFixture('g8f6'),evalFixture('d2d3')];`);await run(`attempt('g8f6')`);assert.equal(run('academyState.finished'),true);assert.equal(run('academyState.practiceSide'),'b');
 });
 await test('a mating improvement ends early without requesting an imaginary reply',async()=>{
  run(`analyzeWithWorker=queueAnalyzer;const mateBefore=parseAcademyFen('7k/5Q2/6K1/8/8/8/8/8 w - - 0 1'),mateMove=lessonMove(mateBefore,'f7e7');academyPracticeSource={before:mateBefore,m:mateMove,after:make(mateBefore,mateMove),loss:1000,label:'Miss',best:lessonMove(mateBefore,'f7g7')};openLesson('Review your mistake','','');queued=[{...evalFixture('f7g7',10000),mate:1},evalFixture('h8g8'),{...evalFixture(null,-10000),mate:0,terminal:'checkmate'}];`);
  await run(`attempt('f7g7')`);assert.equal(run('academyState.finished'),true);assert.equal(run('academyState.step'),1);assert.match(run('academyState.practiceSummary'),/Checkmate/);
 });
 await test('quick practice stops after one decision and one legal reply',async()=>{
  run(`analyzeWithWorker=queueAnalyzer;setPracticeLength(1);startFixture();queued=[evalFixture('e2e4'),evalFixture('e7e5',300),evalFixture('e7e5')];`);
  await run(`attempt('e2e4')`);assert.equal(run('academyState.finished'),true);assert.equal(run('academyState.step'),2);assert.match(run('academyState.practiceSummary'),/1\/1 decisions.*Review focus:.*h4–e1/);
 });
 await test('extended practice keeps its five-decision target when the next-session preference changes',async()=>{
  run(`setPracticeLength(5);startFixture();setPracticeLength(1);queued=[evalFixture('e2e4'),evalFixture('e7e5',300),evalFixture('e7e5')];`);await run(`attempt('e2e4')`);
  for(const [u,reply] of [['g1f3','b8c6'],['f1c4','g8f6'],['d2d3','f8c5'],['c2c3','d7d6']]){run(`queued=[evalFixture('${u}'),evalFixture('${reply}')];`);await run(`attempt('${u}')`);}
  assert.equal(run('academyState.targetMoves'),5);assert.equal(run('academyState.acceptedMoves.length'),5);assert.equal(run('academyState.finished'),true);assert.match(run('academyState.practiceSummary'),/5\/5 decisions/);
  assert.equal(run('setPracticeLength(99)'),false);assert.equal(run('practiceLength'),1);run('setPracticeLength(3)');
 });
 console.log(`${count} asynchronous practice regressions passed`);
})().catch(e=>{console.error(e);process.exitCode=1});
