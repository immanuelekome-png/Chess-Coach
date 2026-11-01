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
test('reply labs start with a legal checking move and have two legal escapes plus a check-ignoring decoy',()=>run(`for(const d of Object.values(academyReplyLabs).filter(d=>!d.positional)){const before=parseAcademyFen(d.fen),s=replyLabStart(d);if(inCheck(before,enemy(before.turn))||!inCheck(s,s.turn)||d.branches.length!==2||d.branches.some(u=>!lessonMove(s,u))||lessonMove(s,d.decoy))throw Error('Invalid reply lab');for(const u of d.branches){const after=make(s,lessonMove(s,u));if(!legal(after).some(m=>coord(m.t)===d.target&&after.b[m.t].toLowerCase()===d.capture&&after.b[m.f].toLowerCase()===d.piece))throw Error('No follow-up');}}`));
test('the skewer bishop is protected against the king capturing it',()=>run(`for(const title of ['Skewers','Read the reply: protected skewer']){const d=academyReplyLabs[title]||academyPositions[title],s=parseAcademyFen(d.fen),after=make(s,lessonMove(s,'e2b5'));if(lessonMove(after,'c6b5'))throw Error('Unprotected skewer bishop');}`));
test('a wrong prediction leaves the position and completion unchanged',()=>{
 run(`academyCompleted.delete('Read the reply: knight fork');openLesson('Read the reply: knight fork','','');const replyOrigin=fen(academyState.states[0]);`);assert.equal(run(`answerReplyPrediction(academyState,'e3e4')`),false);assert.equal(run('academyState.phase'),'predict');assert.equal(run('fen(academyState.states[0])'),run('replyOrigin'));assert.match(run('academyState.message'),/leaves the king in check/);assert.equal(run(`academyCompleted.has(academyState.title)`),false);
});
test('correct predictions play the selected legal reply before the learner moves',()=>{
 assert.equal(run(`answerReplyPrediction(academyState,'e1d1')`),true);assert.equal(run('academyState.phase'),'followup');assert.equal(run('academyState.states[1].b[sqIndex("d1")]'),'K');assert.equal(run('academyState.seen.length'),0);
});
test('a legal follow-up missing the objective does not advance or complete a branch',()=>{
 run(`tapReplyLab(sqIndex('c2'));tapReplyLab(sqIndex('a3'));`);assert.equal(run('academyState.step'),1);assert.equal(run('academyState.seen.length'),0);assert.match(run('academyState.message'),/Legal move, but/);
});
test('first follow-up completes only its branch and prevents extra moves',()=>{
 run(`tapReplyLab(sqIndex('c2'));tapReplyLab(sqIndex('e3'));`);assert.equal(run('academyState.phase'),'branchDone');assert.equal(run('academyState.seen.length'),1);assert.equal(run('academyState.finished'),false);assert.equal(run(`academyCompleted.has(academyState.title)`),false);assert.equal(run(`tapReplyLab(sqIndex('d1'))`),false);assert.equal(run('academyState.step'),2);
});
test('exploring the second reply resets the position and saves completion only after its follow-up',()=>{
 assert.equal(run('nextReplyBranch(academyState)'),true);assert.equal(run('fen(academyState.states[0])'),run('replyOrigin'));assert.equal(run(`answerReplyPrediction(academyState,'e1d1')`),false);assert.equal(run(`answerReplyPrediction(academyState,'e1f1')`),true);run(`tapReplyLab(sqIndex('c2'));tapReplyLab(sqIndex('e3'));`);assert.equal(run('academyState.finished'),true);assert.equal(run(`academyCompleted.has(academyState.title)`),true);assert.equal(run('nextReplyBranch(academyState)'),false);
});
test('either branch order works in both labs without changing the live game',()=>run(`{const liveBefore=fen(game),movesBefore=gameStates.length;for(const [title,d] of Object.entries(academyReplyLabs).filter(([,d])=>!d.positional)){openLesson(title,'','');for(const u of [...d.branches].reverse()){answerReplyPrediction(academyState,u);const s=academyState.states[academyState.step],m=legal(s).find(m=>coord(m.t)===d.target&&s.b[m.f].toLowerCase()===d.piece);tapReplyLab(m.f);tapReplyLab(m.t);if(!academyState.finished)nextReplyBranch(academyState);}if(!academyState.finished)throw Error('Not complete');}if(fen(game)!==liveBefore||gameStates.length!==movesBefore)throw Error('Live game changed');}`));
test('reply restart clears branch exploration and stale handlers cannot advance a different activity',()=>{
 run(`openLesson('Read the reply: knight fork','','');const staleReply=academyState;answerReplyPrediction(academyState,'e1d1');openLesson('Read the reply: knight fork','','');`);assert.equal(run('academyState.seen.length'),0);assert.equal(run('academyState.phase'),'predict');assert.equal(run(`answerReplyPrediction(staleReply,'e1f1')`),false);assert.equal(run('nextReplyBranch(staleReply)'),false);run(`openLesson('Pins','','');`);assert.equal(run(`answerReplyPrediction(staleReply,'e1d1')`),false);
});
console.log(`${count} Academy interaction regressions passed`);
