const assert=require('node:assert/strict');const {run,storage}=require('./core-regressions.cjs');let passed=0;
function test(name,fn){fn();passed++;console.log('PASS '+name)}
run(`function setupSave(line=['e2e4','c7c5','g1f3','d7d6']){settings={name:'Test bot',elo:1000,style:'Balanced'};playerSide='w';watchMode=false;currentGameId='save-test';lastSavedRevision=null;lastSavedSignature=null;saveConflict=false;busy=false;history=[];redoStates=[];gameStates=[];game=initial();for(const u of line){const before=game,m=lessonMove(game,u);if(!m)throw Error('Invalid test move '+u);history.push(game);game=make(game,m);gameStates.push({before,m,after:game});}persistGame();}`);
test('saved move replay restores exact position and single-move undo/redo cursor',()=>{
 storage.clear();run(`setupSave();const savedFinal=fen(game);undoOne();undoOne();`);const raw=storage.get('cc-game:save-test');assert.equal(JSON.parse(raw).cursor,2);
 run(`game=null;history=[];redoStates=[];gameStates=[];restoreSavedGame('save-test');`);assert.equal(run('gameStates.length'),2);assert.equal(run('redoStates.length'),2);run('redoOne();redoOne()');assert.equal(run('fen(game)'),run('savedFinal'));
});
test('saved Black and spectator setups resume paused without automatic engine moves',()=>{
 storage.clear();run(`setupSave();playerSide='b';watchMode=true;persistGame();restoreSavedGame('save-test')`);assert.equal(run('playerSide'),'b');assert.equal(run('watchMode'),true);assert.equal(run('watchPaused'),true);assert.equal(run('historyPaused'),true);assert.equal(run('busy'),false);
});
test('corrupt or illegal saves leave the current game unchanged',()=>{
 storage.clear();run('setupSave()');const before=run('fen(game)'),snapshot=JSON.parse(storage.get('cc-game:save-test'));snapshot.timeline[0]='e2e5';storage.set('cc-game:bad',JSON.stringify({...snapshot,id:'bad'}));assert.equal(run(`restoreSavedGame('bad')`),false);assert.equal(run('fen(game)'),before);
});
test('stale tabs cannot overwrite an updated save; a new copy preserves the local board',()=>{
 storage.clear();run('setupSave()');const saved=JSON.parse(storage.get('cc-game:save-test'));saved.revision='other-tab';storage.set('cc-game:save-test',JSON.stringify(saved));run(`undoOne()`);assert.equal(run('saveConflict'),true);assert.equal(JSON.parse(storage.get('cc-game:save-test')).revision,'other-tab');run(`currentGameId='separate-copy';lastSavedRevision=null;lastSavedSignature=null;persistGame()`);assert.ok(storage.has('cc-game:separate-copy'));assert.equal(JSON.parse(storage.get('cc-game:separate-copy')).cursor,3);
});
test('restoring a finished game does not count its result again',()=>{
 storage.clear();run(`setupSave(['f2f3','e7e5','g2g4','d8h4']);saveGameResult();restoreSavedGame('save-test')`);assert.equal(run('game.over'),true);assert.equal(run('loadStats().losses'),1);run(`restoreSavedGame('save-test')`);assert.equal(run('loadStats().losses'),1);
});
test('castling, en passant and underpromotion survive legal replay',()=>{
 for(const moves of [['e2e4','e7e5','g1f3','b8c6','f1c4','g8f6','e1g1'],['e2e4','a7a6','e4e5','d7d5','e5d6'],['b2b4','a7a5','b4a5','h7h5','a5a6','h5h4','a6a7','h4h3','a7b8n']]){
 storage.clear();run(`setupSave(${JSON.stringify(moves)})`);const before=run('fen(game)');run(`restoreSavedGame('save-test')`);assert.equal(run('fen(game)'),before);
 }
});
test('a claimed repetition draw remains available in redo after reload',()=>{
 storage.clear();run(`setupSave(['g1f3','g8f6','f3g1','f6g8','g1f3','g8f6','f3g1','f6g8']);game={...game,claimedDraw:'threefold repetition'};persistGame();undoOne();restoreSavedGame('save-test');redoOne();`);assert.equal(run('gameOutcome(game).reason'),'threefold repetition');
});
test('opening a save is read-only and does not invalidate another tab’s revision',()=>{
 storage.clear();run('setupSave()');const revision=JSON.parse(storage.get('cc-game:save-test')).revision;run(`restoreSavedGame('save-test')`);assert.equal(JSON.parse(storage.get('cc-game:save-test')).revision,revision);
});
console.log(`${passed} saved-game regressions passed`);
