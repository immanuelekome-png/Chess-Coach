// Exercise the bundled engine's official Node UCI entry point; no browser automation.
const {spawn}=require('node:child_process'),readline=require('node:readline'),path=require('node:path');
class UciEngineClient{
 constructor(){this.child=spawn(process.execPath,[path.join(__dirname,'../engine/stockfish.js')],{stdio:['pipe','pipe','pipe']});this.errors='';this.child.stderr.on('data',x=>{this.errors=(this.errors+x).slice(-4000);});readline.createInterface({input:this.child.stdout}).on('line',line=>{const pending=this.pending;if(!pending)return;try{pending.observe?.(line);if(pending.matches(line)){clearTimeout(pending.timer);this.pending=null;pending.resolve(line);}}catch(e){clearTimeout(pending.timer);this.pending=null;pending.reject(e);}});this.child.on('error',e=>this.fail(e));this.child.on('exit',code=>this.fail(Error('Engine exited '+code+': '+this.errors)));}
 fail(error){if(this.pending){clearTimeout(this.pending.timer);this.pending.reject(error);this.pending=null;}}
 exchange(commands,matches,observe){if(this.pending)throw Error('Engine requests must be sequential');return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{this.pending=null;reject(Error('Engine request timed out: '+this.errors));this.child.kill();},20000);this.pending={resolve,reject,matches,observe,timer};this.child.stdin.write(commands.join('\n')+'\n');});}
 async ready(){await this.exchange(['uci'],line=>line==='uciok');await this.exchange(['setoption name Threads value 1','setoption name Hash value 16','setoption name UCI_LimitStrength value false','setoption name Skill Level value 20','isready'],line=>line==='readyok');}
 async search(fen,{depth,ms,lines},observe){return this.exchange(['setoption name MultiPV value '+lines,'position fen '+fen,'go depth '+depth+' movetime '+ms],line=>line.startsWith('bestmove '),observe);}
 close(){this.child.stdin.end('quit\n');const timer=setTimeout(()=>this.child.kill(),1000);timer.unref();}
}
module.exports={UciEngineClient};
