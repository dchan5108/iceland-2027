/* Iceland 2027 冒險徽章收集冊（全團共用一份進度）
   - 徽章定義：改 DEF 就得
   - 進度存在 Apps Script（op: badges / bset），本機有快取；離線照樣顯示快取
   - 狀態：S[id]=1 手動解鎖、0 手動撤銷、沒有＝自動（只有里程碑有自動規則） */
(function(){
const DEF=[
 // [id, 類別, 名稱, 英文, 圖案（landing motif 或 glyph:xxx）, 說明]
 ["goda","place","眾神瀑布","Goðafoss","horseshoe","親眼看過眾神瀑布的半月形水簾。"],
 ["dett","place","黛提瀑布","Dettifoss","canyon","歐洲水量最大的瀑布之一。"],
 ["vest","place","Vestrahorn","Vestrahorn","mountain","黑沙灘倒映尖山。"],
 ["jok","place","冰河湖","Jökulsárlón","ice","冰山在湖上漂流。"],
 ["dia","place","鑽石沙灘","Diamond Beach","diamond","黑沙上的碎冰。"],
 ["skog","place","斯科加爾瀑布","Skógafoss","waterfall","站在 60 米水簾前。"],
 ["walk","exp","冰川行者","Glacier Walker","snow","踏上冰川。"],
 ["climb","exp","攀冰者","Ice Climber","climb","用冰斧和冰爪攀上冰牆。"],
 ["paddle","exp","北極划手","Arctic Paddler","kayak","在冰島的水上划艇。"],
 ["trek","exp","高地徒步者","Highland Trekker","rhyo","走過高地徒步路線。"],
 ["hot","exp","溫泉探索者","Hot Spring Explorer","hot","泡過冰島的地熱溫泉。"],
 ["first","mile","冰島第一天","First Day in Iceland","glyph:plane","抵達冰島。"],
 ["half","mile","環島過半","Halfway Around Iceland","glyph:half","環島路程走了一半。"],
 ["ring","mile","完成環島","Ring Road Complete","glyph:ring","繞完 1 號環島公路。"],
 ["last","mile","最後一天","Last Day in Iceland","glyph:sun","冰島的最後一天。"],
 ["aurora","secret","極光見證者","Aurora Witness","aurora","親眼見到北極光。"],
 ["whale","secret","鯨魚的招呼","Whale Hello","whale","見到鯨魚躍出水面或擺尾。"]
];
const CAT={place:"地方與自然",exp:"體驗",mile:"里程碑",secret:"隱藏徽章"};
/* 里程碑自動規則：按冰島日期（旅程進度），不按行程時間 */
const AUTO={first:"2027-09-12",half:"2027-09-17",ring:"2027-09-22",last:"2027-09-23"};
const CK="iceland-badges";
let S={},X={},hostEl=null;
try{S=JSON.parse(localStorage.getItem(CK)||"{}")||{}}catch(e){S={}}
const has=id=>{if(S[id]===1)return true;if(S[id]===0)return false;const a=AUTO[id];return !!a&&X.now>=Date.parse(a+"T00:00:00Z")};
const G={plane:'<path d="M50 22c3 0 4 4 4 8v12l22 13v6l-22-7v13l7 5v4l-11-3-11 3v-4l7-5V54l-22 7v-6l22-13V30c0-4 1-8 4-8Z" fill="url(#GL)"/>',half:'<path d="M28 60a22 22 0 0 1 44 0" stroke="url(#GL)" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="72" cy="60" r="4" fill="url(#GL)"/>',
 ring:'<circle cx="50" cy="52" r="20" stroke="url(#GL)" stroke-width="6" fill="none"/><path d="M50 26v6M50 72v6M24 52h6M70 52h6" stroke="#0d1b27" stroke-width="2"/>',sun:'<circle cx="50" cy="60" r="12" fill="url(#GL)"/><path d="M24 64h52" stroke="#0d1b27" stroke-width="10"/><path d="M26 68h48M34 74h32" stroke="url(#GL)" stroke-width="2.4" stroke-linecap="round"/>'};
let U=0;
function glyph(g,S2){const id="bg"+(++U);return `<svg viewBox="0 0 100 100" width="${S2}" height="${S2}" aria-hidden="true"><defs><radialGradient id="${id}n" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#2b5876"/><stop offset="1" stop-color="#0d1b27"/></radialGradient><linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0d9a2"/><stop offset=".45" stop-color="#b8904a"/><stop offset=".7" stop-color="#e3c585"/><stop offset="1" stop-color="#9c7636"/></linearGradient></defs><circle cx="50" cy="50" r="49" fill="#f7f1e3"/><circle cx="50" cy="50" r="42" fill="url(#${id}n)"/>${G[g].replace(/url\(#GL\)/g,`url(#${id}r)`)}<path d="M16 36A38 38 0 0 1 64 13" stroke="#fff" stroke-width="2" fill="none" opacity=".25" stroke-linecap="round"/><circle cx="50" cy="50" r="46" fill="none" stroke="url(#${id}r)" stroke-width="4.4"/></svg>`}
function art(b,sz){const m=b[4];if(m.startsWith("glyph:"))return glyph(m.slice(6),sz);return window.LANDING?LANDING.badge(b[0],sz,m):""}
const Q='<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#26333d" stroke="#5a6b78" stroke-width="3"/><text x="50" y="64" text-anchor="middle" font-size="40" font-family="Georgia,serif" fill="#8a9aa6">?</text></svg>';
function render(){if(!hostEl||!hostEl.isConnected)return;const main=DEF.filter(b=>b[1]!=="secret"),got=main.filter(b=>has(b[0])).length,sec=DEF.filter(b=>b[1]==="secret"&&has(b[0])).length;
 hostEl.innerHTML=`<div class="bc-h"><div class="glk">冒險徽章</div><span class="bc-n">${got}/${main.length}${sec?` ・隱藏 +${sec}`:""}</span></div><div class="bc-bar"><i style="width:${(got/main.length*100).toFixed(0)}%"></i></div>`+
 Object.keys(CAT).map(c=>`<div class="bc-cat">${CAT[c]}</div><div class="bc-g">${DEF.filter(b=>b[1]===c).map(b=>{const on=has(b[0]),hid=c==="secret"&&!on;return `<button type="button" class="bc-b${on?"":" lk"}" data-bdg="${b[0]}">${hid?Q:art(b,64)}<span>${hid?"？？？":b[2]}</span></button>`}).join("")}</div>`).join("")+(X.note?`<p class="rhint">${X.note}</p>`:"")}
async function call(body){const sk=localStorage.getItem("iceland-gsk");if(!sk||!X.url)throw new Error("login");const r=await fetch(X.url,{method:"POST",body:JSON.stringify(Object.assign({sk},body))});const j=await r.json();if(!j.ok)throw new Error(j.err||((j.sv||0)<9?"old":"err"));return j.badges||{}}
function save(m){S=m||{};try{localStorage.setItem(CK,JSON.stringify(S))}catch(e){}render()}
async function pull(){try{save(await call({op:"badges"}));X.note=""}catch(e){X.note=X.admin&&e.message==="old"?"徽章未能同步：Apps Script 要更新到 v9。":"";render()}}
function open(id){const b=DEF.find(x=>x[0]===id);if(!b)return;const on=has(id),hid=b[1]==="secret"&&!on,d=document.createElement("dialog");d.className="bc-dlg";
 d.innerHTML=`<div class="bc-art${on?"":" lk"}">${hid?Q:art(b,120)}</div><h3>${hid?"隱藏徽章":b[2]}</h3><p class="bc-en">${hid?"":b[3]}</p><p>${hid?"在旅途中發現就會解鎖。":b[5]}</p><p class="bc-st">${on?"已收集":"未收集"}${AUTO[id]&&S[id]==null?"（按旅程進度自動）":S[id]!=null?"（管理員設定）":""}</p>${X.admin?`<div class="bc-ad"><button type="button" data-bset="${id}|1">解鎖</button><button type="button" data-bset="${id}|0">撤銷</button>${AUTO[id]?`<button type="button" data-bset="${id}|">回復自動</button>`:""}</div><p class="bc-msg"></p>`:""}<button type="button" class="bc-x" data-bcx>關閉</button>`;
 document.body.appendChild(d);d.addEventListener("close",()=>d.remove());d.addEventListener("click",async e=>{if(e.target===d||e.target.closest("[data-bcx]")){d.close();return}const t=e.target.closest("[data-bset]");if(!t)return;const [i,v]=t.dataset.bset.split("|"),msg=d.querySelector(".bc-msg");msg.textContent="儲存中…";
  try{save(await call({op:"bset",id:i,v:v===""?null:+v}));d.close()}catch(er){msg.textContent=er.message==="old"?"Apps Script 要更新到 v9 先可以儲存。":er.message==="admin"?"只有管理員可以改。":"儲存失敗，請稍後再試。"}});
 d.showModal()}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-bdg]");if(t)open(t.dataset.bdg)});
const css=`.bc{margin-top:18px}.bc-h{display:flex;justify-content:space-between;align-items:center}.bc-h .glk{margin:0}.bc-n{font:700 13px system-ui,sans-serif;color:var(--muted);font-variant-numeric:tabular-nums}
.bc-bar{height:4px;border-radius:4px;background:var(--line);margin:10px 0 4px;overflow:hidden}.bc-bar i{display:block;height:100%;background:linear-gradient(90deg,#4aa3c7,#c9a45c)}
.bc-cat{font-size:11.5px;letter-spacing:.12em;color:var(--muted);margin:14px 0 8px}.bc-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:12px 6px}
.bc-b{border:0;background:none;padding:0;display:grid;justify-items:center;gap:5px;cursor:pointer;color:var(--fg);font:600 11.5px/1.3 system-ui,sans-serif;text-align:center}
.bc-b svg{width:60px;height:60px;filter:drop-shadow(0 3px 6px rgba(20,40,58,.2))}.bc-b.lk svg,.bc-art.lk svg{filter:grayscale(1) contrast(.85) brightness(1.08);opacity:.42}.bc-b.lk span{color:var(--muted);font-weight:500}
.bc-dlg{border:0;border-radius:20px;padding:22px 20px 16px;max-width:300px;width:calc(100% - 32px);text-align:center;background:var(--card);color:var(--fg);box-shadow:0 20px 60px rgba(0,0,0,.35)}.bc-dlg::backdrop{background:rgba(13,27,39,.45)}
.bc-dlg h3{margin:10px 0 2px;font:700 20px Georgia,"Noto Serif TC",serif}.bc-en{margin:0 0 8px;color:var(--muted);font-size:12px;letter-spacing:.08em}.bc-st{font-size:12px;color:var(--route)}
.bc-ad{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:10px}.bc-ad button,.bc-x{border:1px solid var(--line);background:var(--bg);color:var(--fg);border-radius:999px;padding:6px 12px;font-size:12.5px;cursor:pointer}.bc-x{margin-top:12px;border:0;background:none;color:var(--muted)}.bc-msg{font-size:12px;color:var(--muted);min-height:1em;margin:6px 0 0}`;
try{const st=document.createElement("style");st.textContent=css;document.head.appendChild(st)}catch(e){}
/* ctx: {url, admin, now} */
window.BADGES={mount(el,ctx){hostEl=el;X=Object.assign(X,ctx||{});render();pull()}};
})();
