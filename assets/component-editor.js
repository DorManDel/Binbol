/* BinBol Studio v0.3 — editable visible sections, saved as portable, versioned JSON. */
(() => {
'use strict';
const key='binbol:studio:layout:v03', savedKey='binbol:studio:presets:v03';
const $=id=>document.getElementById(id);
const PARTS=[
 ['brand','Brand / site icon','header'],['nav','Capsule navigation','header'],['navHome','Nav: Home','header'],['navExplorer','Nav: Explorer','header'],['navExperiment','Nav: Experiment','header'],['navResearch','Nav: Research','header'],['github','GitHub SVG link','header'],['headerActions','Header actions','header'],['settingsControl','Settings icon','header'],['headerCta','Get Started button','header'],
 ['eyebrow','Experiment eyebrow','hero'],['wordmark','Binary → glyph wordmark','hero'],['codes','ASCII / representation legend','hero'],
 ['tagline','Primary headline','hero'],['subtitle','Secondary headline','hero'],['actions','CTA surface','hero'],['ctaPlay','Try BinBol action','cta'],['ctaExperiment','Explore action','cta'],
 ['utility','Replay / settings shortcuts','outside'],['footer','Footer','outside']
];
const TEXT={eyebrow:'AN EXPERIMENT IN REPRESENTATION',tagStart:'From',tagBinary:'Binary',tagJoin:'to',tagSymbol:'Symbol',subtitleA:'Encode the meaning.',subtitleB:'Visualize the bits.',ctaPlay:'Try BinBol',ctaExperiment:'Explore the Experiment',navHome:'Home',navExplorer:'Explorer',navExperiment:'Experiment',navResearch:'Research',headerCta:'Get started'};
const EDITABLE={eyebrow:['eyebrow'],tagline:['tagStart','tagBinary','tagJoin','tagSymbol'],subtitle:['subtitleA','subtitleB'],ctaPlay:['ctaPlay'],ctaExperiment:['ctaExperiment'],navHome:['navHome'],navExplorer:['navExplorer'],navExperiment:['navExperiment'],navResearch:['navResearch'],headerCta:['headerCta']};
const DEFAULT=()=>({format:'binbol.layout.v1',version:1,enabled:Object.fromEntries(PARTS.map(p=>[p[0],true])),copy:{...TEXT},colors:{},order:['eyebrow','wordmark','codes','tagline','subtitle','actions'],logoStyle:'mosaic',links:{navHome:'index.html',navExplorer:'explorer.html',navExperiment:'explorer.html#gamma',navResearch:'https://github.com/DorManDel/Binbol',headerCta:'explorer.html',ctaPlay:'mechanics.html',ctaExperiment:'explorer.html#gamma'},custom:[]});
const safeGet=k=>{try{return localStorage.getItem(k)}catch{return null}};
const safeSet=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
const validColor=c=>typeof c==='string'&&/^#[0-9a-f]{6}$/i.test(c);
if (new URLSearchParams(location.search).get('dev')==='1') document.body.classList.add('dev-preview');
const validLink=v=>typeof v==='string'&&(/^(https?:\/\/[^\s]+|(?:explorer|studio|index|dev)\.html(?:#[a-z0-9_-]+)?)$/i.test(v));
function validate(data){const d=DEFAULT();if(!data||typeof data!=='object')return d;
 for(const k of Object.keys(d.enabled))if(typeof data.enabled?.[k]==='boolean')d.enabled[k]=data.enabled[k];
 for(const k of Object.keys(TEXT))if(typeof data.copy?.[k]==='string')d.copy[k]=data.copy[k].slice(0,105);
 for(const [k,c] of Object.entries(data.colors||{}))if((k in d.enabled)&&validColor(c))d.colors[k]=c;
 const allowed=d.order;d.order=[...(data.order||[]).filter((n,i,a)=>allowed.includes(n)&&a.indexOf(n)===i),...allowed.filter(n=>!(data.order||[]).includes(n))];
 if(['mosaic','outline'].includes(data.logoStyle))d.logoStyle=data.logoStyle;for(const [k,v] of Object.entries(data.links||{}))if(k in d.links&&validLink(v))d.links[k]=v;
 if(Array.isArray(data.custom))d.custom=data.custom.slice(0,12).filter(x=>x&&typeof x.label==='string'&&validLink(x.href||'index.html')).map(x=>({id:String(x.id||Date.now()).slice(0,40),label:x.label.slice(0,48),href:x.href.slice(0,210),enabled:x.enabled!==false,color:validColor(x.color)?x.color:'#7cfbe2'}));
 return d;
}
function initial(){try{const injected=$('exported-layout');if(injected?.textContent)return validate(JSON.parse(injected.textContent)); const q=safeGet(key);return q?validate(JSON.parse(q)):DEFAULT()}catch{return DEFAULT()}}
let state=initial();
function apply(save=true){
 document.querySelectorAll('[data-part]').forEach(el=>{const k=el.dataset.part;if(k in state.enabled)el.hidden=!state.enabled[k];if(state.colors[k])el.style.color=state.colors[k];else el.style.removeProperty('color');});
 const mark=$('logo-glyph');if(mark)mark.style.setProperty('--current-glyph',state.colors.wordmark||'');document.querySelectorAll('[data-copy]').forEach(el=>{const v=state.copy[el.dataset.copy];if(typeof v==='string')el.textContent=v;});document.querySelectorAll('[data-link]').forEach(el=>{const v=state.links[el.dataset.link];if(validLink(v))el.setAttribute('href',v)});
 const hero=document.querySelector('.hero-inner');for(const name of state.order){const el=hero?.querySelector(':scope > [data-part="'+name+'"]');if(el)hero.append(el)}
 const logo=$('logo-glyph');if(logo&&logo.dataset.logoStyle!==state.logoStyle){const tpl=$('glyph-'+state.logoStyle+'-tpl');if(tpl?.content.firstElementChild)logo.replaceWith(tpl.content.firstElementChild.cloneNode(true));}
 const bar=document.querySelector('.action-bar');if(bar){const buttons=bar.querySelectorAll('.hero-action');const divider=bar.querySelector('.action-divider');if(divider)divider.hidden=![...buttons].every(x=>!x.hidden);}
 const anchor=document.querySelector('.hero-inner');if(anchor){anchor.querySelectorAll('.custom-part').forEach(x=>x.remove());for(const p of state.custom){if(!p.enabled)continue;const e=document.createElement('div');e.className='custom-part';e.style.color=p.color;const a=document.createElement('a');a.href=p.href;if(/^https?:/.test(p.href)){a.target='_blank';a.rel='noopener noreferrer'}a.textContent=p.label;e.append(a);anchor.append(e)}}
 if(save)safeSet(key,JSON.stringify(state));
 window.dispatchEvent(new CustomEvent('binbol:layout-change',{detail:{layout:state}}));
}
const persist=()=>apply(true);
function control(tag,props={},text=''){const e=document.createElement(tag);for(const [k,v] of Object.entries(props)){if(k==='className')e.className=v;else if(k==='dataset')Object.assign(e.dataset,v);else e.setAttribute(k,v)}if(text)e.textContent=text;return e}
function partRow([id,label,group]){const row=control('div',{className:'part-item'+(!state.enabled[id]?' is-off':'')});const top=control('div',{className:'part-top'});const title=control('strong',{},label);const options=control('div',{className:'part-options'});
 const check=control('input',{type:'checkbox',className:'part-check','aria-label':'Enable '+label});check.checked=state.enabled[id];check.addEventListener('change',()=>{state.enabled[id]=check.checked;persist();row.classList.toggle('is-off',!check.checked)});options.append(check);
 if(group==='hero'){for(const [label,delta] of [['↑',-1],['↓',1]]){const b=control('button',{type:'button','aria-label':'Move '+label+' '+id},label);let pos=state.order.indexOf(id);b.disabled=pos<0||pos+delta<0||pos+delta>=state.order.length;b.addEventListener('click',()=>{const i=state.order.indexOf(id),j=i+delta;[state.order[i],state.order[j]]=[state.order[j],state.order[i]];persist();renderParts()});options.append(b)}}top.append(title,options);row.append(top);
 if(EDITABLE[id]){const wrap=control('div',{className:'part-fields'});for(const k of EDITABLE[id]){const line=control('div');const inp=control('input',{type:'text','aria-label':'Text '+k,maxlength:105});inp.value=state.copy[k];inp.addEventListener('input',()=>{state.copy[k]=inp.value;persist()});line.append(inp);wrap.append(line)}row.append(wrap)}
 if(state.links[id]){const link=control('input',{type:'text','aria-label':'Destination URL for '+label});link.value=state.links[id];link.addEventListener('change',()=>{if(validLink(link.value)){state.links[id]=link.value;persist()}else{link.value=state.links[id];message('Invalid link.')}});row.append(link)}
 const col=control('input',{type:'color','aria-label':'Color of '+label});col.value=state.colors[id]||'#d6fff5';col.addEventListener('input',()=>{state.colors[id]=col.value;persist()});row.append(col);
 if(id==='wordmark'){const sel=control('select',{'aria-label':'Glyph logo rendering'});for(const [value,txt] of [['mosaic','Glyph mosaic · current'],['outline','Legacy outline · compare']]){const opt=control('option',{value},txt);sel.append(opt)}sel.value=state.logoStyle;sel.addEventListener('change',()=>{state.logoStyle=sel.value;persist()});row.append(sel)}
 return row}
function renderParts(){const mount=$('parts-controls');if(!mount)return;mount.replaceChildren();mount.append(control('p',{className:'parts-intro'},'Each landing object can be enabled, disabled, recolored, and edited. Hero elements can be reordered. Changes update the actual page live.'));
 for(const [title,group] of [['HEADER','header'],['HERO SEQUENCE','hero'],['ACTIONS','cta'],['OUTSIDE THE GLASS','outside']]){const sec=control('details',{className:'parts-section'});sec.open=group==='hero';sec.append(control('summary',{},title));PARTS.filter(x=>x[2]===group).forEach(p=>sec.append(partRow(p)));mount.append(sec)}
 const add=control('section',{className:'parts-section'});add.append(control('h3',{},'Add your own component'),control('p',{},'A safe text-and-link glass card placed inside the hero. No arbitrary script execution.'));
 const fields=control('div',{className:'part-add-fields'});const name=control('input',{type:'text',placeholder:'Component label',maxlength:48,'aria-label':'New component text'});const href=control('input',{type:'text',placeholder:'explorer.html or https://...', 'aria-label':'Component link'});const btn=control('button',{type:'button',className:'part-add-btn'},'＋ Add component');btn.addEventListener('click',()=>{const v=href.value.trim()||'explorer.html';if(!name.value.trim()||!validLink(v)){alert('Enter a label and a safe http(s) or site link.');return}state.custom.push({id:'extra'+Date.now(),label:name.value.trim(),href:v,enabled:true,color:'#7cfbe2'});persist();renderParts()});fields.append(name,href,btn);add.append(fields);
 for(const entry of state.custom){const r=control('div',{className:'part-item'}),line=control('div',{className:'part-top'}),label=control('strong',{},entry.label);const b=control('button',{type:'button'},'Remove');b.addEventListener('click',()=>{state.custom=state.custom.filter(x=>x.id!==entry.id);persist();renderParts()});const box=control('input',{type:'checkbox','aria-label':'Enable '+entry.label});box.checked=entry.enabled;box.addEventListener('change',()=>{entry.enabled=box.checked;persist()});line.append(label,box,b);r.append(line);
 const edits=control('div',{className:'part-add-fields'});const text=control('input',{type:'text','aria-label':'Edit component label',maxlength:48}),url=control('input',{type:'text','aria-label':'Edit component link'}),color=control('input',{type:'color','aria-label':'Edit component color'});text.value=entry.label;url.value=entry.href;color.value=entry.color;text.addEventListener('input',()=>{entry.label=text.value.slice(0,48);persist()});url.addEventListener('change',()=>{if(validLink(url.value)){entry.href=url.value;persist()}else{url.value=entry.href;message('Invalid link.')}});color.addEventListener('input',()=>{entry.color=color.value;persist()});edits.append(text,url,color);r.append(edits);add.append(r)}mount.append(add);
 const tools=control('div',{className:'part-inline-tools'});const copy=control('button',{type:'button'},'Copy preset code');copy.addEventListener('click',()=>{const v=JSON.stringify({format:'binbol.site-preset.v1',theme:getTheme(),layout:state},null,2);navigator.clipboard?.writeText(v).then(()=>message('Preset code copied.')).catch(()=>{prompt('Copy preset code',v)})});const reset=control('button',{type:'button'},'Reset layout');reset.addEventListener('click',()=>{state=DEFAULT();persist();renderParts()});tools.append(copy,reset);mount.append(tools);
}
function message(v){const el=$('settings-status');if(el)el.textContent=v}
function getTheme(){try{return JSON.parse(localStorage.getItem('binbol:landing:v02')||'{}')}catch{return {}}}
function saveAs(name){const raw=safeGet(savedKey);let all={};try{all=JSON.parse(raw||'{}')}catch{} all[name]=JSON.parse(JSON.stringify(state));safeSet(savedKey,JSON.stringify(all))}
function loadNamed(name){try{const data=JSON.parse(safeGet(savedKey)||'{}')[name];if(data){state=validate(data);persist();renderParts()}}catch{}}
function deleteNamed(name){try{const all=JSON.parse(safeGet(savedKey)||'{}');delete all[name];safeSet(savedKey,JSON.stringify(all))}catch{}}
function download(name,txt,mime='application/json'){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([txt],{type:mime}));a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500)}
function exportPreset(){download('BinBol-full-preset.json',JSON.stringify({format:'binbol.site-preset.v1',version:1,theme:getTheme(),layout:state},null,2));message('Full preset exported (theme + components).')}
function importPreset(v){if(v?.format==='binbol.site-preset.v1'&&v.layout){state=validate(v.layout);persist();renderParts();if(v.theme)localStorage.setItem('binbol:landing:v02',JSON.stringify(v.theme));location.reload();return true}if(v?.format==='binbol.layout.v1'){state=validate(v);persist();renderParts();return true}return false}
function init(){apply(false);const tabs=document.querySelectorAll('[data-tab]');tabs.forEach(btn=>btn.addEventListener('click',()=>{const parts=btn.dataset.tab==='parts';const mount=$('parts-controls');mount.hidden=!parts;if(parts){renderParts();const controls=$('settings-controls');if(controls)controls.replaceChildren();}}));
 $('export-layout-json')?.addEventListener('click',exportPreset);
 $('import-json')?.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const obj=JSON.parse(await file.text());if(importPreset(obj)){message('Full site preset loaded.');e.stopImmediatePropagation()}}catch{}},true);
 $('open-dev-shortcut')?.addEventListener('click',()=>{location.href='dev.html'});
 const brand=document.querySelector('.brand');let count=0,last=0;brand?.addEventListener('click',e=>{e.preventDefault();const t=Date.now();if(t-last>2000)count=0;last=t;count++;if(count>=5){count=0;reveal()}});
 document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='b'){e.preventDefault();reveal()}if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==='s'){e.preventDefault();$('settings-open')?.click()}});
 function reveal(){document.body.classList.add('dev-preview');const devLink=document.querySelector('.studio-dev-entry');if(devLink)devLink.hidden=false;const existing=document.querySelector('.dev-pop');existing?.remove();const pop=control('div',{className:'dev-pop'});const a=control('a',{href:'dev.html'},'Open Component Library →');pop.append('Developer workspace unlocked · ',a);document.body.append(pop);setTimeout(()=>pop.remove(),6500)}
 // Local preview synchronization from the dev gallery editor; no network.
 window.addEventListener('storage',e=>{if(e.key===key){try{state=validate(JSON.parse(e.newValue||'{}'));apply(false)}catch{}}});
}
window.BinBolStudio={get:()=>JSON.parse(JSON.stringify(state)),set:v=>{state=validate(v);persist();renderParts()},reset:()=>{state=DEFAULT();persist();renderParts()},saveNamed:saveAs,loadNamed,deleteNamed,exportPreset,importPreset};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
