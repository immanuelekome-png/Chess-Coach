const assert=require('node:assert/strict');
const {run,storage}=require('./core-regressions.cjs');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
run(`watchMode=false;function teachingFixture(){const before=initial(),m=lessonMove(before,'e2e4'),after=make(before,m);return {before,m,after,best:m,loss:0,label:'Best',beforeAnalysis:{best:'e2e4',pv:['e2e4','e7e5','g1f3'],cp:0,mate:null},afterAnalysis:{best:'e7e5',pv:['e7e5','g1f3','b8c6'],cp:0,mate:null}};}`);
test('learner skill is independent of opponent difficulty',()=>{
 run(`setLearnerSkill(600);settings.elo=2200;`);assert.equal(run('coachingProfile().skill'),600);
 run(`setLearnerSkill(2000);settings.elo=400;`);assert.equal(run('coachingProfile().skill'),2000);
});
test('manual skill persists without changing assistance or bot settings',()=>{
 run(`$('help').value='1';settings.elo=700;setLearnerSkill(1600);`);
 assert.equal(storage.get('cc-learner-skill'),'1600');assert.equal(run(`$('help').value`),'1');assert.equal(run('settings.elo'),700);
 assert.equal(run(`setLearnerSkill('corrupt')`),false);assert.equal(run('learnerSkill'),1600);
});
test('foundations gets one concrete development task; expert gets a calculation task',()=>{
 const text=skill=>run(`(()=>{setLearnerSkill(${skill});const e=teachingFixture();return learnerPlan(e.before,e.m,e.after);})()`);
 assert.match(text(600),/starting squares \(b1, c1, f1, g1\).*Bring one into play/);
 assert.doesNotMatch(text(600),/Calculation task/);assert.match(text(2000),/Recognition cue: The pawn on e4.*Calculation task/);
});
test('terminal positions omit plans and opponent rehearsal',()=>{
 assert.equal(run(`(()=>{let b=initial(),m,before;for(const u of ['f2f3','e7e5','g2g4','d8h4']){before=b;m=lessonMove(b,u);b=make(b,m);}return learnerPlan(before,m,b)+difficultyTeaching(b,{best:'a2a3'});})()`),'');
});
test('Black-side plans identify Black and the actual developed piece',()=>{
 assert.match(run(`(()=>{setLearnerSkill(600);let b=initial();b=make(b,lessonMove(b,'e2e4'));const m=lessonMove(b,'g8f6');return learnerPlan(b,m,make(b,m));})()`),/For Black.*b8, c8, f8/);
});
test('all skill bands preserve independent and warning-only assistance',()=>{
 run(`for(const skill of [600,1000,1600,2000]){setLearnerSkill(skill);const e=teachingFixture();if(coachingMessage(e,0)!==''||coachingMessage(e,1)!=='')throw Error('Assistance leak');e.loss=300;e.label='Blunder';const warning=coachingMessage(e,1);if(!warning.startsWith('⚠ Blunder')||/Plan to examine|Opponent context|Stockfish continuation/.test(warning))throw Error('Warning leak');for(let step=1;step<=8;step++){const hint=learnerHint(e.before,e.m,e.beforeAnalysis,1,step);if(/e2 → e4|Focus on your|recommends/.test(hint))throw Error('Hint leak');}if(learnerHint(e.before,e.m,e.beforeAnalysis,0,4)!=='')throw Error('Independent hint');}`);
});
test('stronger opponents change practice context without raising hint permissions',()=>{
 run(`setLearnerSkill(1000);settings.elo=2200;`);
 assert.match(run(`(()=>{const e=teachingFixture();return coachingMessage(e,2);})()`),/stronger bot.*e7 → e5/);
 assert.doesNotMatch(run(`(()=>{const e=teachingFixture();return coachingMessage(e,2);})()`),/Alternative:|g1 → f3/);
 run(`settings.elo=400;`);assert.match(run(`(()=>{const e=teachingFixture();return coachingMessage(e,2);})()`),/beginner bot/);
});
test('expert lines grow within assistance limits and cards retain their headings',()=>{
 run(`setLearnerSkill(2000);settings.elo=2200;`);
 assert.match(run(`(()=>{const e=teachingFixture();return coachingMessage(e,3);})()`),/e7 → e5.*g1 → f3.*b8 → c6/);
 assert.doesNotMatch(run(`(()=>{const e=teachingFixture();return learnerHint(e.before,e.m,e.beforeAnalysis,2,8);})()`),/e2 → e4/);
 const headings=run(`teachingSections('For Black — Recognition cue: a pawn. Calculation task: compare. Opponent context: rehearse.').map(x=>x.heading)`);
 assert.deepEqual(Array.from(headings),['Recognition cue · Black','Calculation task · Black','Opponent context']);
});
console.log(`${count} learner coaching regressions passed`);
