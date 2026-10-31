/* Chess Coach real-browser smoke/regression suite. Runs on Windows, macOS and Linux. */
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const reportDir = path.join(root, 'test-results');
fs.mkdirSync(reportDir, {recursive:true});
const cases = [], errors = [];
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.wasm':'application/wasm','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.css':'text/css'};
const server = http.createServer((req,res)=>{
  let p;
  try {p=decodeURIComponent(new URL(req.url,'http://localhost').pathname)} catch {res.writeHead(400).end();return}
  const resolved=path.resolve(root,'.'+p,(p.endsWith('/')?'index.html':''));
  if(!(resolved===root||resolved.startsWith(root+path.sep))){res.writeHead(403).end();return}
  fs.readFile(resolved,(err,data)=>{if(err){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':mime[path.extname(resolved)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)});
});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function run(){
 let browser, page;
 try {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port+'/';
  browser=await chromium.launch({headless:false});
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  page=await context.newPage();
  page.on('pageerror',e=>errors.push('Page error: '+e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push('Console error: '+m.text())});
  const check=async(name,fn)=>{try{await fn();cases.push({name,status:'PASS'});console.log('PASS '+name)}catch(e){cases.push({name,status:'FAIL',details:String(e.message||e).slice(0,600)});console.log('FAIL '+name+' - '+String(e.message||e).slice(0,250));try{await page.screenshot({path:path.join(reportDir,'fail-'+cases.length+'.png'),fullPage:true})}catch{}}};
  await check('App loads from real HTTP server',async()=>{await page.goto(url,{waitUntil:'domcontentloaded',timeout:20000});await page.locator('#start').waitFor({state:'visible'});if(await page.locator('#setup').isHidden())throw Error('Setup hidden')});
  await check('Engine files served with correct MIME types',async()=>{for(const [f,type] of [['engine/stockfish.js','text/javascript'],['engine/stockfish.wasm','application/wasm']]){const r=await context.request.get(url+f);if(!r.ok()||!r.headers()['content-type'].includes(type))throw Error(f+' response '+r.status()+' '+r.headers()['content-type'])}});
  await check('Academy opens and challenge list appears',async()=>{await page.locator('#openAcademy').click();await page.locator('[data-topic="challenges"]').click();await page.locator('#academyContent .lesson-card').first().waitFor({state:'visible'});});
  await check('Interactive Academy board has 64 squares',async()=>{await page.locator('#academyContent .lesson-card').first().click();const count=await page.locator('#lessonBoard .sq').count();if(count!==64)throw Error('Found '+count+' squares');await page.locator('#lessonRestart').click();await page.locator('#lessonExit').click()});
  await check('Academy search filters lessons',async()=>{await page.locator('[data-topic="openings"]').click();await page.locator('#academySearch').fill('Queen');const n=await page.locator('#academyContent .lesson-card').count();if(n<1)throw Error('No Queen lessons found');await page.locator('#academySearch').fill('')});
  await check('Game board initializes with 64 squares',async()=>{await page.locator('#closeAcademy').click();await page.locator('#start').click();await page.locator('#board .sq').first().waitFor({state:'visible'});const n=await page.locator('#board .sq').count();if(n!==64)throw Error('Found '+n+' squares')});
  await check('Stockfish becomes ready (up to 35s)',async()=>{await page.waitForFunction(()=>document.querySelector('#engineStatus')?.textContent?.includes('Stockfish 19 Lite · offline'),{timeout:35000})});
  await check('Human move e2-e4 is accepted',async()=>{await page.locator('#board .sq[data-coord="e2"]').click();await page.locator('#board .sq[data-coord="e4"]').click();await page.waitForFunction(()=>gameStates.length>=1,{timeout:5000});const moved=await page.evaluate(()=>gameStates[0]?.m);if(!moved)throw Error('Move not recorded')});
  await check('Stockfish responds with a legal move',async()=>{await page.waitForFunction(()=>gameStates.length>=2,{timeout:30000});const count=await page.evaluate(()=>gameStates.length);if(count<2)throw Error('No engine reply')});
  await check('Undo and redo buttons operate',async()=>{await page.locator('#undo').click();await page.locator('#redo').click();await page.locator('#board .sq').first().waitFor()});
  await check('Game Review opens',async()=>{await page.locator('#review').click();await page.locator('#analysis').waitFor({state:'visible',timeout:10000});});
  await check('Game Review displays results or progress',async()=>{await page.waitForTimeout(2500);const t=await page.locator('#reviewSummary').innerText();if(!t.trim())throw Error('No review summary')});
  await check('Bot vs Bot live speed control',async()=>{await page.locator('#closeReview').click();await page.locator('#new').click();await page.locator('#gameMode').selectOption('watch');await page.locator('#start').click();await page.locator('#liveWatchSpeed').waitFor({state:'visible'});await page.locator('#liveWatchSpeed').selectOption('350');const v=await page.locator('#liveWatchSpeed').inputValue();if(v!=='350')throw Error('Speed did not change');await page.locator('#watchPause').click()});
  await check('Screenshot captured',async()=>{await page.screenshot({path:path.join(reportDir,'app-mobile.png'),fullPage:true})});
  await context.close();
 } catch(e){cases.push({name:'Test harness',status:'FAIL',details:String(e.stack||e)});console.error(e)}
 finally{
  if(browser)await browser.close().catch(()=>{});
  await new Promise(resolve=>server.close(resolve));
  const report={generatedAt:new Date().toISOString(),platform:process.platform,summary:{passed:cases.filter(x=>x.status==='PASS').length,failed:cases.filter(x=>x.status==='FAIL').length},cases,browserErrors:errors};
  fs.writeFileSync(path.join(reportDir,'report.json'),JSON.stringify(report,null,2));
  const html=`<!doctype html><meta charset="utf-8"><title>Chess Coach test report</title><style>body{font:16px system-ui;max-width:850px;margin:40px auto;padding:0 20px;background:#101b22;color:#eee}li{padding:9px;border-bottom:1px solid #455}.pass{color:#8eebba}.fail{color:#ff8b8b}pre{white-space:pre-wrap}</style><h1>Chess Coach browser test report</h1><p>${report.generatedAt} · ${report.summary.passed} passed · ${report.summary.failed} failed</p><ol>${cases.map(x=>`<li class="${x.status.toLowerCase()}">${x.status} — ${escapeHtml(x.name)}${x.details?`<pre>${escapeHtml(x.details)}</pre>`:''}</li>`).join('')}</ol><h2>Browser errors</h2><pre>${escapeHtml(errors.join('\n')||'None recorded')}</pre><p>See screenshots in the same folder.</p>`;
  fs.writeFileSync(path.join(reportDir,'report.html'),html);
  console.log('\nREPORT: '+path.join(reportDir,'report.html'));
  if(report.summary.failed)process.exitCode=1;
 }
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
run();
