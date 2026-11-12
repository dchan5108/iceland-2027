/* Iceland 2027 視覺：景點插畫徽章 + 倒數封面（純 SVG，無外部圖片） */
(function(){
let U=0;
const G='#c9a45c';
/* 徽章主題 */
const MOTIF={
  waterfall:{sky:['#cfe6f1','#f3eee2'],g:(s)=>`<path d="M0 60 L18 38 L40 46 L40 100 L0 100Z" fill="#4f7d6a"/><path d="M100 58 L82 36 L60 46 L60 100 L100 100Z" fill="#3f6b5c"/><rect x="38" y="44" width="24" height="5" fill="#59656b"/><path d="M42 49h16v32H42z" fill="#fff"/><path d="M47 49v32M53 49v30" stroke="#cfe3ee" stroke-width="1.5"/><ellipse cx="50" cy="84" rx="20" ry="6" fill="#8bb8cf"/><ellipse cx="50" cy="80" rx="12" ry="4" fill="#fff" opacity=".8"/>`},
  ice:{sky:['#d3e7f3','#eef5f8'],g:()=>`<rect y="62" width="100" height="40" fill="#5f97b5"/><path d="M0 62h100v6H0z" fill="#7fb0c9"/><path d="M22 66 36 42 46 52 58 30 72 54 80 66Z" fill="#fff"/><path d="M58 30 72 54 80 66 60 66Z" fill="#bcdcec"/><path d="M36 42 46 52 40 66 22 66Z" fill="#e6f2f8"/><path d="M30 76h40M38 84h26" stroke="#9cc6da" stroke-width="2" stroke-linecap="round"/>`},
  mountain:{sky:['#bcd9e6','#efe3cf'],g:()=>`<path d="M0 70 28 36 44 54 62 26 100 70Z" fill="#4a6580"/><path d="M62 26 52 42 58 40 62 46 68 40 74 44Z" fill="#fff"/><path d="M28 36 21 47 27 45 31 49 34 44Z" fill="#fff"/><path d="M0 100V74q30-12 50-2t50-4v32Z" fill="#7a9b7e"/>`},
  stack:{sky:['#d8dde0','#f1ebe0'],g:()=>`<rect y="58" width="100" height="42" fill="#6b9bb2"/><path d="M0 76q25-8 50 0t50 0v24H0Z" fill="#26343c"/><path d="M26 74 30 40 36 34 42 46 44 74Z" fill="#26343c"/><path d="M58 76 62 52 68 48 72 60 76 76Z" fill="#33454e"/><path d="M0 62q10 3 20 0t20 0 20 0 20 0 20 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".8"/>`},
  church:{sky:['#c9dfeb','#f2ece0'],g:()=>`<path d="M0 100V70q50-14 100 0v30Z" fill="#6f9a6a"/><rect x="38" y="52" width="24" height="26" fill="#26323a"/><path d="M34 52 50 30 66 52Z" fill="#1c262d"/><path d="M50 22v10M46 26h8" stroke="#1c262d" stroke-width="2"/><rect x="47" y="64" width="6" height="14" fill="#c9a45c"/>`},
  crater:{sky:['#d9e6ee','#f4e6d2'],g:()=>`<path d="M0 100V76L30 62 72 62 100 76V100Z" fill="#6b5a52"/><path d="M26 64 38 40h24l12 24Z" fill="#8a756a"/><ellipse cx="50" cy="40" rx="12" ry="4" fill="#5fc2b5"/><path d="M48 34q-6-10 2-16t-2-10" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>`},
  hot:{sky:['#d4e4ee','#efe6d8'],g:()=>`<path d="M0 100V62q50-10 100 0v38Z" fill="#a3705a"/><ellipse cx="50" cy="76" rx="34" ry="11" fill="#e8f1f3"/><ellipse cx="50" cy="76" rx="28" ry="8" fill="#63c3c4"/><path d="M40 66q-6-12 2-18M52 64q-6-14 2-22M62 66q-5-10 1-16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>`},
  whale:{sky:['#bcd9e6','#f1ece0'],g:()=>`<rect y="56" width="100" height="44" fill="#4e86a6"/><path d="M50 74V58q-14-2-18-14 12 2 18 8 6-6 18-8-4 12-18 14" fill="#26343c"/><path d="M0 70q12-5 25 0t25 0 25 0 25 0v30H0Z" fill="#3f7494"/><path d="M0 64q12-4 25 0t25 0 25 0 25 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".7"/>`},
  light:{sky:['#c3dbe8','#f3ede1'],g:()=>`<rect y="66" width="100" height="34" fill="#5b92b0"/><path d="M26 100 34 70h32l8 30Z" fill="#59656b"/><path d="M43 70 46 36h8l3 34Z" fill="#fff"/><path d="M44.5 52h11l-.8 8H45.3Z" fill="#c4452f"/><path d="M45 36h10l-5-8Z" fill="#c4452f"/>`},
  road:{sky:['#c9dfeb','#efe3cf'],g:()=>`<path d="M0 66 30 44 52 58 74 40 100 62V100H0Z" fill="#7b94a1"/><path d="M0 100V74q50-8 100 0v26Z" fill="#7a9b7e"/><path d="M44 100 50 76 56 100Z" fill="#59656b"/><path d="M50 98v-8M50 86v-5" stroke="#fff" stroke-width="1.5"/>`}
};
const MAP={waterfall:"kirk goda dett rjuk gufu skog selj oxar svart stjo gull fridh kolu",ice:"jok fjall jks hjok skaf solh",mountain:"vest lmlg hrafn alft emst thor fjad stud thingv almg",stack:"reyn dyr djup hvit ytri hjal",church:"budir ingj stykk hallg seyd hofsk glaum",crater:"grab viti hverf skutu eld leir dimmu raufar",hot:"hver geys myvb bl skyl geosea laugd nauth hvamm grjo silf",whale:"husa",light:"grotta hvaln"};
const KEYM={};Object.entries(MAP).forEach(([m,s])=>s.split(" ").forEach(k=>KEYM[k]=m));
function badge(k,size){const m=MOTIF[KEYM[k]||"road"],id="lb"+(++U);
  return `<svg class="bdgsv" viewBox="0 0 100 100" width="${size||76}" height="${size||76}" role="img" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.sky[0]}"/><stop offset="1" stop-color="${m.sky[1]}"/></linearGradient><clipPath id="${id}c"><circle cx="50" cy="50" r="44"/></clipPath></defs><g clip-path="url(#${id}c)"><rect width="100" height="100" fill="url(#${id})"/>${m.g()}</g><circle cx="50" cy="50" r="44" fill="none" stroke="${G}" stroke-width="3"/><circle cx="50" cy="50" r="40.5" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/></svg>`}
/* 封面風景 */
function ridge(seed,base,amp,fill,step){let x=0,p=`M0 ${base}`,s=seed;const r=()=>(s=(s*9301+49297)%233280)/233280;
  for(;x<=800;x+=step){p+=` L${x} ${(base-amp*r()).toFixed(0)}`}return `<path d="${p} L800 500 L0 500Z" fill="${fill}"/>`}
const ST={
  early:{sky:['#9fd3ea','#f6efe0'],sun:['#fff6d8',.9,620,120],r:[['#9fc3b4',150,70],['#7fae9c',110,60],['#5d9482',60,40]],water:'#8cc4d8',snow:'#fff'},
  close:{sky:['#0b2748','#5f8fb0'],sun:['#d6ecff',.35,600,130],r:[['#35587a',170,90],['#1f3f60',120,70],['#12304f',70,45]],water:'#2c6a92',snow:'#e8f3fb'},
  almost:{sky:['#3d3f7a','#ffb877'],sun:['#ffe6a8',.95,400,300],r:[['#8d5f84',170,70],['#5e4670',120,60],['#3a2f55',70,40]],water:'#d9856c',snow:'#ffd9bf'},
  trip:{sky:['#4f93be','#f7e2b4'],sun:['#fff3c4',.9,640,130],r:[['#7ea6a0',160,70],['#4f7f7b',115,60],['#2f5a5b',65,40]],water:'#69aac4',snow:'#fff'}
};
function scene(stage,k){const s=ST[stage]||ST.early,id="ls"+(++U);let d="";
  s.r.forEach((r,i)=>d+=ridge(7+i*13+stage.length,500-r[1]*0.9-60,r[2],r[0],40));
  const star=stage==="close"?Array.from({length:30},(_,i)=>`<circle cx="${(i*97)%800}" cy="${(i*53)%200}" r="${i%3?1:1.6}" fill="#fff" opacity=".7"/>`).join(""):"";
  const feat=k?`<g transform="translate(470 210) scale(3.2)" opacity=".95">${(MOTIF[KEYM[k]||"road"]).g()}</g>`:"";
  return `<svg class="lscene" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.sky[0]}"/><stop offset="1" stop-color="${s.sky[1]}"/></linearGradient></defs><rect width="800" height="500" fill="url(#${id})"/>${star}<circle cx="${s.sun[2]}" cy="${s.sun[3]}" r="70" fill="${s.sun[0]}" opacity="${s.sun[1]}"/>${d}<rect y="430" width="800" height="70" fill="${s.water}"/><path d="M0 430q50-8 100 0t100 0 100 0 100 0 100 0 100 0 100 0 100 0" stroke="#fff" stroke-opacity=".5" fill="none" stroke-width="2"/></svg>`}
const STAGE=left=>left<=-0?"trip":left<=30?"almost":left<=100?"close":"early";
const TXT={early:["籌備中","Early Planning","一步一步，慢慢靠近冰島"],close:["100 日內","Getting Closer","冰川與山脈，愈來愈近"],almost:["30 日內","Almost There","啟程在即"],trip:["旅程中","Welcome to Iceland","歡迎來到冰島"]};
/* o: {left, dateTxt, dayTxt, dayKey, role(已登入?), gButton, onEnter} */
function show(o){const st=o.trip?"trip":STAGE(o.left),T=TXT[st];
  const el=document.createElement("div");el.className="landing st-"+st;el.id="landing";
  const big=st==="trip"?`<div class="lwel">Welcome<br>to Iceland</div><div class="lsub">${o.dateTxt||""}${o.dayTxt?" · "+o.dayTxt:""}</div>`:`<div class="lnum"><b>${o.left}</b><span>Days to go</span></div><div class="lsub">9月12日 – 9月23日 · ${T[2]}</div>`;
  el.innerHTML=scene(st,st==="trip"?o.dayKey:null)+`<div class="lbox"><div class="ltitle">ICELAND 2027</div><div class="lring"><i></i>RING ROAD · 12–23 SEPTEMBER<i></i></div>
  <div class="lcard"><div class="ltag"><b>${T[1]}</b><span>${T[0]}</span></div>${big}<div class="lg" id="lgbox"></div><p class="lmsg" id="lgmsg"></p><button type="button" class="lenter" id="lenter">${o.role?"進入網站":"直接瀏覽  ›"}</button></div></div>`;
  document.body.appendChild(el);document.documentElement.style.overflow="hidden";
  const close=()=>{el.remove();document.documentElement.style.overflow="";try{sessionStorage.setItem("iceland-landing","1")}catch(e){}};
  el.querySelector("#lenter").onclick=close;
  if(!o.role)o.gButton(el.querySelector("#lgbox"),el.querySelector("#lgmsg"));
  document.addEventListener("keydown",function f(e){if(e.key==="Escape"&&document.getElementById("landing")){close();document.removeEventListener("keydown",f)}});
  return el}
window.LANDING={badge,scene,show,keyMotif:k=>KEYM[k]||"road"};
})();
