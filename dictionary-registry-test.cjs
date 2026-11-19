'use strict';
const assert=require('node:assert/strict');
const B=require('./dictionary-registry-core.js');
const r=B.initial();
let passed=0;
const test=(name,fn)=>{fn();passed++;};
test('registry',()=>assert.equal(B.validate(r),r));
test('recipe expansion',()=>assert.equal(B.expand(r,'code:5'),'LOAD player.health\nCOMPARE 0\nJUMP_IF_LE gameOver\nPRINT Player alive\n'));
test('Hebrew recipe',()=>assert.equal(B.expand(r,'chat:6'),'שלום עולם'));
for(const key of ['code','testing','chat'])for(const transport of ['shared','embedded'])for(const strategy of ['auto','flat','context']){
 const atom=B.expand(r,key+':1');
 for(const message of [atom,atom.repeat(5),'שלום 🌊 👩‍👩‍👧‍👦 & C++\n','unique 🐙 '+atom,'']){
  const encoded=B.encode(message,r,key,transport,strategy);
  const decoded=B.parse(encoded.bytes,transport==='shared'?r:undefined);
  assert.equal(decoded.text,message);
  assert.equal(decoded.packetBytes,encoded.bytes.length);
  assert.equal(encoded.headerBytes+encoded.dictionaryBytes+encoded.payloadBytes,encoded.bytes.length);
  passed++;
 }
}
test('matching shared version',()=>{const altered=JSON.parse(JSON.stringify(r));altered.dictionaries[0].entries[0].text+=' wrong';assert.throws(()=>B.parse(B.encode('Hello',r,'chat').bytes,altered),/mismatch/);});
test('embedded independent from local',()=>{const altered=JSON.parse(JSON.stringify(r));altered.dictionaries[0].entries[0].text+=' wrong';assert.equal(B.parse(B.encode('Hello',r,'chat','embedded').bytes,altered).text,'Hello');});
test('longest recipe tile',()=>assert.equal(B.encode(B.expand(r,'code:5'),r,'code').tokens[0].entry.name,'CHECK_PLAYER'));
test('custom text tile',()=>{const n=B.addEntry(r,'chat',{name:'CUSTOM',glyph:'💎',kind:'text',text:'My message'});assert.equal(B.parse(B.encode('My message',n,'chat').bytes,n).text,'My message');});
test('cross dictionary recipe',()=>{const n=B.addEntry(r,'testing',{name:'CROSS',glyph:'⚙',kind:'recipe',refs:'code:1,testing:1'});assert.ok(B.expand(n,'testing:5').includes('LOAD player.health'));});
test('cycle detection',()=>{const n=JSON.parse(JSON.stringify(r));n.dictionaries[0].entries.push({id:8,name:'A',glyph:'A',kind:'recipe',refs:['code:9']},{id:9,name:'B',glyph:'B',kind:'recipe',refs:['code:8']});assert.throws(()=>B.validate(n),/Circular/);});
test('missing reference',()=>{const n=JSON.parse(JSON.stringify(r));n.dictionaries[0].entries.push({id:8,name:'A',glyph:'A',kind:'recipe',refs:['code:255']});assert.throws(()=>B.validate(n),/Unknown recipe reference/);});
test('invalid file header',()=>{const x=B.encode('Hello',r,'chat').bytes.slice();x[0]=0;assert.throws(()=>B.parse(x,r),/signature/);});
test('truncated packet',()=>assert.throws(()=>B.parse(new Uint8Array(4),r),/length/));
test('Base64 envelope',()=>{const x=B.encode('שלום עולם 🌊',r,'chat').bytes;assert.deepEqual(B.fromBase64(B.base64(x)),x);});
test('receiver needs registry in shared mode',()=>assert.throws(()=>B.parse(B.encode('Hello',r,'chat').bytes),/no shared registry/));
test('empty custom entry rejected',()=>assert.throws(()=>B.addEntry(r,'chat',{kind:'text',name:'Bad',glyph:'?',text:''}),/text entry/));
test('auto selects smallest payload',()=>{const text='Hello world!'.repeat(70);const a=B.encode(text,r,'chat'),f=B.encode(text,r,'chat','shared','flat'),c=B.encode(text,r,'chat','shared','context');assert.equal(a.bytes.length,Math.min(f.bytes.length,c.bytes.length));});
console.log('Dictionary Registry checks passed: '+passed);
