/* Binball site: a static, dependency-free visual research frontend.
   Counts are theoretical displayed token counts, never storage claims. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const number = (value) => Number(value).toLocaleString('en-US');
  const glyphHigh = ['✧','◈','⌬','◇','⟐','⊕','⋈','⌘','⌁','⟡','◉','⊗','△','❖','☽','⧉'];
  const glyphLow  = ['·','˙','°','⁺','×','⌃','~','∗','⌄','˚','–','○','⁕','˟','ː','†'];
  const projects = [
    {id:'tetris', name:'Tetris (Game Boy)', emoji:'▦', size:'32 KiB', bytes:32768, description:'1989 Game Boy cartridge-size example'},
    {id:'mario', name:'Super Mario Land', emoji:'★', size:'64 KiB', bytes:65536, description:'1989 Game Boy cartridge-size example'},
    {id:'pokemon', name:'Pokémon Red', emoji:'◉', size:'1 MiB', bytes:1048576, description:'Game Boy cartridge-size example'},
    {id:'apollo', name:'Apollo AGC · fixed rope', emoji:'☾', size:'72 KiB', bytes:36864*2, description:'36,864 words × 16 bits, including parity'},
    {id:'linux', name:'Linux 7.3 kernel', emoji:'⌘', size:'30.96M LOC', bytes:null, description:'Code-line count only; source byte size not measured'}
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
  function initBinaryLogo() {
    const target = $('binary-word');
    if (!target) return;
    const shapes = [
      ['111111100','110000110','110000110','110000110','111111100','110000110','110000110','110000110','110000110','111111100','000000000'],
      ['00110','00110','00000','00110','00110','00110','00110','00110','00110','00110','00110'],
      ['000000000','000000000','110111100','111000110','110000110','110000110','110000110','110000110','110000110','110000110','110000110']
    ];
    shapes.forEach((rows, letterIndex) => {
      const letter = document.createElement('div');
      letter.className = 'binary-letter';
      rows.forEach((pattern, rowIndex) => {
        const line = document.createElement('span');
        let out = '';
        for (let i = 0; i < pattern.length; i++) {
          out += pattern[i] === '1' ? ((i * 3 + rowIndex + letterIndex) % 4 < 2 ? '0' : '1') : ' ';
        }
        line.textContent = out;
        letter.append(line);
      });
      target.append(letter);
    });
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
        name.querySelector('b').textContent=project.name;
        const size=document.createElement('td');size.textContent=project.size;
        const binary=document.createElement('td');binary.textContent=project.bytes===null?'—':number(project.bytes*8);
        const symbols=document.createElement('td');symbols.textContent=project.bytes===null?'—':number(Math.ceil(project.bytes*8/getWidth()));
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
        'Linux metric is a count of code lines, not binary bytes. To calculate tokens, first measure a specific source archive or file.':
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
    initGamma();redrawMessage();update();
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
    }
    function setText(id,v){const el=$(id);if(el)el.textContent=v;}
    function stopAnimation(){if(animation!==null){clearInterval(animation);animation=null;}setText('gamma-play','▶ Animate');}
    $('gamma-zero').addEventListener('click',()=>{stopAnimation();setValue(0);});
    $('gamma-max').addEventListener('click',()=>{stopAnimation();setValue(255);});
    $('gamma-random').addEventListener('click',()=>{stopAnimation();setValue(Math.floor(Math.random()*256));});
    slider.addEventListener('input',e=>setValue(e.target.value));
    $('gamma-play').addEventListener('click',()=>{
      if(animation!==null){stopAnimation();return;}
      setText('gamma-play','Ⅱ Pause');
      animation=setInterval(()=>setValue((value+1)&255),95);
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAnimation();});
    setValue(value);
  }
  if($('copyright-year'))$('copyright-year').textContent=new Date().getFullYear();
  initBinaryLogo();initRain();initExplorer();
})();
