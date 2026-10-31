// Pure chess/content regressions. This does not replace interactive browser QA.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const elements=new Map();
function el(){return {value:'classic',checked:true,textContent:'',children:[],dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},querySelectorAll(){return []},replaceChildren(...x){this.children=x},appendChild(x){this.children.push(x)},append(...x){this.children.push(...x)},setAttribute(){}}}
const document={getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,createElementNS:el,querySelectorAll(){return []}};
const storage=new Map();const localStorage={get length(){return storage.size},key(i){return [...storage.keys()][i]},getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,String(v))}};
const ctx=vm.createContext({document,localStorage,console,setTimeout,clearTimeout});
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1].split("document.querySelectorAll('[data-mode]')")[0];
vm.runInContext(script,ctx);
const run=s=>vm.runInContext(s,ctx);let passed=0;
function test(name,fn){fn();passed++;console.log('PASS '+name)}
test('initial position perft depth three is 8902',()=>assert.equal(run(`(function perft(s,d){return d?legal(s).reduce((n,m)=>n+perft(make(s,m),d-1),0):1})(initial(),3)`),8902));
test('all curriculum scripts use legal moves and legal starting positions',()=>run(`for(const [title] of Object.values(lessons).flat()){
 const def=academyPositions[title]||academyDrills[title]||academyPuzzles[title];
 let s=title==='Pins'?pinSetup():def?.fen?parseAcademyFen(def.fen):initial();
 if(inCheck(s,enemy(s.turn)))throw Error(title+': nonmoving king starts in check');
 const line=title==='Pins'?[]:def?.line|| (def?.answer?[def.answer]:academyLines[title]||[]);
 for(const u of line){const m=lessonMove(s,u);if(!m)throw Error(title+': illegal '+u);s=make(s,m);}
}`));
test('checkmate commentary explicitly recognizes mate',()=>assert.match(run(`(()=>{let s=initial(),before,m;for(const u of ['f2f3','e7e6','g2g4','d8h4']){before=s;m=lessonMove(s,u);s=make(s,m);}return reviewExplanation({before,m,after:s,loss:0});})()`),/checkmate.*no legal escape/));
test('hanging bishop explanation identifies c4 and the capture',()=>assert.match(run(`(()=>{let s=initial(),before,m;for(const u of ['e2e4','e7e6','g1f3','f8e7','f1c4','d7d5','e1g1']){before=s;m=lessonMove(s,u);s=make(s,m);}return tacticalExplanation({before,m,after:s,loss:623,afterAnalysis:{best:'d5c4'}});})()`),/bishop on c4 was already attacked.*capturing your bishop on c4/));
test('retaining a forced mate is not a centipawn blunder',()=>assert.equal(run(`evaluationLoss({cp:10000,mate:4},{cp:-10000,mate:-2},{turn:'w'},{turn:'b'})`),0));
test('mate display does not masquerade as centipawns',()=>assert.match(run(`evaluationText({cp:-10000,mate:-1},{turn:'w'})`),/mate in 1 for Black/));
test('dynamic review exercises do not increase curriculum count',()=>{run(`saveAcademyProgress('Review your mistake')`);assert.equal(run(`academyCompleted.size`),0);run(`saveAcademyProgress('Pins')`);assert.equal(run(`academyCompleted.size`),1)});
test('reopening review clears old board, metrics, actions and entries',()=>{run(`reviewEntries=[{loss:400}];reviewReady=true;$('reviewList').appendChild({});clearReview()`);assert.equal(run(`reviewEntries.length`),0);assert.equal(run(`$('reviewList').children.length`),0);assert.equal(run(`$('reviewPractice').disabled`),true)});
test('both valid mate puzzle solutions are legal mates',()=>run(`for(const u of ['f7g7','f7f8']){const s=parseAcademyFen(academyPuzzles['Mate in one'].fen),m=lessonMove(s,u),after=make(s,m);if(legal(after).length||!inCheck(after,after.turn))throw Error(u);}`));
test('all offline precache assets exist',()=>{const sw=fs.readFileSync(require('node:path').join(__dirname,'../sw.js'),'utf8'),assets=JSON.parse(sw.match(/ASSETS=(\[[^;]+\])/)[1].replaceAll("'",'"'));for(const asset of assets)assert.ok(fs.existsSync(require('node:path').join(__dirname,'..',asset)),asset)});
test('undo and redo change the move count by exactly one and preserve the position',()=>run(`{
 game=initial();history=[];gameStates=[];redoStates=[];busy=false;
 for(const u of ['e2e4','c7c5']){const before=game,m=lessonMove(game,u);history.push(game);game=make(game,m);gameStates.push({before,m,after:game});}
 const final=fen(game);undoOne();if(gameStates.length!==1||game.b[36]!=='P'||game.b[10]!=='p')throw Error('First undo removed wrong move');
 undoOne();if(gameStates.length!==0||fen(game)!==fen(initial()))throw Error('Second undo');redoOne();if(gameStates.length!==1)throw Error('Redo skipped a move');redoOne();if(fen(game)!==final)throw Error('Redo position mismatch');
}`));
test('accuracy is bounded, mirrored by color and decreases with a larger mistake',()=>run(`{
 const entry=(turn,a,b)=>({before:{turn},after:{turn:enemy(turn)},whiteBefore:a,whiteScore:b,loss:Math.max(0,(a-b)*(turn==='w'?1:-1)),beforeAnalysis:{cp:turn==='w'?a:-a,mate:null},afterAnalysis:{cp:turn==='w'?-b:b,mate:null}});
 const perfect=moveAccuracy(entry('w',0,0)),small=moveAccuracy(entry('w',0,-60)),large=moveAccuracy(entry('w',0,-600));
 if(perfect!==100||!(small>large&&large>=0)||Math.abs(small-moveAccuracy(entry('b',0,60)))>0.0001)throw Error('Accuracy properties failed');
}`));
test('book requires an exact curated prefix and errors retain their severity',()=>run(`{
 let before=initial(),m=lessonMove(before,'e2e4'),after=make(before,m);
 const e={before,m,after,best:m,loss:0,beforeAnalysis:{cp:30,mate:null},afterAnalysis:{cp:-30,mate:null}};
 if(classifyReviewMove(e,['e2e4'])!=='Book')throw Error('Missing book');
 if(classifyReviewMove({...e,loss:400},['e2e4'])!=='Blunder')throw Error('Book hides blunder');
 if(classifyReviewMove(e,['a2a3','e2e4'])==='Book')throw Error('False book');
}`));
test('miss identifies throwing away a forced mate',()=>run(`{
 const before=initial(),m=lessonMove(before,'a2a3'),after=make(before,m);
 if(classifyReviewMove({before,m,after,best:m,loss:1000,beforeAnalysis:{cp:10000,mate:3},afterAnalysis:{cp:0,mate:null}},['a2a3'])!=='Miss')throw Error('Missing mate opportunity');
}`));
test('stale spectator tabs cannot overwrite human results and replay is idempotent',()=>{
 storage.clear();storage.set('cc-stats',JSON.stringify({wins:0,losses:3,draws:0}));
 run(`game=initial();for(const u of ['f2f3','e7e5','g2g4','d8h4'])game=make(game,lessonMove(game,u));currentGameId='new-game';playerSide='w';watchMode=false;saveGameResult();saveGameResult();`);
 assert.equal(run('loadStats().losses'),4);run(`watchMode=true;stats={wins:0,losses:1,draws:0};saveGameResult()`);assert.equal(run('loadStats().losses'),4);
 storage.set('cc-result:another-tab','wins');assert.equal(run('loadStats().wins'),1);
});
test('spectator controls disable at mate and reenable after undo',()=>run(`{
 updateWatchButtons();if(!$('watchPause').disabled||!$('watchStep').disabled)throw Error('Terminal controls enabled');game=initial();watchPaused=true;updateWatchButtons();if($('watchPause').disabled||$('watchStep').disabled)throw Error('Paused controls not restored');
}`));
test('Great requires a clear second-choice gap and never replaces a blunder',()=>run(`{
 const before=initial(),m=lessonMove(before,'a2a3'),after=make(before,m),e={before,m,after,best:m,loss:0,beforeAnalysis:{cp:0,mate:null,second:{cp:-200}},afterAnalysis:{cp:0,mate:null,best:'e7e5'}};
 if(classifyReviewMove(e,['a2a3'])!=='Great')throw Error('Clear best not identified');
 if(classifyReviewMove({...e,beforeAnalysis:{...e.beforeAnalysis,second:null}},['a2a3'])!=='Best')throw Error('Unverified unique move');
 if(classifyReviewMove({...e,loss:400},['a2a3'])!=='Blunder')throw Error('Special label hides blunder');
}`));
test('Brilliant requires an offered piece and a sound evaluated capture',()=>run(`{
 const before=parseAcademyFen('7k/8/8/8/2p5/8/4B3/6K1 w - - 0 1'),m=lessonMove(before,'e2d3'),after=make(before,m),e={before,m,after,best:m,loss:0,beforeAnalysis:{cp:0,mate:null,second:{cp:-200}},afterAnalysis:{cp:0,mate:null,best:'c5d4'}};
 if(classifyReviewMove(e,['e2d3'])==='Brilliant')throw Error('No offered capture');if(classifyReviewMove({...e,afterAnalysis:{...e.afterAnalysis,best:'c4d3'}},['e2d3'])!=='Brilliant')throw Error('Sound sacrifice missing');if(classifyReviewMove({...e,afterAnalysis:{cp:200,mate:null,best:'c4d3'}},['e2d3'])==='Brilliant')throw Error('Unsound sacrifice');
 const m2=lessonMove(before,'e2d1'),a2=make(before,m2);if(classifyReviewMove({...e,m:m2,after:a2,best:m2},['e2d1'])==='Brilliant')throw Error('Quiet move falsely brilliant');
}`));
console.log(`${passed} core/content regression checks passed`);
