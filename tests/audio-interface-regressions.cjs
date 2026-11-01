const assert=require('node:assert/strict');const {ctx,run}=require('./core-regressions.cjs');let count=0;
const log={tones:0,resumes:0};
class FakeAudio{
 constructor(){this.state='suspended';this.currentTime=0;this.destination={};}
 async resume(){log.resumes++;this.state='running';}
 createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}
 createAnalyser(){return {fftSize:1024,connect(){},getFloatTimeDomainData(a){a.fill(.1)}}}
 createOscillator(){log.tones++;return {frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){},start(){},stop(){}}}
}
ctx.window={AudioContext:FakeAudio};
function reset(){log.tones=0;log.resumes=0;ctx.window.AudioContext=FakeAudio;run(`audioContext=null;audioMaster=null;audioMeter=null;soundEnabled=true;soundVolume=.7;coachSound=true;audioGeneration++;`)}
(async()=>{
 const test=async(name,fn)=>{await fn();count++;console.log('PASS '+name)};
 await test('SAN covers ordinary moves, captures, castling, promotion and checkmate',()=>{
  assert.equal(run(`(()=>{const b=initial(),m=lessonMove(b,'e2e4');return sanMove(b,m);})()`),'e4');
  assert.equal(run(`(()=>{let b=initial(),before,m;for(const u of ['e2e4','e7e5','g1f3','b8c6','f1c4','g8f6','e1g1']){before=b;m=lessonMove(b,u);b=make(b,m);}return sanMove(before,m,b);})()`),'O-O');
  assert.equal(run(`(()=>{const b=parseAcademyFen(academyPuzzles.Underpromotion.fen),m=lessonMove(b,'g7g8n');return sanMove(b,m);})()`),'g8=N+');
  assert.equal(run(`(()=>{let b=initial(),before,m;for(const u of ['f2f3','e7e5','g2g4','d8h4']){before=b;m=lessonMove(b,u);b=make(b,m);}return sanMove(before,m,b);})()`),'Qh4#');
  assert.equal(run(`(()=>{let b=initial(),before,m;for(const u of ['e2e4','d7d5','e4d5']){before=b;m=lessonMove(b,u);b=make(b,m);}return sanMove(before,m,b);})()`),'exd5');
 });
 await test('SAN disambiguates same-type pieces with legal alternatives',()=>{
  assert.equal(run(`(()=>{const b=parseAcademyFen('7k/8/8/8/8/8/8/1N1N2K1 w - - 0 1'),m=lessonMove(b,'b1c3');return sanMove(b,m);})()`),'Nbc3');
 });
 await test('teaching cards keep the side, plan, tradeoff and engine line separate',()=>{
  const parts=run(`teachingSections('Good move. For White — Position: central control. Plan to examine: develop. Tradeoff: king cover. Stockfish continuation at this depth: Black e7 → e5. Alternative: d4.')`);
  assert.deepEqual(Array.from(parts,x=>x.heading),['Move feedback','Position · White','Plan · White','Watch out · White','Engine line','Alternative']);assert.equal(parts[4].engine,true);
 });
 await test('audio waits for resume before creating output nodes',async()=>{
  reset();let release;ctx.window.AudioContext=class extends FakeAudio{resume(){log.resumes++;return new Promise(r=>release=()=>{this.state='running';r()})}};
  const pending=run(`playCue('check')`);assert.equal(log.tones,0);release();assert.equal(await pending,true);assert.equal(log.tones,2);
 });
 await test('mute and zero volume prevent playback and muting cancels pending audio',async()=>{
  reset();run('setSoundEnabled(false)');assert.equal(await run(`playCue('move')`),false);assert.equal(log.tones,0);
  reset();run('soundVolume=0');assert.equal(await run(`playCue('move')`),false);assert.equal(log.tones,0);
  reset();let release;ctx.window.AudioContext=class extends FakeAudio{resume(){return new Promise(r=>release=()=>{this.state='running';r()})}};const pending=run(`playCue('capture')`);run('setSoundEnabled(false)');release();assert.equal(await pending,false);assert.equal(log.tones,0);
 });
 await test('distinct cues and coaching mute use the selected settings',async()=>{
  reset();assert.equal(await run(`playCue('castle')`),true);assert.equal(log.tones,2);run('coachSound=false');assert.equal(await run(`playCue('coach')`),false);assert.equal(log.tones,2);
  assert.equal(run(`(()=>{const b=parseAcademyFen(academyPuzzles.Underpromotion.fen),m=lessonMove(b,'g7g8n');return moveSoundKind(b,m);})()`),'promotion');
 });
 await test('failed audio resume is visible and emits no scheduled sound',async()=>{
  reset();ctx.window.AudioContext=class extends FakeAudio{async resume(){throw Error('blocked')}};assert.equal(await run(`playCue('move')`),false);assert.equal(log.tones,0);assert.match(run(`$('soundStatus').textContent`),/could not start/);
 });
 console.log(`${count} audio/interface regressions passed`);
})().catch(e=>{console.error(e);process.exitCode=1});
