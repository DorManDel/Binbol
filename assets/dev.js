/* Original, lightweight demonstrations inspired by the named references. Not copies of their code. */
(() => {
'use strict';
const links={catalog:'https://freedesignmd.com/components',matrix:'https://matrix.logic-wire.de/',slider:'https://freedesignmd.com/components/glass-slider',liquid:'https://freedesignmd.com/components#cat-liquid-metal',dither:'https://freedesignmd.com/r/dither-logo.json',capsule:'https://freedesignmd.com/r/floating-capsule-nav.json',booking:'https://freedesignmd.com/r/booking-nav.json',climate:'https://freedesignmd.com/r/hero-climate-data.json',spec:'https://freedesignmd.com/r/spec-sheet.json',hover:'https://freedesignmd.com/r/hover-transitions.json',reveal:'https://freedesignmd.com/r/text-reveal-scroll.json',stats:'https://freedesignmd.com/components/count-up-stats'};
const mechanics=[
{id:'matrix',name:'Matrix Master / Digital Rain',status:'used',role:'Animated background of 0/1 and BinBol glyphs.',type:'matrix',link:links.matrix,note:'Inspired by its configurable rain direction, speed, zoom and palette.'},
{id:'glass',name:'Liquid Glass Surface',status:'used',role:'Landing glass container, dialogs and buttons.',type:'glass',link:links.slider,note:'Current BinBol version uses CSS blur/highlights; optical refraction not yet implemented.'},
{id:'hover',name:'Hover Transitions',status:'used',role:'Reveal outlines and spotlights on CTAs.',type:'hover',link:links.hover,note:'Our custom spotlight demo is implemented; no external React package installed.'},
{id:'capsule',name:'Floating Capsule Navigation',status:'used',role:'Main responsive navigation.',type:'capsule',link:links.capsule,note:'BinBol-built compact floating capsule inspired by the reference.'},
{id:'glass-slider',name:'Glass Slider',status:'prototype',role:'Reusable tactile sliders in Settings and Gamma.',type:'slider',link:links.slider,note:'Visual interactive prototype here; existing Settings use native range sliders.'},
{id:'dither',name:'Dither Logo',status:'prototype',role:'Bit → glyph logo entrance / pointer response.',type:'dither',link:links.dither,note:'Mini dot-mask reaction is illustrative, not the original WebGL shader.'},
{id:'liquid-metal',name:'Liquid Metal',status:'prototype',role:'Limited accents for active states.',type:'liquid',link:links.liquid,note:'Avoid overuse and expensive effects on mobile.'},
{id:'stats',name:'Count-up Stats',status:'prototype',role:'Animate exact counts in Project Explorer.',type:'stats',link:links.stats,note:'Demonstration only; data must come from measurements.'},
{id:'spec',name:'Spec Sheet',status:'prototype',role:'Inspector for bit fields, encoding and file metrics.',type:'spec',link:links.spec,note:'A compact reference visualization, not imported React code.'},
{id:'booking',name:'Booking Nav',status:'planned',role:'Alternative panel/navigation progression.',type:'booking',link:links.booking,note:'Reference concept only; keep currently working capsule nav until tested.'},
{id:'climate',name:'Hero Climate Data',status:'planned',role:'Dense but legible live-looking information panels.',type:'climate',link:links.climate,note:'Illustrative demo numbers, never passed off as measurements.'},
{id:'reveal',name:'Text Reveal on Scroll',status:'planned',role:'Reveal the meaning of encoding in guided lessons.',type:'reveal',link:links.reveal,note:'Use sparingly to avoid scroll-heavy mobile pages.'},
{id:'magnetic',name:'Magnetic Cursor Grid',status:'planned',role:'Project gallery tiles with subtle cursor attraction.',type:'magnetic',link:links.catalog,note:'Shown in your screenshot; linked to the shared components catalog.'},
{id:'horizontal',name:'Horizontal Pin Gallery',status:'planned',role:'Explore archived game / project comparisons.',type:'horizontal',link:links.catalog,note:'Screenshot reference; prefer explicit arrows on mobile.'},
{id:'marquee',name:'Velocity Marquee',status:'planned',role:'Optional activity strip, not essential information.',type:'marquee',link:links.catalog,note:'Screenshot reference; velocity-driven effect is not yet implemented.'},
{id:'zoom',name:'Zoom Parallax',status:'planned',role:'Project-to-detail scene transition.',type:'zoom',link:links.catalog,note:'Screenshot reference; this preview demonstrates only scale depth.'},
{id:'tabs',name:'Floating / Glass Tab Bar',status:'planned',role:'Unified mobile lab navigation.',type:'tabs',link:links.catalog,note:'Design concept based on supplied navigation references.'}
];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function mini(type){switch(type){
 case 'matrix':return '<pre class="mini-rain">010  101  110\n1 0  0 1  10\n◇ 1  0  ◈  1\n0 1  101  10</pre>';
 case 'glass':return '<div class="glow-button" style="backdrop-filter:blur(15px);box-shadow:inset 0 1px 3px #ffffff73,0 0 24px #4cffe140">Glass surface ✧</div><small>Move cursor to reveal highlight</small>';
 case 'hover':return '<button class="glow-button">Reveal the outline →</button>';
 case 'capsule':return '<div class="pill-nav"><button class="active">Home</button><button>Lab</button><button>Research</button></div>';
 case 'slider':return '<div class="demo-knob">◈</div><input class="demo-range" type="range" value="24" aria-label="Glass slider demonstration" min="0" max="100"><small>Drag to move the glass knob</small>';
 case 'dither':return '<div class="dot-grid" aria-label="Pointer-reactive dither dots"></div><small>Hover / tap the dots</small>';
 case 'liquid':return '<div class="liquid-metal">Liquid metal</div>';
 case 'stats':return '<div class="demo-stat" data-target="65536">0</div><small>Possible 16-bit values</small>';
 case 'spec':return '<div class="demo-spec"><span>Width</span><b>16-bit</b><span>States</span><b>65,536</b><span>Display mode</span><b>Glyph</b></div>';
 case 'booking':return '<div class="pill-nav"><button class="active">01 Choose</button><button>02 Preview</button><button>03 Build</button></div>';
 case 'climate':return '<div class="climate"><div><small>EXAMPLE · NOT LIVE</small><br><strong>16</strong><small> bits / token</small></div><div><small>STATES</small><br><strong>65k</strong></div></div>';
 case 'reveal':return '<div class="reveal-line">From <span>Binary</span> to Symbol<br>One representation. Many views.</div>';
 case 'magnetic':return '<div class="demo-tile-row"><div class="demo-tile">◈</div><div class="demo-tile">⌘</div><div class="demo-tile">◇</div><div class="demo-tile">⊕</div></div>';
 case 'horizontal':return '<div class="gallery"><i>01</i><i>02</i><i>03</i></div><small>Click Try it to browse</small>';
 case 'marquee':return '<div class="marquee">BINBOL ◈ FROM BINARY TO SYMBOL ◈ BINBOL ◈ FROM BINARY TO SYMBOL ◈ </div>';
 case 'zoom':return '<div class="zoom-frame"></div><small>Hover to zoom</small>';
 case 'tabs':return '<div class="panel-tabs"><button class="active">Explore</button><button>Mechanics</button><button>Forge</button></div>';
 default:return '<div class="data-matrix"></div>';
}}
function card(item){const el=document.createElement('article');el.className='mechanic-card';el.dataset.status=item.status;
 el.innerHTML=`<div class="mechanic-card-head"><div class="meta"><span>MECHANIC / ${escapeHtml(item.id)}</span><span class="badge ${item.status}">${escapeHtml(item.status)}</span></div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.role)}</p></div><div class="mini-demo" data-demo="${escapeHtml(item.type)}">${mini(item.type)}</div><footer><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(item.note)}">Original reference ↗</a><button type="button" title="${escapeHtml(item.note)}">Try it ↻</button></footer>`;
 const area=el.querySelector('.mini-demo');setupDemo(area,el.querySelector('footer button'));
 const small=document.createElement('p');small.style.cssText='font-size:10px;color:#8ab6bb;padding:0 15px 12px;margin:0';small.textContent=item.note;el.insertBefore(small,el.querySelector('footer'));return el;
}
function setupDemo(area,trigger){const type=area.dataset.demo;
 if(type==='dither'){const grid=area.querySelector('.dot-grid');for(let i=0;i<96;i++){const dot=document.createElement('i');if(i%12<2||i%12>9||Math.floor(i/12)<2||Math.floor(i/12)>5)dot.style.opacity='.12';grid.append(dot)}grid.addEventListener('pointermove',e=>{for(const dot of grid.children){const a=dot.getBoundingClientRect(),dx=e.clientX-a.left,dy=e.clientY-a.top,dist=Math.hypot(dx,dy);dot.style.transform=`translate(${dist<30?dx/-5:0}px,${dist<30?dy/-5:0}px)`;}});grid.addEventListener('pointerleave',()=>[...grid.children].forEach(d=>d.style.transform=''));}
 if(type==='slider'){const slider=area.querySelector('input'),knob=area.querySelector('.demo-knob');const update=()=>knob.style.left=`calc(17% + ${Number(slider.value)*.38}%)`;slider.addEventListener('input',update);update();}
 if(['capsule','booking','tabs'].includes(type)){area.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{area.querySelector('.active')?.classList.remove('active');b.classList.add('active')}));}
 if(['hover','glass'].includes(type)){const t=area.querySelector('.glow-button');t?.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect();t.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%')});}
 if(type==='stats'){const out=area.querySelector('.demo-stat');trigger.onclick=()=>{let n=0;const id=setInterval(()=>{n+=4096;out.textContent=n.toLocaleString();if(n>=65536)clearInterval(id)},25)}}
 if(type==='horizontal'){const items=[...area.querySelectorAll('.gallery i')];let p=0;trigger.onclick=()=>{p=(p+1)%8;items.forEach((n,i)=>n.textContent=String(p+i+1).padStart(2,'0'))}}
 if(type==='matrix'){let v=0;trigger.onclick=()=>{const pre=area.querySelector('pre');pre.textContent=['01 100 ◈ 101\n10 010 0 1\n0 ◇ 001 10\n111 00 1 0','101 001 00\n0 0 ◈ 11\n1 110 ◇ 0\n0011 0101'][++v%2]}}
 if(type==='magnetic'){const tiles=area.querySelectorAll('.demo-tile');tiles.forEach(t=>t.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect();t.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));tiles.forEach(t=>t.addEventListener('pointerleave',()=>t.style.transform=''));}
 if(type==='reveal'){let r=0;trigger.onclick=()=>{area.querySelector('.reveal-line').innerHTML=(++r%2)?'Bits <span>become symbols.</span><br>Meaning remains.':'From <span>Binary</span> to Symbol<br>One representation. Many views.'}}
 if(['glass','hover','capsule','booking','tabs','slider','dither','liquid','zoom','magnetic','marquee'].includes(type)){trigger.onclick=()=>{area.classList.toggle('demo-active');if(type==='slider'){const s=area.querySelector('input');s.value=100-Number(s.value);s.dispatchEvent(new Event('input'))}else if(type==='dither'){for(const d of area.querySelector('.dot-grid').children)d.style.opacity=Math.random()>.55?'.2':'1'}else if(type==='capsule'||type==='tabs'||type==='booking'){const buttons=[...area.querySelectorAll('button')],idx=buttons.findIndex(x=>x.classList.contains('active'));buttons[(idx+1)%buttons.length].click()}else{area.style.filter=area.classList.contains('demo-active')?'hue-rotate(32deg) brightness(1.2)':''}}}
}
function init(){const mount=document.getElementById('catalog-grid');mechanics.forEach(x=>mount.append(card(x)));const chrome=document.getElementById('preview-chrome');document.getElementById('preview-mobile').addEventListener('click',()=>{chrome.classList.add('mobile');document.getElementById('preview-mobile').classList.add('sel');document.getElementById('preview-desktop').classList.remove('sel')});document.getElementById('preview-desktop').addEventListener('click',()=>{chrome.classList.remove('mobile');document.getElementById('preview-desktop').classList.add('sel');document.getElementById('preview-mobile').classList.remove('sel')});document.getElementById('open-appearance').addEventListener('click',()=>{try{document.getElementById('site-preview').contentWindow.document.getElementById('settings-open').click();chrome.scrollIntoView({behavior:'smooth'});}catch{window.open('index.html','_blank')}});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const s=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('sel',x===b));mount.querySelectorAll('.mechanic-card').forEach(x=>x.hidden=s!=='all'&&x.dataset.status!==s);}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
