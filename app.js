const state={resources:[],deferredInstall:null};

async function loadResources(){
  const res=await fetch("resources.json");
  state.resources=(await res.json()).resources||[];
  document.querySelector("#resourceCount").textContent=state.resources.length;
  render();
}
function render(){
  const q=document.querySelector("#search").value.trim().toLowerCase();
  const type=document.querySelector("#typeFilter").value;
  const items=state.resources.filter(r=>{
    const hay=[r.title,r.subject,r.year,r.paper,r.category,r.resourceType,r.description].join(" ").toLowerCase();
    return (!q||hay.includes(q))&&(!type||r.category===type);
  });
  const grid=document.querySelector("#resourceGrid");
  if(!items.length){grid.innerHTML='<div class="empty"><div class="empty-icon">🔎</div><h3>No matching resources</h3><p>Try another subject, year, paper or resource type.</p></div>';return;}
  grid.innerHTML=items.map(r=>`<article class="card">
    <span class="badge">${escapeHtml(r.category)}</span>
    <h3>${escapeHtml(r.title)}</h3>
    <div class="muted">${escapeHtml(r.subject)} · ${escapeHtml(r.year||"Year not confirmed")} · ${escapeHtml(r.paper||"Paper not confirmed")}</div>
    <p class="muted">${escapeHtml(r.description||"")}</p>
    ${r.status==="review"?'<div class="status-review">⚠ Under review — classification not final</div>':""}
    <div class="card-actions"><button class="secondary" onclick="showResource('${r.id}')">Details</button></div>
  </article>`).join("");
}
function showResource(id){
  const r=state.resources.find(x=>x.id===id); if(!r)return;
  const notes=(r.reviewNotes||[]).map(x=>`• ${escapeHtml(x)}`).join("<br>");
  alert(`${r.title}\n\n${r.description||""}\n\n${r.status==="review"?"Review notes:\n"+(r.reviewNotes||[]).join("\n"):"Ready"}`);
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

document.querySelector("#search").addEventListener("input",render);
document.querySelector("#typeFilter").addEventListener("change",render);
document.querySelectorAll("[data-section]").forEach(b=>b.addEventListener("click",()=>document.querySelector("#"+b.dataset.section)?.scrollIntoView({behavior:"smooth"})));
document.querySelector("#themeBtn").addEventListener("click",()=>document.documentElement.classList.toggle("manual-dark"));

window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault();state.deferredInstall=e;const b=document.querySelector("#installBtn");b.hidden=false;
  b.onclick=async()=>{if(!state.deferredInstall)return;state.deferredInstall.prompt();state.deferredInstall=null;b.hidden=true;}
});
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(console.error));
loadResources();
