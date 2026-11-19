/* Binbol Dictionary Registry v1. Educational lossless codec, NOT encryption. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.BinbolRegistry=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const te=new TextEncoder(),td=new TextDecoder('utf-8',{fatal:true});
const MAGIC=[66,78,68,82], VERSION=1, MAX_RAW=20000, MAX_PACKET=150000, MAX_DICT=64000, MAX_DEPTH=12, MAX_EXPANDED=20000;
const initial=()=>({version:1,dictionaries:[
 {id:1,key:'code',name:'Code recipes',color:'#A78BFA',entries:[
  {id:1,glyph:'▣',name:'LOAD_HEALTH',kind:'text',text:'LOAD player.health\n'},
  {id:2,glyph:'◇',name:'COMPARE_ZERO',kind:'text',text:'COMPARE 0\n'},
  {id:3,glyph:'↳',name:'JUMP_IF_LE',kind:'text',text:'JUMP_IF_LE gameOver\n'},
  {id:4,glyph:'◎',name:'PRINT_ALIVE',kind:'text',text:'PRINT Player alive\n'},
  {id:5,glyph:'🛡',name:'CHECK_PLAYER',kind:'recipe',refs:['code:1','code:2','code:3','code:4']},
  {id:6,glyph:'⚔',name:'DAMAGE_PLAYER',kind:'text',text:'player.health -= damage;\n'},
  {id:7,glyph:'↩',name:'RETURN',kind:'text',text:'return 0;\n'}] },
 {id:2,key:'testing',name:'Testing',color:'#42C6AC',entries:[
  {id:1,glyph:'✓',name:'ASSERT_EQUAL',kind:'text',text:'assert.equal(actual, expected);\n'},
  {id:2,glyph:'☑',name:'ASSERT_TRUE',kind:'text',text:'assert.ok(result);\n'},
  {id:3,glyph:'◈',name:'LOG_RESULT',kind:'text',text:'console.log(result);\n'},
  {id:4,glyph:'🧪',name:'TEST_FLOW',kind:'recipe',refs:['testing:2','testing:3']}]},
 {id:3,key:'chat',name:'Messages',color:'#F4C469',entries:[
  {id:1,glyph:'👋',name:'HELLO',kind:'text',text:'Hello'},
  {id:2,glyph:'🌍',name:'WORLD',kind:'text',text:' world'},
  {id:3,glyph:'✨',name:'BANG',kind:'text',text:'!'},
  {id:4,glyph:'💬',name:'HEBREW_HELLO',kind:'text',text:'שלום'},
  {id:5,glyph:'🌊',name:'HEBREW_WORLD',kind:'text',text:' עולם'},
  {id:6,glyph:'🎉',name:'HEBREW_MESSAGE',kind:'recipe',refs:['chat:4','chat:5']}]}]});
const byteLen=s=>te.encode(s).length;
function fail(x){throw Error(x);}
function validate(r){
 if(!r||r.version!==1||!Array.isArray(r.dictionaries)||r.dictionaries.length<1||r.dictionaries.length>16)fail('Invalid registry version or dictionary count.');
 const keys=new Set(),ids=new Set(),lookup=new Map();let count=0;
 for(const d of r.dictionaries){
  if(!Number.isInteger(d.id)||d.id<1||d.id>255||ids.has(d.id))fail('Duplicate or invalid dictionary ID.');ids.add(d.id);
  if(typeof d.key!=='string'||!/^[a-z][a-z0-9_-]{0,23}$/.test(d.key)||keys.has(d.key))fail('Dictionary keys must be unique ASCII identifiers.');keys.add(d.key);
  if(typeof d.name!=='string'||!d.name||d.name.length>50)fail('Invalid dictionary name.');
  if(typeof d.color!=='string'||!/^#[0-9a-fA-F]{6}$/.test(d.color))fail('Invalid color.');
  if(!Array.isArray(d.entries)||d.entries.length>64)fail('Max 64 entries per dictionary.');
  const eids=new Set();
  for(const e of d.entries){
   count++;if(count>256)fail('Max 256 total entries.');
   if(!Number.isInteger(e.id)||e.id<1||e.id>255||eids.has(e.id))fail('Duplicate or invalid entry ID.');eids.add(e.id);
   if(typeof e.name!=='string'||!e.name||e.name.length>64||typeof e.glyph!=='string'||!e.glyph||[...e.glyph].length>10)fail('Invalid entry name or glyph.');
   if(e.kind==='text'){
    if(typeof e.text!=='string'||!e.text||byteLen(e.text)>2048)fail('A text entry must contain 1–2048 UTF-8 bytes.');
   }else if(e.kind==='recipe'){
    if(!Array.isArray(e.refs)||!e.refs.length||e.refs.length>16||!e.refs.every(v=>typeof v==='string'&&/^[a-z][a-z0-9_-]{0,23}:\d{1,3}$/.test(v)))fail('Recipe expects up to 16 refs like code:1.');
   }else fail('Unknown entry kind.');
   lookup.set(d.key+':'+e.id,{dictionary:d,entry:e});
  }
 }
 const done=new Set(),active=new Set();
 function visit(ref,depth){
  if(depth>MAX_DEPTH)fail('Recipe nesting limit exceeded (12).');
  if(active.has(ref))fail('Circular dictionary reference: '+ref);
  const item=lookup.get(ref);if(!item)fail('Unknown recipe reference: '+ref);
  if(done.has(ref))return;
  active.add(ref);
  if(item.entry.kind==='recipe')for(const child of item.entry.refs)visit(child,depth+1);
  active.delete(ref);done.add(ref);
 }
 for(const key of lookup.keys())visit(key,0);
 if(byteLen(JSON.stringify(r))>MAX_DICT)fail('Dictionary file exceeds 64 KB.');
 return r;
}
function byKey(r,key){const x=r.dictionaries.find(d=>d.key===key);if(!x)fail('Unknown dictionary '+key);return x;}
function byId(r,id){const x=r.dictionaries.find(d=>d.id===id);if(!x)fail('Unknown dictionary ID '+id);return x;}
function get(r,ref){const [key,id]=ref.split(':');const d=byKey(r,key);const e=d.entries.find(x=>x.id===Number(id));if(!e)fail('Missing entry '+ref);return {d,e};}
function expand(r,ref,depth=0){if(depth>MAX_DEPTH)fail('Recipe expansion depth exceeded.');const {e}=get(r,ref);if(e.kind==='text')return e.text;let out='';for(const child of e.refs){out+=expand(r,child,depth+1);if(byteLen(out)>MAX_EXPANDED)fail('Expansion exceeds 20 KB.');}return out;}
function flat(r,ref,depth=0){const {e}=get(r,ref);if(e.kind==='text')return [{ref,text:e.text,depth}];let out=[{ref,text:'',depth}];for(const c of e.refs){out.push(...flat(r,c,depth+1));if(out.length>512)fail('Expanded recipe too long.');}return out;}
function addEntry(r,key,input){const n=JSON.parse(JSON.stringify(r));const d=byKey(n,key);const next=Math.max(0,...d.entries.map(e=>e.id))+1;if(next>255||d.entries.length>=64)fail('Dictionary entry capacity reached.');
 const name=String(input.name||'').trim();const glyph=String(input.glyph||'').trim();const kind=input.kind==='recipe'?'recipe':'text';
 const ent={id:next,glyph,name,kind};
 if(kind==='text')ent.text=String(input.text||'');
 else ent.refs=String(input.refs||'').split(/[\s,]+/).filter(Boolean);
 d.entries.push(ent);validate(n);return n;
}
function canonical(r){validate(r);return JSON.stringify(r);}
function fnv32(bytes){let h=0x811c9dc5;for(const b of bytes){h=Math.imul(h^b,0x01000193)>>>0;}return h>>>0;}
function fingerprint(r){return fnv32(te.encode(canonical(r)));}
function u32(out,v){out.push((v>>>24)&255,(v>>>16)&255,(v>>>8)&255,v&255);}
function readU32(b,p){if(p.i+4>b.length)fail('Truncated 32-bit field.');const x=(((b[p.i]<<24)>>>0)+(b[p.i+1]<<16)+(b[p.i+2]<<8)+b[p.i+3])>>>0;p.i+=4;return x;}
function varWrite(out,n){do{let x=n&127;n=Math.floor(n/128);out.push(x|(n?128:0));}while(n);}
function varRead(b,p){let n=0,shift=0;for(let i=0;i<4;i++){if(p.i>=b.length)fail('Truncated variable length.');const x=b[p.i++];n+=(x&127)*2**shift;if(!(x&128)){if(n>MAX_PACKET)fail('Length exceeds limit.');return n;}shift+=7;}fail('Invalid variable-length integer.');}
function literalsToken(str,out){if(!str)return;const bytes=te.encode(str);out.push(0);varWrite(out,bytes.length);out.push(...bytes);}
function matches(r,key){const d=byKey(r,key);return d.entries.map(e=>({d,e,text:expand(r,key+':'+e.id)})).filter(v=>v.text).sort((a,b)=>b.text.length-a.text.length||a.e.id-b.e.id);}
function tokenize(r,key,source){const dict=matches(r,key),tokens=[];let pos=0,literal='';const flush=()=>{if(literal){tokens.push({kind:'literal',text:literal});literal='';}};
 while(pos<source.length){const hit=dict.find(x=>source.startsWith(x.text,pos));if(hit){flush();tokens.push({kind:'entry',dictionary:hit.d,entry:hit.e,text:hit.text});pos+=hit.text.length;}
 else{const point=source.codePointAt(pos);const char=String.fromCodePoint(point);literal+=char;pos+=char.length;}}
 flush();return tokens;
}
function payload(tokens,profile){const out=[];let context=0;for(const t of tokens){
 if(t.kind==='literal'){literalsToken(t.text,out);continue;}
 if(profile==='flat'){out.push(1,t.dictionary.id,t.entry.id);}else{if(context!==t.dictionary.id){out.push(2,t.dictionary.id);context=t.dictionary.id;}out.push(3,t.entry.id);}
 }return Uint8Array.from(out);}
function encode(source,registry,key,transport='shared',strategy='auto'){
 validate(registry);if(typeof source!=='string'||byteLen(source)>MAX_RAW)fail('Input is limited to 20 KB UTF-8.');
 const d=byKey(registry,key);if(!['shared','embedded'].includes(transport))fail('Invalid transport type.');
 if(!['auto','flat','context'].includes(strategy))fail('Invalid strategy.');
 const tokens=tokenize(registry,key,source),f=payload(tokens,'flat'),c=payload(tokens,'context');
 const profile=strategy==='auto'?(c.length<f.length?'context':'flat'):strategy;
 const p=profile==='context'?c:f;
 const registryData=te.encode(canonical(registry));
 const out=[...MAGIC,VERSION,transport==='embedded'?1:0,profile==='context'?1:0];
 u32(out,fingerprint(registry));out.push(d.id);u32(out,p.length);
 if(transport==='embedded'){u32(out,registryData.length);out.push(...registryData);}
 out.push(...p);
 if(out.length>MAX_PACKET)fail('Packet exceeds 150 KB.');
 return {bytes:Uint8Array.from(out),tokens,profile,rawBytes:byteLen(source),dictionaryBytes:transport==='embedded'?4+registryData.length:0,payloadBytes:p.length,headerBytes:16,transport,checksum:fingerprint(registry)};
}
function parse(packet,localRegistry){const b=packet instanceof Uint8Array?packet:new Uint8Array(packet);if(b.length>MAX_PACKET||b.length<16)fail('Packet length invalid.');const p={i:0};for(let i=0;i<4;i++)if(b[p.i++]!==MAGIC[i])fail('Invalid BNDR signature.');if(b[p.i++]!==VERSION)fail('Unsupported packet version.');
 const flags=b[p.i++],profile=b[p.i++];if(flags>1||profile>1)fail('Unsupported packet flags.');const check=readU32(b,p);const dictId=b[p.i++];const size=readU32(b,p);let r=localRegistry;
 if(flags===1){const length=readU32(b,p);if(length>MAX_DICT||p.i+length>b.length)fail('Invalid embedded dictionary length.');try{r=JSON.parse(td.decode(b.slice(p.i,p.i+length)));}catch(e){fail('Invalid embedded registry JSON.');}p.i+=length;}
 if(!r)fail('Receiver has no shared registry.');validate(r);if(fingerprint(r)!==check)fail('Registry mismatch. Receiver needs exact same dictionary version and entries.');
 byId(r,dictId);
 if(p.i+size!==b.length)fail('Truncated packet or trailing bytes.');
 const payloadStart=p.i,payloadEnd=p.i+size;let active=0,out='',tokens=[];
 while(p.i<payloadEnd){const tag=b[p.i++];if(tag===0){const n=varRead(b,p);if(p.i+n>payloadEnd)fail('Truncated literal.');const text=td.decode(b.slice(p.i,p.i+n));p.i+=n;out+=text;tokens.push({kind:'literal',text});}
 else if(tag===1&&profile===0){if(p.i+2>payloadEnd)fail('Truncated ID.');const d=byId(r,b[p.i++]);const entryId=b[p.i++];const e=d.entries.find(e=>e.id===entryId);if(!e)fail('Unknown entry.');const text=expand(r,d.key+':'+e.id);out+=text;tokens.push({kind:'entry',dictionary:d,entry:e,text});}
 else if(tag===2&&profile===1){if(p.i>=payloadEnd)fail('Truncated dictionary switch.');active=b[p.i++];byId(r,active);}
 else if(tag===3&&profile===1){if(p.i>=payloadEnd)fail('Truncated entry.');const d=byId(r,active),id=b[p.i++],e=d.entries.find(e=>e.id===id);if(!e)fail('Unknown entry.');const text=expand(r,d.key+':'+e.id);out+=text;tokens.push({kind:'entry',dictionary:d,entry:e,text});}
 else fail('Unknown packet tag.');
 if(byteLen(out)>MAX_EXPANDED)fail('Decoded message exceeds 20 KB.');if(tokens.length>20000)fail('Too many tokens.');
 }
 return {text:out,registry:r,tokens,profile:profile?'context':'flat',transport:flags?'embedded':'shared',dictionary:byId(r,dictId),checksum:check,payloadBytes:size,packetBytes:b.length};
}
function hex(bytes,limit=128){return Array.from(bytes.slice(0,limit),x=>x.toString(16).toUpperCase().padStart(2,'0')).join(' ')+(bytes.length>limit?' …':'');}
function base64(bytes){let s='';for(const x of bytes)s+=String.fromCharCode(x);return 'BND1:'+btoa(s);}
function fromBase64(str){let s=String(str).trim();if(s.startsWith('BND1:'))s=s.slice(5);if(!/^[A-Za-z0-9+/]*={0,2}$/.test(s)||s.length>210000)fail('Invalid packet text.');let decoded;try{decoded=atob(s);}catch(e){fail('Invalid Base64.');}return Uint8Array.from(decoded,c=>c.charCodeAt(0));}
return {VERSION,initial,validate,canonical,byteLen,fingerprint,expand,flat,get,addEntry,tokenize,encode,parse,hex,base64,fromBase64};
});