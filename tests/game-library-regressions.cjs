const assert=require('node:assert/strict');const {run,storage}=require('./core-regressions.cjs');let count=0;
function test(name,fn){fn();count++;console.log('PASS '+name);}
run(`function libraryFixture(line=['e2e4','e7e5','g1f3']){settings={name:'Test bot',elo:1000,style:'Balanced'};playerSide='w';watchMode=false;currentGameId='library-test';lastSavedRevision=null;lastSavedSignature=null;busy=false;history=[];redoStates=[];gameStates=[];game=initial();for(const u of line){const before=game,m=lessonMove(before,u);history.push(before);game=make(before,m);gameStates.push({before,m,after:game});}persistGame();}`);
test('renaming only changes metadata and never overwrites a newer saved timeline',()=>{
 storage.clear();run('libraryFixture()');const raw=storage.get('cc-game:library-test');assert.equal(run(`nameSavedGame('library-test','  Sicilian practice  ')`),true);assert.equal(storage.get('cc-game:library-test'),raw);assert.equal(run(`savedGameName('library-test')`),'Sicilian practice');run(`nameSavedGame('library-test','')`);assert.match(run(`savedGameTitle(JSON.parse(localStorage.getItem('cc-game:library-test')))`),/You as White/);
});
test('search matches names, opponents, color and difficulty and handles no results',()=>{
 run(`nameSavedGame('library-test','My Opening');`);for(const term of ['MY OPENING','test BOT','white','1000'])assert.equal(run(`matchingSavedGames(listSavedGames().records,${JSON.stringify(term)}).length`),1);assert.equal(run(`matchingSavedGames(listSavedGames().records,'no match').length`),0);
});
test('PGN uses SAN, correct color metadata, escaped titles and no unplayed redo moves',()=>{
 storage.clear();run(`libraryFixture();nameSavedGame('library-test','Game "A"');playerSide='b';persistGame();undoOne();`);const pgn=run(`savedGamePgn('library-test')`);assert.ok(pgn.includes('[Event "Game \\"A\\""]'));assert.match(pgn,/\[Black "Human"\]/);assert.match(pgn,/1\. e4 e5 \*/);assert.doesNotMatch(pgn,/Nf3|→/);
});
test('a finished export includes mate SAN and result without modifying the active game',()=>{
 storage.clear();run(`libraryFixture(['f2f3','e7e5','g2g4','d8h4']);const activeFen=fen(game);`);const raw=storage.get('cc-game:library-test'),pgn=run(`savedGamePgn('library-test')`);assert.match(pgn,/Qh4# 0-1/);assert.match(pgn,/\[Result "0-1"\]/);assert.equal(storage.get('cc-game:library-test'),raw);assert.equal(run('fen(game)'),run('activeFen'));
});
test('invalid saves refuse export and names are bounded',()=>{
 assert.equal(run(`nameSavedGame('missing','name')`),false);assert.throws(()=>run(`savedGamePgn('missing')`),/Save not found/);run(`nameSavedGame('library-test','x'.repeat(200))`);assert.equal(run(`savedGameName('library-test').length`),80);
});
console.log(`${count} game library regressions passed`);
