const assert=require('node:assert/strict');const {run}=require('./core-regressions.cjs');let count=0;
function test(name,fn){fn();count++;console.log('PASS '+name);}
test('all plan labs have legal positions, answer choices and achievable move goals',()=>run(`for(const d of Object.values(academyLabs)){const s=parseAcademyFen(d.fen);if(inCheck(s,enemy(s.turn))||!d.choices[d.answer]||!legal(s).some(m=>labGoal(d,s,m,make(s,m))))throw Error('Unsolvable lab');}`));
test('spotting rejects a wrong square without changing the position',()=>{
 run(`openLesson('Find an outpost','','');const originalLab=fen(academyState.states[0]);tapPlanLab(sqIndex('a1'));`);assert.equal(run('academyState.phase'),'spot');assert.equal(run('fen(academyState.states[0])'),run('originalLab'));
 run(`tapPlanLab(sqIndex('e5'))`);assert.equal(run('academyState.phase'),'plan');
});
test('a wrong plan gives feedback and keeps the board phase locked',()=>{
 assert.equal(run('answerLabPlan(academyState,0)'),false);assert.equal(run('academyState.phase'),'plan');assert.match(run('academyState.message'),/Try again/);assert.equal(run('answerLabPlan(academyState,2)'),true);assert.equal(run('academyState.phase'),'play');
});
test('legal moves that miss the objective do not alter the board or grant completion',()=>{
 run(`academyCompleted.delete('Use an open file');openLesson('Use an open file','','');tapPlanLab(sqIndex('d4'));answerLabPlan(academyState,0);tapPlanLab(sqIndex('a1'));tapPlanLab(sqIndex('b1'));`);
 assert.equal(run('academyState.step'),0);assert.equal(run(`academyCompleted.has('Use an open file')`),false);assert.match(run('academyState.message'),/legal, but/);
 run(`tapPlanLab(sqIndex('a1'));tapPlanLab(sqIndex('d1'));`);assert.equal(run('academyState.finished'),true);assert.equal(run(`academyCompleted.has('Use an open file')`),true);
 const attempts=run('academyState.attempts');run(`tapPlanLab(sqIndex('a8'))`);assert.equal(run('academyState.attempts'),attempts);
});
test('different moves can meet the same open-file and development objectives',()=>run(`for(const u of ['a1c1','a1d1','a1e1']){const d=academyLabs['Use an open file'],s=parseAcademyFen(d.fen),m=lessonMove(s,u);if(!m||!labGoal(d,s,m,make(s,m)))throw Error(u);}for(const u of ['b1c3','g1f3']){const d=academyLabs['Develop with purpose'],s=parseAcademyFen(d.fen),m=lessonMove(s,u);if(!labGoal(d,s,m,make(s,m)))throw Error(u);}`));
test('checkpoints require finishing the example and answering correctly before completion',()=>{
 run(`academyCompleted.delete('Rook endings');openLesson('Rook endings','','');`);assert.equal(run('answerAcademyCheckpoint(academyState,1)'),false);
 run(`academyState.finished=true;saveAcademyProgress('Rook endings');renderLesson();`);assert.equal(run(`academyCompleted.has('Rook endings')`),false);assert.equal(run('answerAcademyCheckpoint(academyState,0)'),false);assert.equal(run(`academyCompleted.has('Rook endings')`),false);assert.equal(run('answerAcademyCheckpoint(academyState,1)'),true);assert.equal(run(`academyCompleted.has('Rook endings')`),true);
});
test('restart and changing lessons invalidate prior activity handlers',()=>{
 run(`openLesson('Use an open file','','');const staleLab=academyState;openLesson('Use an open file','','');`);assert.equal(run('academyState.phase'),'spot');assert.equal(run('answerLabPlan(staleLab,0)'),false);run(`openLesson('Pins','','');`);assert.equal(run('answerLabPlan(staleLab,0)'),false);
});
console.log(`${count} Academy interaction regressions passed`);
