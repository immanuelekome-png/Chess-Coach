// Pure chess/content regressions. This does not replace interactive browser QA.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const elements=new Map();
function el(){return {value:'classic',checked:true,textContent:'',children:[],dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},querySelectorAll(){return []},replaceChildren(...x){this.children=x},appendChild(x){this.children.push(x)},append(...x){this.children.push(...x)},setAttribute(){}}}
const document={getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,createElementNS:el,querySelectorAll(){return []}};
const ctx=vm.createContext({document,localStorage:{getItem(){return null},setItem(){}},console,setTimeout,clearTimeout});
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
console.log(`${passed} core/content regression checks passed`);
