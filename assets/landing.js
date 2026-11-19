/* BinBol Landing v0.2 — plain JavaScript, no external dependencies.
   The logo's numeric digits are literal, repeated ASCII bits; color/glyphs are views.
*/
(() => {
'use strict';
const $ = id => document.getElementById(id);
const root = document.documentElement;
const STORE = 'binbol:landing:v02';
const VARIANTS = 'binbol:landing:variants:v02';
const defaults = Object.freeze({
  bg:'#02090b',mint:'#43ffba',cyan:'#55edfa',violet:'#be90ff',text:'#f4faff',muted:'#a5bbc2',glassTint:'#103941',
  glassBlur:13,glassOpacity:30,glassGlow:67,glassRadius:54,edgeStrength:62,
  rainDensity:93,rainSpeed:74,rainGlow:136,rainGlyph:26,rainOpacity:100,
  hoverGlow:72,motionSpeed:100,reduceMotion:false
});
const presets = [
  {name:'Emerald Rain',bg:'#02090b',mint:'#43ffba',cyan:'#55edfa',violet:'#be90ff',glassTint:'#103941'},
  {name:'Liquid Aurora',bg:'#060d1a',mint:'#23edc9',cyan:'#64dfff',violet:'#d28bff',glassTint:'#17314e'},
  {name:'Matrix Classic',bg:'#010905',mint:'#25ff70',cyan:'#5cffad',violet:'#79e1b4',glassTint:'#082819'},
  {name:'Monochrome Ice',bg:'#060a13',mint:'#b4faff',cyan:'#d8f6ff',violet:'#a7b8da',glassTint:'#283343'},
  {name:'Amber Protocol',bg:'#100b0b',mint:'#ffb963',cyan:'#fddd97',violet:'#d78bd4',glassTint:'#3d2521'}
];
const configs = {
  colors:[
    ['bg','Background','Deep canvas'],['mint','Binary rain & binary logo','Primary signal'],['cyan','Transition / glyph cyan','Secondary signal'],
    ['violet','Glyph violet & accents','Tertiary signal'],['text','Text','Primary type'],['muted','Muted text','Supporting type'],['glassTint','Glass material tint','Translucent surface']
  ],
  rain:[
    ['rainDensity','Stream density',18,100,'%'],['rainSpeed','Fall velocity',15,160,'%'],['rainGlow','Head / trail glow',0,180,'%'],
    ['rainGlyph','Symbol proportion',0,100,'%'],['rainOpacity','Canvas opacity',10,100,'%']
  ],
  glass:[
    ['glassBlur','Backdrop blur',0,32,'px'],['glassOpacity','Tint intensity',8,70,'%'],['glassGlow','Outer illumination',0,110,'%'],
    ['glassRadius','Corner radius',14,90,'px'],['edgeStrength','Reflective rim',0,100,'%']
  ],
  motion:[
    ['hoverGlow','Spotlight outline',0,100,'%'],['motionSpeed','Animation speed',25,175,'%'],['reduceMotion','Reduce motion']
  ]
};
const variables = {bg:'--bg',mint:'--mint',cyan:'--cyan',violet:'--violet',text:'--text',muted:'--muted',glassTint:'--glass-tint',glassBlur:'--glass-blur',glassOpacity:'--glass-opacity',glassGlow:'--glass-glow',glassRadius:'--glass-radius',edgeStrength:'--edge-strength',rainGlow:'--rain-glow',rainOpacity:'--rain-opacity',hoverGlow:'--hotspot',motionSpeed:'--motion-time'};
let state={...defaults};
let variants={};
let activeTab='colors';
let activePreset=-1;
const safeGet=(key)=>{try{return localStorage.getItem(key)}catch{return null}};
const safeSet=(key,v)=>{try{localStorage.setItem(key,v)}catch{/* local-file privacy mode */}};
const isColor=k=>['bg','mint','cyan','violet','text','muted','glassTint'].includes(k);
const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
const isHex=v=>typeof v==='string'&&/^#[0-9a-fA-F]{6}$/.test(v);
function validTheme(input){const next={...defaults};for(const [key,value] of Object.entries(input||{})){
 if(!(key in defaults))continue;
 if(isColor(key)){if(isHex(value))next[key]=value;}
 else if(typeof defaults[key]==='boolean'){if(typeof value==='boolean')next[key]=value;}
 else if(Number.isFinite(Number(value))){const range=[...(configs.rain.find(x=>x[0]===key)||configs.glass.find(x=>x[0]===key)||configs.motion.find(x=>x[0]===key)||[])];next[key]=range.length>=4?clamp(Number(value),range[2],range[3]):Number(value);}
}return next;}
function storedTheme(){try{const snapshot=$('exported-theme');if(snapshot?.textContent)return validTheme(JSON.parse(snapshot.textContent));const raw=safeGet(STORE);if(raw)return validTheme(JSON.parse(raw));}catch{}return {...defaults}}
function syncStyle(){const o={
 '--bg':state.bg,'--mint':state.mint,'--cyan':state.cyan,'--violet':state.violet,'--text':state.text,'--muted':state.muted,
 '--glass-tint':state.glassTint,'--glass-blur':state.glassBlur+'px','--glass-radius':state.glassRadius+'px',
 '--glass-glow':(state.glassGlow/100).toFixed(2),'--edge-strength':(state.edgeStrength/100).toFixed(2),
 '--rain-opacity':(state.rainOpacity/100).toFixed(2),'--rain-glow':(state.rainGlow/100).toFixed(2),
 '--hotspot':(state.hoverGlow/100).toFixed(2),'--motion-time':(state.motionSpeed/100).toFixed(2)
};for(const [key,val] of Object.entries(o))root.style.setProperty(key,val);
 const hero=$('hero-glass');if(hero){hero.style.backgroundColor=`${state.glassTint}${Math.round(state.glassOpacity*.8).toString(16).padStart(2,'0')}`;}
 const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=state.bg;
 document.body.classList.toggle('reduce-motion',state.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 document.querySelectorAll('[data-current-value]').forEach(el=>{const k=el.dataset.currentValue;if(k in state)el.textContent=String(state[k]);});
}
function applyTheme(input,save=true){state=validTheme(input);syncStyle();if(save)safeSet(STORE,JSON.stringify(state));if(rain)rain.reset();}
function status(msg){const e=$('settings-status');if(e)e.textContent=msg;}
function download(name,content,type){const link=document.createElement('a');const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
function cssTokens(){let items={
'--bg':state.bg,'--mint':state.mint,'--cyan':state.cyan,'--violet':state.violet,'--text':state.text,'--muted':state.muted,'--glass-tint':state.glassTint,
'--glass-blur':state.glassBlur+'px','--glass-radius':state.glassRadius+'px','--glass-glow':(state.glassGlow/100).toFixed(2),
'--edge-strength':(state.edgeStrength/100).toFixed(2),'--rain-opacity':(state.rainOpacity/100).toFixed(2),
'--rain-glow':(state.rainGlow/100).toFixed(2),'--hotspot':(state.hoverGlow/100).toFixed(2)};
return ':root {\n'+Object.entries(items).map(([k,v])=>`  ${k}: ${v};`).join('\n')+'\n}\n';}
function exportHTML(){
 const clone=document.documentElement.cloneNode(true);
 const prior=clone.querySelector('#exported-theme');if(prior)prior.remove();const oldLayout=clone.querySelector('#exported-layout');if(oldLayout)oldLayout.remove();
 const node=document.createElement('script');node.type='application/json';node.id='exported-theme';node.textContent=JSON.stringify(state).replace(/</g,'\\u003c');clone.querySelector('head').append(node);const layoutNode=document.createElement('script');layoutNode.type='application/json';layoutNode.id='exported-layout';layoutNode.textContent=JSON.stringify(window.BinBolStudio?.get?.()||{}).replace(/</g,'\\u003c');clone.querySelector('head').append(layoutNode);
 const drawer=clone.querySelector('#settings-drawer'),back=clone.querySelector('#drawer-backdrop');if(drawer)drawer.setAttribute('hidden','');if(back)back.setAttribute('hidden','');
 const canvas=clone.querySelector('#rain');if(canvas){canvas.removeAttribute('width');canvas.removeAttribute('height')}
 // On the standalone build, CSS/JS/SVG are already inlined. Source variant points to bundled companion HTML.
 if(!clone.querySelector('#standalone-css')) {location.href='BinBol-Landing-Standalone.html';return;}
 download('BinBol-landing-custom.html','<!doctype html>\n'+clone.outerHTML,'text/html;charset=utf-8');status('Standalone HTML exported with the current theme.');
}
function renderPresets(){const mount=$('presets');if(!mount)return;mount.replaceChildren();presets.forEach((p,i)=>{
 const b=document.createElement('button');b.type='button';b.className='preset-btn'+(activePreset===i?' is-active':'');
 b.innerHTML='<span class="preset-swatches">'+['mint','cyan','violet'].map(k=>`<i style="background:${p[k]}"></i>`).join('')+`</span><span>${p.name}</span>`;
 b.addEventListener('click',()=>{activePreset=i;applyTheme({...state,...p});renderPresets();renderControls();status('Applied '+p.name)});mount.append(b)
});}
function renderControls(){const box=$('settings-controls');if(!box)return;box.replaceChildren();const grid=document.createElement('div');grid.className='controls-grid';
 for(const row of configs[activeTab]||[]){const [key,label,arg2,arg3,unit]=row;const item=document.createElement('label');item.className='setting-row';
 if(isColor(key)){item.innerHTML=`<span>${label}<small>${arg2||''}</small></span>`;const input=document.createElement('input');input.type='color';input.value=state[key];input.setAttribute('aria-label',label);input.addEventListener('input',()=>{activePreset=-1;applyTheme({...state,[key]:input.value});renderPresets()});item.append(input);}
 else if(key==='reduceMotion'){item.innerHTML=`<span>${label}<small>Overrides continuous motion</small></span>`;const input=document.createElement('input');input.type='checkbox';input.checked=state[key];input.addEventListener('change',()=>{applyTheme({...state,[key]:input.checked});rain?.reset()});item.append(input);}
 else{item.classList.add('range-row');const head=document.createElement('div');head.className='range-title';const name=document.createElement('span');name.textContent=label;const output=document.createElement('output');output.textContent=state[key]+(unit||'');head.append(name,output);const input=document.createElement('input');input.type='range';input.min=arg2;input.max=arg3;input.step=1;input.value=state[key];input.setAttribute('aria-label',label);input.addEventListener('input',()=>{activePreset=-1;output.textContent=input.value+(unit||'');applyTheme({...state,[key]:Number(input.value)},false)});input.addEventListener('change',()=>safeSet(STORE,JSON.stringify(state)));item.append(head,input);}
 grid.append(item);
 }box.append(grid);
 if(activeTab==='rain')box.insertAdjacentHTML('beforeend','<p class="settings-info">Streams use a custom Canvas renderer with independent speeds, luminous heads, trailing symbols and adaptive density. No images or looping videos.</p>');
 if(activeTab==='glass')box.insertAdjacentHTML('beforeend','<p class="settings-info">This build uses backdrop blur, translucent material and optical highlights. True background displacement remains a separate enhancement.</p>');
 if(activeTab==='motion')box.insertAdjacentHTML('beforeend','<p class="settings-info">Reduced motion also follows your system setting. Static presentation remains legible without animations.</p>');
}
function renderSaved(){const e=$('saved-variants');if(!e)return;e.replaceChildren();for(const [name,config] of Object.entries(variants)){
 const row=document.createElement('div');row.className='saved-item';const load=document.createElement('button');load.type='button';load.textContent=name;load.title='Load '+name;load.addEventListener('click',()=>{activePreset=-1;applyTheme(config);renderControls();renderPresets();window.BinBolStudio?.loadNamed?.(name);status('Loaded '+name)});
 const del=document.createElement('button');del.type='button';del.className='delete-saved';del.textContent='×';del.setAttribute('aria-label','Delete '+name);del.addEventListener('click',()=>{delete variants[name];safeSet(VARIANTS,JSON.stringify(variants));renderSaved();window.BinBolStudio?.deleteNamed?.(name);status('Deleted '+name)});row.append(load,del);e.append(row);
}}
let previousFocus=null;
function openDrawer(){previousFocus=document.activeElement;const panel=$('settings-drawer');panel.hidden=false;$('drawer-backdrop').hidden=false;document.body.style.overflow='hidden';renderPresets();renderControls();renderSaved();$('settings-close').focus();}
function closeDrawer(){$('settings-drawer').hidden=true;$('drawer-backdrop').hidden=true;document.body.style.overflow='';previousFocus?.focus?.();}
function initControls(){['settings-open','settings-inline'].forEach(id=>$(id)?.addEventListener('click',openDrawer));$('settings-close')?.addEventListener('click',closeDrawer);$('drawer-backdrop')?.addEventListener('click',closeDrawer);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('settings-drawer').hidden)closeDrawer()});
 document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{activeTab=b.dataset.tab;document.querySelectorAll('[data-tab]').forEach(x=>{const a=x===b;x.classList.toggle('is-active',a);x.setAttribute('aria-selected',String(a))});renderControls()}));
 $('save-variant')?.addEventListener('click',()=>{const name=$('variant-name').value.trim();if(!name){status('Choose a name first.');return}variants[name]={...state};window.BinBolStudio?.saveNamed?.(name);safeSet(VARIANTS,JSON.stringify(variants));renderSaved();$('variant-name').value='';status('Saved '+name)});
 $('reset-default')?.addEventListener('click',()=>{activePreset=0;applyTheme(defaults);renderPresets();renderControls();window.BinBolStudio?.reset?.();status('Defaults restored.')});
 $('export-json')?.addEventListener('click',()=>{download('binbol-theme.json',JSON.stringify({format:'binbol.theme.v1',theme:state},null,2),'application/json;charset=utf-8');status('Theme JSON exported.')});
 $('export-css')?.addEventListener('click',()=>{download('binbol-tokens.css',cssTokens(),'text/css;charset=utf-8');status('CSS tokens exported.')});
 $('export-html')?.addEventListener('click',exportHTML);
 $('import-json')?.addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());applyTheme(data.theme||data);renderControls();renderPresets();status('Imported theme successfully.')}catch{status('Could not read the theme JSON.')}e.target.value='';});
}
function initSpotlight(){document.querySelectorAll('[data-spot]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--px',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');el.style.setProperty('--py',((e.clientY-r.top)/r.height*100).toFixed(1)+'%')});el.addEventListener('pointerleave',()=>{el.style.setProperty('--px','50%');el.style.setProperty('--py','50%')});});}
function initReplay(){const frame=$('logo-frame');const button=$('replay-logo');const replay=()=>{frame.classList.remove('is-replaying');void frame.offsetWidth;frame.classList.add('is-replaying');setTimeout(()=>frame.classList.remove('is-replaying'),1750)};button?.addEventListener('click',replay);setTimeout(replay,250);}
function hexRgb(hex){return[1,3,5].map(x=>parseInt(hex.slice(x,x+2),16))}
function rgba(hex,alpha){return 'rgba('+hexRgb(hex).join(',')+','+alpha+')'}
function makeRain(){const canvas=$('rain');if(!canvas)return null;const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return null;
 let streams=[],raf=0,last=0,w=0,h=0,dpr=1,sleep=false;
 const glyphs='◈⌬✧◇⟡⋈⌁⊕⋄◉';const rand=(a,b)=>a+Math.random()*(b-a);
 const pref=window.matchMedia('(prefers-reduced-motion: reduce)');
 const reduced=()=>state.reduceMotion||pref.matches;
 function build(){w=window.innerWidth;h=window.innerHeight;dpr=Math.min(window.devicePixelRatio||1,1.7);canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  streams=[];const spacing=w<540?19:22;const count=Math.ceil(w/spacing)*(state.rainDensity/76);for(let i=0;i<count;i++){
   const depth=Math.random();const size=depth>.72?20:depth>.25?16:12;
   const x=(i+rand(-.15,.15))*(w/count);const y=rand(-h*.4,h*1.2);
   streams.push({x,y,head:y,speed:rand(33,91)*(state.rainSpeed/70)*(depth*.55+.78),
    size,tail:Math.round(rand(10,21)),step:rand(18,24),depth,offset:rand(0,10000),glyph:Math.random()<state.rainGlyph/100,
    tone:Math.random()<.10?'violet':Math.random()<.16?'cyan':'mint',tick:Math.floor(rand(0,1000))});
  }
 }
 function paint(t,staticMode=false){if(!w||!h)return;ctx.fillStyle=staticMode?'rgba(2,9,11,1)':'rgba(2,9,11,.15)';ctx.fillRect(0,0,w,h);const time=t/1000;
  for(const s of streams){if(!staticMode){s.y += s.speed*(Math.min((t-last||32)/1000,.08))}if(s.y-s.tail*s.step>h){s.y=-rand(10,h*.4)}
   ctx.font=`${s.size}px ui-monospace,Consolas,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
   const n=s.tail;for(let j=n-1;j>=0;j--){const y=s.y-j*s.step;if(y<-32||y>h+26)continue;
    const c=(j===0?'#d5ffeb':state[s.tone]);const opacity=(j===0?.94:Math.pow(1-j/n,1.5)*(.89+s.depth*.12))*(s.depth*.43+.55);
    const step=Math.floor(time*(3+s.depth*6))+j*7+s.tick;
    const ch=s.glyph?(glyphs[step%glyphs.length]):((step*7+s.tick)%11<6?'0':'1');
    if(j===0){ctx.save();ctx.shadowColor=state[s.tone];ctx.shadowBlur=16*state.rainGlow/100;ctx.fillStyle=rgba(c,opacity);ctx.fillText(ch,s.x,y);ctx.restore();}
    else{ctx.fillStyle=rgba(c,Math.min(.88,opacity));ctx.fillText(ch,s.x,y)}
   }
  }
 }
 function loop(now){raf=requestAnimationFrame(loop);if(document.hidden||reduced())return;if(now-last<31)return;paint(now);last=now;}
 function reset(){cancelAnimationFrame(raf);build();ctx.clearRect(0,0,w,h); // Pre-fill 4 frames: all columns visible immediately rather than an empty start.
  paint(performance.now(),true);
  if(!reduced()&&!document.hidden){last=performance.now();raf=requestAnimationFrame(loop)}
 }
 window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(reset,90)},{passive:true});let resizeTimer=0;
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)reset()});pref.addEventListener?.('change',reset);
 reset();return{reset};
}
let rain=null;
function init(){state=storedTheme();try{variants=JSON.parse(safeGet(VARIANTS)||'{}')}catch{variants={}};syncStyle();rain=makeRain();initControls();initSpotlight();initReplay();if($('year'))$('year').textContent=String(new Date().getFullYear());}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
