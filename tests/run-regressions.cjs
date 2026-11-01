// Run isolated fixtures: several suites intentionally replace their VM's mocks.
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const suites=['core','practice','saved-games','audio-interface','learner-coaching','academy-interactions','game-library','review-line','offline-worker','loading-reliability','concept-review','special-rule','positional-reply','pgn-import','review-cache'];
for(const suite of suites){
 const result=spawnSync(process.execPath,[path.join(__dirname,suite+'-regressions.cjs')],{encoding:'utf8',maxBuffer:4*1024*1024});
 if(result.error||result.status!==0){process.stderr.write(result.stdout||'');process.stderr.write(result.stderr||'');if(result.error)console.error(result.error);process.exit(result.status||1);}
 const summary=result.stdout.trim().split('\n').at(-1);console.log(summary||suite+' passed');
}
console.log('All dependency-free regression suites passed. Browser interaction remains a separate check.');
