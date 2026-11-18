/* Binball site: a static, dependency-free visual research frontend.
   Counts are theoretical displayed token counts, never storage claims. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const number = (value) => Number(value).toLocaleString('en-US');
  const compact = (v) => v>=1e9?(v/1e9).toFixed(2)+'B':v>=1e6?(v/1e6).toFixed(2)+'M':v>=1e3?(v/1e3).toFixed(v<1e4?1:0)+'K':String(v);
  const glyphHigh = ['✧','◈','⌬','◇','⟐','⊕','⋈','⌘','⌁','⟡','◉','⊗','△','❖','☽','⧉'];
  const glyphLow  = ['·','˙','°','⁺','×','⌃','~','∗','⌄','˚','–','○','⁕','˟','ː','†'];
  const projects = [
    {id:'tetris', name:'Tetris (Game Boy)', emoji:'▦', size:'32 KiB', bytes:32768, description:'1989 Game Boy cartridge-size example'},
    {id:'mario', name:'Super Mario Land', emoji:'★', size:'64 KiB', bytes:65536, description:'1989 Game Boy cartridge-size example'},
    {id:'pokemon', name:'Pokémon Red', emoji:'◉', size:'1 MiB', bytes:1048576, description:'Game Boy cartridge-size example'},
    {id:'apollo', name:'Apollo AGC · fixed rope', emoji:'☾', size:'72 KiB', bytes:36864*2, description:'36,864 words × 16 bits, including parity'},
    {id:'linux', name:'Linux 7.3 · .tar.xz', short:'Linux 7.3', emoji:'⌘', size:'154.88 MiB', bytes:162399360, description:'Measured .tar.xz compressed archive (162,399,360 bytes), NOT the uncompressed source. Linux 7.3 has approximately 30.96 million detected code lines; no Linux Binball-dictionary benchmark has been run.'}
  ];
  function createTile(value, small = false) {
    const el = document.createElement('span');
    el.className = 'glyph-tile' + (small ? ' tiny' : '');
    el.title = `Byte ${value} (0x${value.toString(16).padStart(2, '0').toUpperCase()})`;
    const primary = document.createElement('span');
    primary.className = 'glyph-primary';
    primary.textContent = glyphHigh[value >> 4];
    const secondary = document.createElement('span');
    secondary.className = 'glyph-secondary';
    secondary.textContent = glyphLow[value & 15];
    el.append(primary, secondary);
    return el;
  }
  // Each filled position of B, i, n cycles that letter's actual ASCII bits.
  // Repeated bits are a typographic pattern; each letter's exact 8-bit code is shown separately.
  function initBinaryLogo() {
    const target = $('binary-word'); if (!target) return;
    const letters = [
      {code:'01000010', x:0, rows:['11111110','11000111','11000011','11000111','11111110','11000111','11000011','11000111','11111110']},
      {code:'01101001', x:94, rows:['00100','00100','00000','01100','01100','01100','01100','01100','01100']},
      {code:'01101110', x:160, rows:['00000000','00000000','11011110','11100111','11000011','11000011','11000011','11000011','11000011']}
    ];
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 264 112');
    svg.setAttribute('preserveAspectRatio','xMidYMid meet');svg.setAttribute('class','binary-logo-svg');
    svg.setAttribute('role','img');svg.setAttribute('aria-label','Bin built from real ASCII bits: B 01000010, i 01101001, n 01101110');
    letters.forEach(letter=>{
      let index=0;
      letter.rows.forEach((line,y)=>Array.from(line).forEach((mask,x)=>{
        if(mask!=='1')return;
        const t=document.createElementNS(ns,'text');
        t.setAttribute('x',String(letter.x+x*11.8));t.setAttribute('y',String(16+y*11.7));
        t.setAttribute('class','binary-digit');t.textContent=letter.code[index++%8];svg.append(t);
      }));
    });
    target.replaceChildren(svg);
  }
  const markPaths=[
    'M50 8 L83 27 L83 69 L50 90 L17 69 L17 27 Z M50 8 V90 M17 27 L83 69',
    'M50 7 L88 50 L50 93 L12 50 Z M50 27 L70 50 L50 73 L30 50 Z',
    'M16 20 C61 6 94 37 84 63 C77 88 40 101 18 70 C47 82 72 60 61 38 C51 20 37 18 16 20 Z',
    'M50 6 L60 38 L93 50 L60 61 L50 94 L39 61 L7 50 L39 38 Z',
    'M15 25 L50 9 L85 25 L65 49 L85 74 L50 92 L15 74 L35 49 Z M50 9 V92',
    'M18 19 L82 19 L18 81 L82 81 M50 10 L50 90',
    'M15 55 Q30 8 49 55 T85 55 M15 78 Q30 31 49 78 T85 78',
    'M20 12 V88 M80 12 V88 M20 27 L80 73 M80 27 L20 73',
    'M50 8 L88 37 L63 54 L84 83 L50 94 L16 83 L37 54 L12 37 Z',
    'M15 80 L15 37 Q50 -5 85 37 L85 80 M30 80 L30 44 Q50 22 70 44 L70 80',
    'M50 50 C80 15 104 50 79 74 C59 100 11 78 20 43 C29 8 73 14 69 46 C64 74 38 73 39 53',
    'M14 50 L38 16 L62 50 L86 16 M14 84 L38 50 L62 84 L86 50',
    'M50 9 L86 83 L14 83 Z M50 31 L69 70 L31 70 Z',
    'M14 26 L86 26 L86 45 L14 45 Z M14 63 L86 63 L86 82 L14 82 Z',
    'M50 7 C70 21 70 41 50 50 C30 59 30 79 50 93 M50 7 C30 21 30 41 50 50 C70 59 70 79 50 93',
    'M50 8 L85 28 L74 69 L50 91 L26 69 L15 28 Z M15 28 L85 28 M26 69 L74 69'
  ];
  const spectrum=['#ff695e','#ffa157','#ffd05a','#f2ec6c','#b8ee6c','#67e7a1','#4ce8ce','#48dbef','#6bc5ff','#849aff','#a58aff','#cf83f5','#f27dcf','#f184aa','#ad6aff','#ffffff'];
  const luminance=Array.from({length:16},(_,i)=>{const v=Math.round(52+i*12);return '#'+[v,v,v].map(x=>x.toString(16).padStart(2,'0')).join('');});
  function getVisualColor(index){return (($('glyph-palette-type')?.value)==='luminance'?luminance:spectrum)[index];}
  function createNativeGlyph(value,small=false) {
    const wrapper=document.createElement('span');wrapper.className='native-glyph'+(small?' small':'');
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 100 100');
    svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',markPaths[value>>4]);path.setAttribute('fill','none');
    path.setAttribute('stroke',getVisualColor(value&15));path.setAttribute('stroke-width','4.8');
    path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');
    svg.append(path);wrapper.append(svg);
    wrapper.title=`Value ${value}: shape ${value>>4}, color ${value&15}`;
    wrapper.setAttribute('role','img');wrapper.setAttribute('aria-label',wrapper.title);
    return wrapper;
  }
  function initFeaturePager(){
    const cards=Array.from(document.querySelectorAll('.feature-card'));if(!cards.length)return;
    let active=0;
    const display=()=>{cards.forEach((card,index)=>card.classList.toggle('mobile-feature-active',index===active));
      const t=$('feature-current');if(t)t.textContent=`${active+1} / ${cards.length}`;};
    $('feature-prev')?.addEventListener('click',()=>{active=(active+cards.length-1)%cards.length;display();});
    $('feature-next')?.addEventListener('click',()=>{active=(active+1)%cards.length;display();});display();
  }
  function initRain() {
    const canvas = $('symbol-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const symbols = '01◇✧⋈⌁◈⊕01⌬⋄⟡10';
    let columns = [], width = 0, height = 0, cell = 35, lastFrame = 0, request = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.ceil(width * dpr);canvas.height = Math.ceil(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = width < 650 ? 27 : 37;
      columns = Array.from({length: Math.ceil(width / cell)}, (_, i) => ({
        x: i * cell + Math.random()*10, y: Math.random()*height,
        speed: 11 + Math.random()*30, tail: 4 + Math.floor(Math.random()*6),
        tint: Math.random() < .14 ? 275 : (Math.random() < .2 ? 180 : 153)
      }));
    }
    function draw(now) {
      request = window.requestAnimationFrame(draw);
      if (document.hidden || now-lastFrame<33) return;
      const dt = Math.min((now-lastFrame || 33)/1000,.065);lastFrame=now;
      ctx.fillStyle='rgba(2,11,16,.17)';ctx.fillRect(0,0,width,height);
      ctx.font = `${width < 650 ? 15 : 17}px ui-monospace, monospace`;
      for(const c of columns) {
        c.y += c.speed*dt;
        if(c.y > height+100)c.y=-c.tail*23;
        for(let j=0;j<c.tail;j++){
          const y=c.y-j*23;
          if(y<0||y>height)continue;
          const alpha=(1-j/c.tail)*(.2+(.25*Math.sin(now/1800+c.x))**2);
          ctx.fillStyle=`hsla(${c.tint},100%,${j===0?70:55}%,${alpha.toFixed(3)})`;
          const pos=(Math.floor(now/230)+j*5+Math.floor(c.x))%symbols.length;
          ctx.fillText(symbols[pos],c.x,y);
        }
      }
    }
    function onPreferenceChange() {
      if (request) window.cancelAnimationFrame(request);
      ctx.clearRect(0,0,width,height);
      if (!reduceMotion.matches) {lastFrame=0;request=window.requestAnimationFrame(draw);}
      else {
        ctx.fillStyle='rgba(72,215,194,.18)';ctx.font='14px monospace';
        columns.forEach((c,i)=>ctx.fillText(symbols[i%symbols.length],c.x,(i*97)%height));
      }
    }
    resize();onPreferenceChange();
    window.addEventListener('resize',()=>{resize();onPreferenceChange();},{passive:true});
    if(reduceMotion.addEventListener)reduceMotion.addEventListener('change',onPreferenceChange);
  }
  function initExplorer() {
    const rows = $('project-rows');if(!rows)return;
    const select = $('project-select'); const slider = $('width-slider');
    const message = $('message-input');let customBytes=0;let customLabel='Custom message';
    function selected(){return select.value==='custom'?{id:'custom',name:customLabel,size:`${customBytes} B`,bytes:customBytes,description:`Local sample: ${customLabel}`}:projects.find(p=>p.id===select.value)||projects[2];}
    function getWidth(){return Number(slider.value);}
    function setLabel(element,text){if(element)element.textContent=text;}
    function redrawTable() {
      rows.replaceChildren();
      for(const project of projects){
        const tr = document.createElement('tr');tr.tabIndex=0;tr.setAttribute('aria-label',`Select ${project.name}`);
        if(project.id===select.value)tr.className='selected';
        const name=document.createElement('td');name.innerHTML=`<span class="project-name"><span class="project-emoji" aria-hidden="true">${project.emoji}</span><b></b></span>`;
        name.querySelector('b').textContent=project.short||project.name;name.title=project.name;
        const size=document.createElement('td');size.textContent=project.size;size.dataset.short=project.id==='linux'?'154.9MiB':project.size.replace(' ','');
        const binary=document.createElement('td');binary.textContent=project.bytes===null?'—':number(project.bytes*8);binary.dataset.short=project.bytes===null?'—':compact(project.bytes*8);binary.title=binary.textContent;
        const symbols=document.createElement('td');symbols.textContent=project.bytes===null?'—':number(Math.ceil(project.bytes*8/getWidth()));symbols.dataset.short=project.bytes===null?'—':compact(Math.ceil(project.bytes*8/getWidth()));symbols.title=symbols.textContent;
        if(project.bytes===null){binary.className='not-available';symbols.className='not-available';}
        tr.append(name,size,binary,symbols);
        const activate=()=>{select.value=project.id;update();};
        tr.addEventListener('click',activate);
        tr.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
        rows.append(tr);
      }
    }
    function redrawSymbols(){
      const target=$('symbol-preview');target.replaceChildren();
      const seed=[0x42,0x69,0x6e,0x62,0x6f,0x6c];
      seed.slice(0,5).forEach(v=>target.append(createTile(v,true)));
    }
    function update() {
      const width=getWidth();const project=selected();const count=project.bytes===null?null:project.bytes*8;
      redrawTable();redrawSymbols();
      setLabel($('width-indicator'),`${width} bits · ${number(2**width)} states`);
      setLabel($('binary-count'),count===null?'Not measured':number(count));
      setLabel($('byte-count'),project.bytes===null?'Not measured':number(project.bytes));
      setLabel($('symbol-count'),count===null?'Not measured':number(Math.ceil(count/width)));
      setLabel($('visual-ratio'),count===null?'Needs measured source bytes':`${width}× fewer than binary digits`);
      $('symbol-meter').style.width=`${100/width}%`;
      setLabel($('explorer-note'),project.bytes===null?
        'Only source-line counts are available. To calculate source tokens, measure the raw source bytes first.':
        `${project.description}. The symbol count is an idealized ${width}-bit token model; preview glyphs illustrate the 8-bit alphabet only. It does not measure storage or actual compressed size.`);
    }
    select.addEventListener('change',update);slider.addEventListener('input',update);
    document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
      const mode=button.dataset.mode;document.body.classList.remove('mode-binary','mode-symbols','mode-compare');document.body.classList.add(`mode-${mode}`);
      document.querySelectorAll('[data-mode]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    }));
    function redrawMessage() {
      const bytes=new TextEncoder().encode(message.value);customBytes=bytes.length;
      setLabel($('message-bytes'),number(bytes.length));setLabel($('message-digits'),number(bytes.length*8));setLabel($('message-tokens'),number(bytes.length));
      const target=$('message-glyphs');target.replaceChildren();
      bytes.slice(0,64).forEach(b=>target.append(createTile(b,false)));
      if(bytes.length>64){const extra=document.createElement('span');extra.className='panel-footnote';extra.textContent=`+${number(bytes.length-64)} more tiles`;target.append(extra);}
      if(select.value==='custom')update();
    }
    message.addEventListener('input',()=>{customLabel='Custom message';redrawMessage();});
    const fileInput=$('file-input');
    if(fileInput){fileInput.addEventListener('change',()=>{
      const file=fileInput.files?.[0];if(!file)return;
      customBytes=file.size;customLabel=file.name;
      select.value='custom';
      $('file-feedback').textContent=`${file.name} · ${number(file.size)} bytes · local size only`;
      update();
    });}
    initGamma();initGlyphLab();initMobileScenes();redrawMessage();update();
  }
  function initGamma() {
    const slider=$('gamma-slider');if(!slider)return;
    const grid=$('states-grid');const bitsContainer=$('gamma-bits');
    let value=78;let animation=null;
    const buttons=[];
    for(let bit=7;bit>=0;bit--){
      const button=document.createElement('button');button.type='button';button.className='bit-button';
      button.title=`Toggle bit ${bit} (value ${2**bit})`;
      button.setAttribute('aria-label',`Toggle bit ${bit}`);
      button.addEventListener('click',()=>setValue(value^(1<<bit)));bitsContainer.append(button);buttons.push(button);
    }
    for(let n=0;n<256;n++){
      const button=document.createElement('button');button.type='button';button.className='state-square';
      button.style.setProperty('--hue',String(158+(n/255)*116));button.title=`${n} · 0b${n.toString(2).padStart(8,'0')}`;
      button.setAttribute('role','gridcell');button.setAttribute('aria-label',`Select ${n}`);
      button.addEventListener('click',()=>setValue(n));grid.append(button);
    }
    const squares=Array.from(grid.children);
    function setValue(next){
      value=Math.max(0,Math.min(255,Number(next)|0));slider.value=String(value);
      const bin=value.toString(2).padStart(8,'0');
      setText('gamma-value',value);setText('gamma-binary',bin);setText('gamma-hex','0x'+value.toString(16).padStart(2,'0').toUpperCase());setText('gamma-decimal',value);
      setText('state-label',`STATE ${String(value).padStart(3,'0')} / 255`);
      buttons.forEach((button,index)=>{const active=bin[index]==='1';button.textContent=bin[index];button.classList.toggle('on',active);button.setAttribute('aria-pressed',String(active));});
      squares.forEach((square,index)=>{square.classList.toggle('selected',index===value);square.setAttribute('aria-selected',String(index===value));});
      const tile=$('gamma-tile');tile.replaceChildren(createTile(value));tile.setAttribute('aria-label',`Visual tile for ${value}: ${bin}`);
      $('gamma-native-glyph')?.replaceChildren(createNativeGlyph(value));
      document.dispatchEvent(new CustomEvent('binball:bytechange',{detail:value}));
    }
    function setText(id,v){const el=$(id);if(el)el.textContent=v;}
    function stopAnimation(){if(animation!==null){clearInterval(animation);animation=null;}setText('gamma-play','▶ Animate');}
    $('gamma-zero').addEventListener('click',()=>{stopAnimation();setValue(0);});
    $('gamma-max').addEventListener('click',()=>{stopAnimation();setValue(255);});
    $('gamma-random').addEventListener('click',()=>{stopAnimation();setValue(Math.floor(Math.random()*256));});
    slider.addEventListener('input',e=>{stopAnimation();setValue(e.target.value);});
    $('gamma-play').addEventListener('click',()=>{
      if(animation!==null){stopAnimation();return;}
      setText('gamma-play','Ⅱ Pause');
      animation=setInterval(()=>setValue((value+1)&255),95);
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAnimation();});
    const statesToggle=$('states-toggle');
    statesToggle?.addEventListener('click',()=>{const open=document.body.classList.toggle('states-open');statesToggle.setAttribute('aria-expanded',String(open));statesToggle.textContent=open?'Hide 256-state map ▴':'256-state map ▾';});
    setValue(value);
  }
  function initGlyphLab(){
    const shapes=$('shape-select');if(!shapes)return;
    let value=78;
    for(let i=0;i<16;i++){const o=document.createElement('option');o.value=String(i);o.textContent=`${i.toString(16).toUpperCase()} · ${['Hex','Diamond','Crescent','Spark','Crest','Zigzag','Wave','Cross','Rune','Arch','Spiral','Twin','Triangle','Parallel','Orbits','Shield'][i]}`;shapes.append(o);}
    const colors=$('glyph-colors');
    for(let i=0;i<16;i++){
      const b=document.createElement('button');b.type='button';b.className='color-choice';b.title=`Color index ${i}`;
      b.setAttribute('aria-label',`Select color index ${i}`);b.style.setProperty('--swatch',spectrum[i]);
      b.addEventListener('click',()=>setLabValue((value&240)+i,true));colors.append(b);
    }
    function setText(id,v){const el=$(id);if(el)el.textContent=v;}
    function setLabValue(next,sync){
      value=Number(next)&255;const hi=value>>4,lo=value&15;
      shapes.value=String(hi);setText('color-index',`${lo} / 15`);
      setText('shape-label',`Shape ${hi}`);setText('color-label',`Color ${lo}`);
      setText('glyph-decimal',String(value));setText('glyph-state',String(value));
      setText('glyph-binary',value.toString(2).padStart(8,'0').replace(/(.{4})/,'$1 '));
      const palette=$('glyph-palette-type').value;
      [...colors.children].forEach((b,i)=>{b.classList.toggle('selected',i===lo);b.setAttribute('aria-pressed',String(i===lo));b.style.setProperty('--swatch',(palette==='luminance'?luminance:spectrum)[i]);});
      $('glyph-stage-main').replaceChildren(createNativeGlyph(value));
      $('pure-swatch').replaceChildren(createNativeGlyph(value));
      $('classic-swatch').replaceChildren(createTile(value));
      if(sync){const gamma=$('gamma-slider');gamma.value=String(value);gamma.dispatchEvent(new Event('input',{bubbles:true}));}
    }
    shapes.addEventListener('change',()=>setLabValue((Number(shapes.value)<<4)+(value&15),true));
    $('glyph-palette-type').addEventListener('change',()=>setLabValue(value,true));
    document.addEventListener('binball:bytechange',(e)=>setLabValue(e.detail,false));
    setLabValue(value,false);
  }
  function initMobileScenes(){
    const tabs=Array.from(document.querySelectorAll('[data-mobile-target]'));if(!tabs.length)return;
    const pages=['archive','compare','gamma','glyphs','message','research'];
    function show(name){const next=pages.includes(name)?name:'archive';document.body.dataset.mobileScreen=next;
      tabs.forEach(t=>{const active=t.dataset.mobileTarget===next;t.classList.toggle('active',active);t.setAttribute('aria-pressed',String(active));});
      if(window.matchMedia('(max-width: 760px)').matches)window.scrollTo({top:0,behavior:'instant'});
    }
    tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.mobileTarget)));
    const fromHash=()=>{if(location.hash==='#gamma')show('gamma');else if(location.hash==='#glyph-lab')show('glyphs');else if(location.hash==='#sources')show('research');};
    window.addEventListener('hashchange',fromHash);show('archive');fromHash();
  }
  if($('copyright-year'))$('copyright-year').textContent=new Date().getFullYear();
  initBinaryLogo();initFeaturePager();initRain();initExplorer();
})();
