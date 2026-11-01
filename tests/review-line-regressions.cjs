const assert=require('node:assert/strict');const {ctx,run,storage}=require('./core-regressions.cjs');let count=0;
const test=async(name,fn)=>{await fn();count++;console.log('PASS '+name);};const tick=()=>new Promise(r=>setImmediate(r));
const makeElement=ctx.document.createElement;ctx.document.createElement=(...args)=>({...makeElement(...args),style:{}});
ctx.Worker=class{constructor(){this.terminated=false;}terminate(){this.terminated=true;}};
run(`function lineFixture(){const before=initial(),m=lessonMove(before,'f2f3'),after=make(before,m);return {before,m,after,loss:100,label:'Inaccuracy',accuracy:70,best:lessonMove(before,'e2e4'),beforeAnalysis:{best:'e2e4',pv:['e2e4','e7e5','g1f3'],cp:30,mate:null,depth:12},afterAnalysis:{best:'e7e5',pv:['e7e5','e2e4','g8f6'],cp:70,mate:null,depth:12}};}
function startLineFixture(){reviewEntries=[lineFixture()];reviewIndex=0;reviewReady=true;}
function startReviewFixture(){game=initial();history=[];gameStates=[];redoStates=[];watchMode=false;hideLiveReview=false;for(const u of ['e2e4','e7e5']){const before=game,m=lessonMove(game,u);history.push(before);game=make(before,m);gameStates.push({before,m,after:game});}}
initializeAnalysisWorker=async()=>{};let reviewCalls=[];const reviewAnalyzer=async(w,s,depth)=>{reviewCalls.push(depth);const m=legal(s)[0];return {cp:0,mate:null,best:m?uciMove(m):null,pv:m?[uciMove(m)]:[],depth};};analyzeWithWorker=reviewAnalyzer;`);
(async()=>{
 await test('review depth persists and does not change live depth or opponent strength',()=>{
  run(`settings.elo=1000;setReviewDepth(14)`);assert.equal(storage.get('cc-review-depth'),'14');assert.equal(run('ANALYSIS_DEPTH'),10);assert.equal(run('settings.elo'),1000);assert.equal(run('setReviewDepth(99)'),false);assert.equal(run('reviewDepth'),14);
 });
 await test('depth summary reports actual analyzed depth instead of the selected setting',()=>{
  assert.equal(run(`reviewDepthText([{beforeAnalysis:{depth:12},afterAnalysis:{depth:11}}],14)`),'depth 11–12 · requested 14');assert.equal(run(`reviewDepthText([{beforeAnalysis:{depth:14},afterAnalysis:{depth:14,terminal:'checkmate'}}],14)`),'depth 14');
 });
 await test('reply and best-line previews start from the correct positions',()=>{
  run(`startLineFixture();setReviewLine('reply');`);assert.equal(run('fen(reviewLine.base)'),run('fen(reviewEntries[0].after)'));run(`stepReviewLine(1)`);assert.equal(run('coord(reviewLine.steps[0].m.t)'),'e5');run(`setReviewLine('best')`);assert.equal(run('fen(reviewLine.base)'),run('fen(initial())'));assert.equal(run('uciMove(reviewLine.steps[0].m)'),'e2e4');
 });
 await test('line navigation clamps and cannot change the live game or history',()=>{
  run(`startReviewFixture();const liveLineFen=fen(game),liveLineLength=gameStates.length;startLineFixture();setReviewLine('reply');stepReviewLine(99);`);assert.equal(run('reviewLine.cursor'),3);run(`stepReviewLine(-99)`);assert.equal(run('reviewLine.cursor'),0);assert.equal(run('fen(game)'),run('liveLineFen'));assert.equal(run('gameStates.length'),run('liveLineLength'));
 });
 await test('invalid engine continuations stop before illegal moves',()=>{
  run(`startLineFixture();reviewEntries[0].afterAnalysis.pv=['e7e5','e2e5'];setReviewLine('reply');`);assert.equal(run('reviewLine.steps.length'),1);run(`reviewEntries[0].afterAnalysis.pv=['a7a6'];setReviewLine('reply');`);assert.equal(run('reviewLine.steps.length'),1);assert.equal(run('uciMove(reviewLine.steps[0].m)'),'e7e5');
 });
 await test('terminal positions show no invented reply and clearing disables navigation',()=>{
  run(`let matingState=initial();for(const u of ['f2f3','e7e5','g2g4'])matingState=make(matingState,lessonMove(matingState,u));reviewEntries=[{after:matingState,afterAnalysis:{best:'d8h4',pv:['d8h4']}}];reviewIndex=0;reviewReady=true;setReviewLine('reply');stepReviewLine(1);`);assert.match(run(`$('lineStatus').textContent`),/Checkmate/);

  run(`let terminalBefore=initial(),terminalMove,terminalAfter;for(const u of ['f2f3','e7e5','g2g4','d8h4']){terminalMove=lessonMove(terminalBefore,u);terminalAfter=make(terminalBefore,terminalMove);if(u!=='d8h4')terminalBefore=terminalAfter;}reviewEntries=[{before:terminalBefore,m:terminalMove,after:terminalAfter,afterAnalysis:{best:null,pv:[]}}];reviewIndex=0;reviewReady=true;setReviewLine('reply');`);assert.equal(run('reviewLine.steps.length'),0);assert.match(run(`$('lineStatus').textContent`),/No legal calculated continuation/);run('clearReview()');assert.equal(run('reviewLine'),null);assert.equal(run('stepReviewLine(1)'),false);assert.equal(run(`$('lineNext').disabled`),true);
 });
 await test('cancellation terminates pending review and ignores a late result',async()=>{
  run(`startReviewFixture();let releaseReview;analyzeWithWorker=(w,s,d)=>new Promise(resolve=>releaseReview=()=>resolve({cp:0,mate:null,best:'e2e4',pv:['e2e4'],depth:d}));setReviewDepth(12);startReview(false,true);`);await tick();run(`const cancelledWorker=reviewWorker;cancelReview();releaseReview();`);await tick();assert.equal(run('cancelledWorker.terminated'),true);assert.equal(run('reviewReady'),false);assert.equal(run('reviewEntries.length'),0);assert.match(run(`$('reviewSummary').textContent`),/cancelled/);
 });
 await test('a running review snapshots its depth and a later review uses the new selection',async()=>{
  run(`startReviewFixture();analyzeWithWorker=reviewAnalyzer;reviewCalls=[];setReviewDepth(12);startReview(false,true);setReviewDepth(14);`);await tick();assert.equal(run('reviewReady'),true);assert.deepEqual(Array.from(run('reviewCalls')),[12,12,12]);assert.match(run(`$('reviewSummary').textContent`),/depth 12/);
  run(`reviewCalls=[];startReview(false,true)`);await tick();assert.deepEqual(Array.from(run('reviewCalls')),[14,14,14]);assert.match(run(`$('reviewSummary').textContent`),/depth 14/);
  run(`let releaseStaleReview;analyzeWithWorker=(w,s,d)=>new Promise(resolve=>releaseStaleReview=()=>resolve({cp:0,mate:null,best:'e2e4',pv:['e2e4'],depth:d}));startReview(false,true);`);await tick();run(`analyzeWithWorker=reviewAnalyzer;setReviewDepth(10);startReview(false,true);`);await tick();run('releaseStaleReview()');await tick();assert.match(run(`$('reviewSummary').textContent`),/depth 10/);assert.equal(run('reviewRunDepth'),10);
 });
 console.log(`${count} review depth/line regressions passed`);
})().catch(e=>{console.error(e);process.exitCode=1});
