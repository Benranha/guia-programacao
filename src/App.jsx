import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, ArrowRight, RotateCcw, ChevronRight, ChevronLeft, Circle, Menu, X } from "lucide-react";
import { useProgress } from "./contexts/useProgress.js";
import { useAuth } from "./contexts/useAuth.js";
import { useIsMobile } from "./lib/useMediaQuery.js";
import UserMenu from "./components/UserMenu.jsx";
import AnonBanner from "./components/AnonBanner.jsx";
import AuthPage from "./components/AuthPage.jsx";
import AskAI from "./components/AskAI.jsx";
import { MODS } from "./modules/index.js";

const C={
  cream:"#F8F6F0",white:"#FFF",ink:"#1C1B18",
  terra:"#B85438",terraLight:"#FAF0EB",terraDark:"#7A2E1A",
  muted:"#7A7570",border:"#E2DDD6",
  codeBg:"#1A1917",codeText:"#F0EBE3",
  green:"#1E7B4A",greenLight:"#EBF7F1",
  purple:"#7F77DD",purpleLight:"#EEEDFE",
};
const serif="'Iowan Old Style','Palatino Linotype',Georgia,serif";
const sans="var(--font-sans,system-ui,sans-serif)";
const mono="var(--font-mono,'Courier New',monospace)";
const PL=[{l:"Definição",c:"#7F77DD"},{l:"Comparação",c:"#1D9E75"},{l:"Circunstâncias",c:"#D47F1A"},{l:"Relação",c:"#3B8BD4"},{l:"Testemunho",c:"#D4537E"}];

// ── shared ui components ──────────────────────────────────────────────────────
function SC({num,label,color,title,children,mob}){
  return (
    <div style={{background:C.white,borderRadius:mob?14:18,padding:mob?"1.25rem 1.1rem":"2rem",marginBottom:"1.25rem",borderLeft:`4px solid ${color}`,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:mob?"1rem":"1.25rem",flexWrap:"wrap"}}>
        <span style={{background:color,color:C.white,fontSize:11,fontWeight:700,padding:"3px 11px",borderRadius:999,textTransform:"uppercase",fontFamily:sans,letterSpacing:"0.06em"}}>{num} · {label}</span>
        <h2 style={{fontSize:mob?18:20,fontWeight:600,fontFamily:serif,color:C.ink,margin:0,lineHeight:1.3}}>{title}</h2>
      </div>
      <div style={{fontSize:mob?15:16,lineHeight:1.7,color:C.ink,fontFamily:sans}}>{children}</div>
    </div>
  );
}
function Nt({e,t,bg,tc}){
  return (
    <div style={{background:bg||C.terraLight,borderRadius:12,padding:"0.875rem 1.1rem",margin:"0.875rem 0",display:"flex",gap:12,alignItems:"flex-start"}}>
      <span style={{fontSize:17,flexShrink:0}}>{e}</span>
      <div style={{fontSize:15,lineHeight:1.65,color:tc||C.terraDark,fontFamily:sans}}>{t}</div>
    </div>
  );
}
function Cd({lang,code,mob}){
  return (
    <div style={{background:C.codeBg,borderRadius:12,padding:mob?"0.9rem 1rem":"1.25rem 1.5rem",margin:"1rem 0",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
      {lang && <div style={{fontSize:10,color:"#6B6660",fontFamily:mono,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.12em"}}>{lang}</div>}
      <pre style={{margin:0,fontFamily:mono,fontSize:mob?12:13,lineHeight:1.7,color:C.codeText,whiteSpace:"pre"}}>{code}</pre>
    </div>
  );
}
function Tb({h,r,ac}){
  return (
    <div style={{overflowX:"auto",margin:"1rem 0",borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,fontFamily:sans}}>
        <thead><tr>{h.map((x,i)=> <th key={i} style={{background:i===0?C.cream:ac||C.terra,color:i===0?C.muted:C.white,padding:"9px 14px",textAlign:"left",fontWeight:500,fontSize:13}}>{x}</th>)}</tr></thead>
        <tbody>{r.map((row,i)=> <tr key={i} style={{background:i%2===0?C.white:C.cream}}>{row.map((cell,j)=> <td key={j} style={{padding:"9px 14px",borderBottom:`1px solid ${C.border}`,color:j===0?C.muted:C.ink,fontWeight:j===0?500:400,lineHeight:1.5}}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
function Qt({q,a,r,ac}){
  return (
    <div style={{background:C.ink,borderRadius:16,padding:"1.875rem",margin:"1rem 0"}}>
      <div style={{fontSize:52,lineHeight:0.9,color:ac||C.terra,fontFamily:serif,marginBottom:12,userSelect:"none"}}>&ldquo;</div>
      <p style={{fontSize:17,lineHeight:1.72,margin:"0 0 1rem",fontFamily:serif,fontStyle:"italic",color:"#F0EBE3"}}>{q}</p>
      <div style={{fontWeight:600,fontSize:14,color:C.white,fontFamily:sans}}>{a}</div>
      <div style={{fontSize:12,color:"#8A8480",fontFamily:sans,marginTop:2}}>{r}</div>
    </div>
  );
}
function Xtra({x,ac,mob}){
  if(!x) return null;
  if(x.t==="n") return <Nt e={x.e} t={x.tx} bg={x.bg} tc={x.tc}/>;
  if(x.t==="c") return <Cd lang={x.lang} code={x.code} mob={mob}/>;
  if(x.t==="tb") return <Tb h={x.h} r={x.r} ac={x.ac||ac}/>;
  if(x.t==="q") return <Qt q={x.q} a={x.a} r={x.r} ac={x.ac||ac}/>;
  return null;
}

// ── tutorial card (passo a passo + erros comuns) ─────────────────────────────
function ErrCard({bad,fix,why}){
  return (
    <div style={{background:C.cream,borderRadius:10,padding:"0.875rem 1rem",border:`1px solid ${C.border}`,marginBottom:"0.625rem"}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
        <span style={{color:"#B83228",fontSize:14,fontWeight:700,flexShrink:0,fontFamily:mono}}>✗</span>
        <div style={{fontSize:14,lineHeight:1.55,color:"#7A2E1A",fontFamily:sans}}>{bad}</div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
        <span style={{color:C.green,fontSize:14,fontWeight:700,flexShrink:0,fontFamily:mono}}>✓</span>
        <div style={{fontSize:14,lineHeight:1.55,color:"#0F5136",fontFamily:sans}}>{fix}</div>
      </div>
      <div style={{fontSize:13,lineHeight:1.55,color:C.muted,fontFamily:sans,paddingLeft:22,fontStyle:"italic"}}>{why}</div>
    </div>
  );
}
function Tut({n,title,intro,code,lang,explain,errors,ac}){
  return (
    <div style={{background:C.white,borderRadius:18,padding:"1.875rem",marginBottom:"1.25rem",border:`1px solid ${C.border}`,borderTop:`4px solid ${ac||C.terra}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem",flexWrap:"wrap"}}>
        <span style={{background:C.ink,color:C.white,fontSize:11,fontWeight:700,padding:"3px 11px",borderRadius:999,textTransform:"uppercase",fontFamily:sans,letterSpacing:"0.06em"}}>Tutorial · {n}</span>
        <h2 style={{fontSize:19,fontWeight:600,fontFamily:serif,color:C.ink,margin:0,lineHeight:1.3}}>{title}</h2>
      </div>
      {intro && <p style={{fontSize:15,lineHeight:1.7,color:C.ink,fontFamily:sans,margin:"0 0 1rem"}}>{intro}</p>}
      {code && <Cd lang={lang} code={code}/>}
      {explain && <p style={{fontSize:14,lineHeight:1.7,color:C.muted,fontFamily:sans,margin:"0.5rem 0 1.25rem"}}>{explain}</p>}
      {errors && errors.length>0 && (
        <div>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:sans,marginBottom:"0.625rem"}}>Erros comuns</div>
          {errors.map((e,i)=> <ErrCard key={i} bad={e.bad} fix={e.fix} why={e.why}/>)}
        </div>
      )}
    </div>
  );
}

// ── quiz engine ───────────────────────────────────────────────────────────────
function Quiz({qs,ac,onComplete,isCompleted,mob}){
  const [ans,setAns]=useState({});
  const [sub,setSub]=useState(isCompleted);
  const ok=qs.every((_,i)=>ans[i]!==undefined);
  const sc=qs.filter((q,i)=>ans[i]===q.a).length;
  const e=sc===qs.length?"🎯":sc>=qs.length*.75?"✨":sc>=qs.length*.5?"💪":"🌱";
  const msg=sc===qs.length?"Resultado perfeito! Você dominou os conceitos deste módulo.":sc>=qs.length*.75?"Muito bem! Reveja os itens marcados e siga em frente.":"Releia as seções com dificuldade e tente de novo.";
  return (
    <div style={{background:C.white,borderRadius:mob?14:20,padding:mob?"1.25rem 1.1rem":"2rem",marginBottom:"1.5rem",border:`1.5px solid ${ac||C.terra}30`}}>
      <span style={{background:C.ink,color:C.white,fontSize:11,fontWeight:700,padding:"4px 13px",borderRadius:999,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:sans}}>Quiz</span>
      <h2 style={{fontSize:mob?20:24,fontWeight:700,fontFamily:serif,color:C.ink,margin:"0.75rem 0 0.4rem"}}>Aplique o que você leu</h2>
      <p style={{fontSize:mob?14:15,color:C.muted,fontFamily:sans,margin:"0 0 1.5rem"}}>{qs.length} perguntas sobre os conceitos do módulo.</p>
      {qs.map((q,i)=> (
        <div key={i} style={{background:C.cream,borderRadius:mob?12:16,padding:mob?"1rem":"1.5rem",marginBottom:"1rem",border:`1px solid ${C.border}`}}>
          <p style={{fontSize:15,fontWeight:500,lineHeight:1.6,margin:"0 0 1rem",fontFamily:sans,color:C.ink,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",background:ac||C.terra,color:C.white,borderRadius:"50%",width:24,height:24,fontSize:12,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
            <span>{q.q}</span>
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {q.o.map((opt,j)=>{
              const sel=ans[i]===j,cor=j===q.a;
              let bg=C.white,bd=C.border,cl=C.ink,fw=400;
              if(sub){if(cor){bg=C.greenLight;bd=C.green;cl=C.green;fw=500;}else if(sel){bg="#FBF0EF";bd="#B83228";cl="#B83228";}}
              else if(sel){bg=`${ac||C.terra}18`;bd=ac||C.terra;fw=500;}
              return (
                <button key={j} onClick={()=>!sub&&setAns(p=>({...p,[i]:j}))} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 15px",background:bg,border:`1.5px solid ${bd}`,borderRadius:10,cursor:sub?"default":"pointer",textAlign:"left",color:cl}}>
                  <span style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sub&&cor?C.green:sub&&sel?"#B83228":sel?ac||C.terra:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sub&&cor&&<CheckCircle size={12} color={C.green}/>}
                    {sub&&sel&&!cor&&<XCircle size={12} color="#B83228"/>}
                  </span>
                  <span style={{fontSize:14,lineHeight:1.5,fontFamily:sans,fontWeight:fw}}>{opt}</span>
                </button>
              );
            })}
          </div>
          {sub&&ans[i]!==undefined&&(
            <div style={{marginTop:"0.875rem",padding:"0.875rem 1rem",background:ans[i]===q.a?C.greenLight:"#FBF0EF",borderRadius:10,fontSize:14,lineHeight:1.6,color:ans[i]===q.a?C.green:"#B83228",fontFamily:sans,borderLeft:`3px solid ${ans[i]===q.a?C.green:"#B83228"}`}}>
              {ans[i]===q.a?"✓ "+q.ok:"✗ "+q.no}
            </div>
          )}
        </div>
      ))}
      {!sub ? (
        <button onClick={()=>{if(!ok)return;setSub(true);onComplete();}} disabled={!ok} style={{width:"100%",padding:"14px",background:ok?ac||C.terra:C.border,color:ok?C.white:C.muted,border:"none",borderRadius:12,fontSize:15,fontWeight:600,cursor:ok?"pointer":"not-allowed",fontFamily:sans,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {ok ? <><span>Ver resultado</span><ArrowRight size={16}/></> : `Responda todas (${Object.keys(ans).length}/${qs.length})`}
        </button>
      ) : (
        <div style={{background:sc>=qs.length*.75?C.greenLight:C.terraLight,borderRadius:16,padding:"1.75rem",textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:10}}>{e}</div>
          <div style={{fontSize:32,fontWeight:700,fontFamily:serif,color:C.ink,marginBottom:6}}>{sc}/{qs.length}</div>
          <p style={{fontSize:15,color:C.muted,fontFamily:sans,lineHeight:1.65,maxWidth:420,margin:"0 auto 1.25rem"}}>{msg}</p>
          <button onClick={()=>{setAns({});setSub(false);}} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"9px 18px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,fontSize:13,color:C.muted,cursor:"pointer",fontFamily:sans}}>
            <RotateCcw size={13}/> Refazer
          </button>
        </div>
      )}
    </div>
  );
}

// ── checklist engine ──────────────────────────────────────────────────────────
function Chk({title,sub,steps,ac,msg,onComplete,onNext,isCompleted,mob}){
  const [chk,setChk]=useState({});
  const toggle=id=>setChk(p=>({...p,[id]:!p[id]}));
  const cnt=steps.filter(s=>chk[s.id]).length;
  const done=cnt===steps.length;
  if(done&&!isCompleted) onComplete();
  return (
    <div style={{background:C.white,borderRadius:mob?14:20,padding:mob?"1.25rem 1.1rem":"2rem",marginBottom:"1.5rem",border:`1.5px solid ${ac||C.terra}30`}}>
      <span style={{background:C.ink,color:C.white,fontSize:11,fontWeight:700,padding:"4px 13px",borderRadius:999,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:sans}}>Atividade prática</span>
      <h2 style={{fontSize:mob?20:24,fontWeight:700,fontFamily:serif,color:C.ink,margin:"0.75rem 0 0.375rem"}}>{title}</h2>
      <p style={{fontSize:mob?14:15,color:C.muted,fontFamily:sans,margin:"0 0 1.25rem"}}>{sub}</p>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:"1.25rem"}}>
        {steps.map(s=> (
          <button key={s.id} onClick={()=>toggle(s.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:chk[s.id]?C.greenLight:C.cream,border:`1.5px solid ${chk[s.id]?C.green:C.border}`,borderRadius:10,cursor:"pointer",textAlign:"left"}}>
            <span style={{width:20,height:20,borderRadius:5,border:`2px solid ${chk[s.id]?C.green:C.border}`,background:chk[s.id]?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {chk[s.id]&&<CheckCircle size={14} color={C.white}/>}
            </span>
            <span style={{fontSize:14,fontFamily:sans,color:chk[s.id]?C.green:C.ink,fontWeight:chk[s.id]?500:400,textDecoration:chk[s.id]?"line-through":"none"}}>{s.l}</span>
          </button>
        ))}
      </div>
      <div style={{background:C.cream,borderRadius:999,height:6,overflow:"hidden",marginBottom:6}}>
        <div style={{background:ac||C.terra,height:"100%",borderRadius:999,width:`${(cnt/steps.length)*100}%`,transition:"width 0.3s"}}/>
      </div>
      <div style={{fontSize:12,color:C.muted,fontFamily:sans,marginBottom:"1.25rem"}}>{cnt}/{steps.length} concluídos</div>
      {done && (
        <div style={{background:C.greenLight,borderRadius:16,padding:"1.5rem",textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:8}}>🎉</div>
          <div style={{fontSize:22,fontWeight:700,fontFamily:serif,color:C.ink,marginBottom:6}}>Atividade concluída!</div>
          <p style={{fontSize:15,color:C.muted,fontFamily:sans,lineHeight:1.65,maxWidth:400,margin:"0 auto 1.25rem"}}>{msg}</p>
          <button onClick={onNext} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 22px",background:C.ink,color:C.white,border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:sans}}>
            Próximo módulo <ArrowRight size={15}/>
          </button>
        </div>
      )}
    </div>
  );
}

// ── module viewer (shared renderer) ──────────────────────────────────────────
const OSI={
  windows:["Acesse code.visualstudio.com","Clique em Download for Windows","Execute o .exe e siga o instalador","Marque 'Add to PATH' e 'Add Open with Code'","Abra pelo menu Iniciar"],
  mac:["Acesse code.visualstudio.com","Clique em Download for Mac","Abra o .zip — extrai automaticamente","Arraste para Aplicativos","Abra pelo Launchpad ou Cmd+Espaço"],
  linux:["Acesse code.visualstudio.com","Baixe o pacote .deb ou .rpm","No terminal: sudo dpkg -i code_*.deb","Abra com o comando: code"],
};

function MV({mod,onComplete,onNext,isCompleted,mob}){
  const [os,setOs]=useState("windows");
  return (
    <div style={{background:C.cream,padding:mob?"1.25rem 0.75rem":"2rem 1rem"}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>

        {/* header */}
        <div style={{marginBottom:mob?"1.75rem":"2.75rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:"1.1rem",flexWrap:"wrap"}}>
            <span style={{background:mod.color,color:C.white,fontSize:12,fontWeight:700,padding:"4px 14px",borderRadius:999,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:sans}}>{mod.badge}</span>
            <span style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:C.muted,fontFamily:sans}}><Clock size={13}/> {mod.time}</span>
          </div>
          <h1 style={{fontSize:"clamp(28px,7vw,48px)",fontWeight:700,lineHeight:1.1,fontFamily:serif,color:C.ink,margin:"0 0 0.75rem"}}>
            {mod.t1}<br/><span style={{color:mod.color}}>{mod.t2}</span>
          </h1>
          <p style={{fontSize:mob?15:17,lineHeight:1.6,color:C.muted,fontFamily:sans,maxWidth:540,margin:"0 0 1.25rem"}}>{mod.subtitle}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {(mod.pillars||PL).map(p=> <span key={p.l} style={{fontSize:12,padding:"3px 12px",borderRadius:999,border:`1px solid ${p.c}50`,color:p.c,background:`${p.c}14`,fontFamily:sans,fontWeight:500}}>{p.l}</span>)}
          </div>
        </div>

        {/* sections */}
        {mod.sections.map(s=> (
          <SC key={s.num} num={s.num} label={s.label} color={s.sc} title={s.title} mob={mob}>
            <p style={{margin:0,lineHeight:mob?1.7:1.78}}>{s.body}</p>
            {(s.xs||[s.x]).filter(Boolean).map((x,i)=> <Xtra key={i} x={x} ac={mod.color} mob={mob}/>)}
          </SC>
        ))}

        {/* tutorials (passo a passo detalhado antes da atividade) */}
        {mod.tutorials && mod.tutorials.length>0 && (
          <div style={{margin:"2.5rem 0 1.25rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"0.875rem"}}>
              <span style={{height:1,flex:1,background:C.border}}/>
              <span style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:sans}}>Tutoriais práticos</span>
              <span style={{height:1,flex:1,background:C.border}}/>
            </div>
            <p style={{fontSize:14,lineHeight:1.65,color:C.muted,fontFamily:sans,textAlign:"center",margin:"0 0 1.5rem",maxWidth:480,marginLeft:"auto",marginRight:"auto"}}>
              Antes da atividade, cada peça que você vai usar — explicada com o código exato e os erros que mais travam quem está começando.
            </p>
            {mod.tutorials.map(t=> <Tut key={t.n} n={t.n} title={t.title} intro={t.intro} code={t.code} lang={t.lang} explain={t.explain} errors={t.errors} ac={mod.color}/>)}
          </div>
        )}

        {/* install steps (VS Code only) */}
        {mod.hasInstall && (
          <div style={{background:C.white,borderRadius:mob?14:18,padding:mob?"1.25rem 1.1rem":"2rem",marginBottom:"1.25rem",border:`1px solid ${C.border}`}}>
            <h2 style={{fontSize:20,fontWeight:600,fontFamily:serif,color:C.ink,margin:"0 0 1rem"}}>Instalação passo a passo</h2>
            <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:"1.25rem"}}>
              {["windows","mac","linux"].map(o=> <button key={o} onClick={()=>setOs(o)} style={{padding:"7px 16px",border:"none",borderBottom:`2px solid ${os===o?C.purple:"transparent"}`,background:"transparent",fontSize:13,fontWeight:os===o?600:400,color:os===o?C.purple:C.muted,cursor:"pointer",fontFamily:sans}}>{o==="windows"?"Windows":o==="mac"?"macOS":"Linux"}</button>)}
            </div>
            <ol style={{margin:0,paddingLeft:"1.25rem",display:"flex",flexDirection:"column",gap:10}}>
              {OSI[os].map((s,i)=> <li key={i} style={{fontSize:15,lineHeight:1.6,color:C.ink,fontFamily:sans}}>{s}</li>)}
            </ol>
          </div>
        )}

        {/* activity */}
        {mod.act.type==="q"
          ? <Quiz qs={mod.act.qs} ac={mod.color} onComplete={onComplete} isCompleted={isCompleted} mob={mob}/>
          : <Chk title={mod.act.title} sub={mod.act.sub} steps={mod.act.steps} ac={mod.color} msg={mod.act.msg} onComplete={onComplete} onNext={onNext} isCompleted={isCompleted} mob={mob}/>
        }

        {/* IA de dúvidas — focada no escopo do módulo ativo */}
        <AskAI moduleId={mod.id} moduleTitle={`${mod.t1} ${mod.t2}`} accent={mod.color}/>
      </div>
    </div>
  );
}


// ── app shell ─────────────────────────────────────────────────────────────────
export default function App(){
  const [activeId,setActiveId]=useState(MODS[0].id);
  const [view,setView]=useState("guide");
  const [drawerOpen,setDrawerOpen]=useState(false);
  const {user}=useAuth();
  const {completed,markComplete}=useProgress();
  const isMobile=useIsMobile();
  const effectiveView=user?"guide":view;
  const drawerActive=isMobile&&drawerOpen;
  useEffect(()=>{
    document.body.style.overflow=drawerActive?"hidden":"";
    return ()=>{document.body.style.overflow="";};
  },[drawerActive]);
  if(effectiveView==="login") return <AuthPage onBack={()=>setView("guide")}/>;
  const unlocked=idx=>idx===0||completed.includes(MODS[idx-1].id);
  const done=id=>completed.includes(id);
  const mark=id=>{markComplete(id);};
  const activeIdx=MODS.findIndex(m=>m.id===activeId);
  const active=MODS[activeIdx];
  const hasNext=activeIdx<MODS.length-1&&unlocked(activeIdx+1);
  const hasPrev=activeIdx>0;
  const pct=Math.round((completed.length/MODS.length)*100);
  const goTo=(id,i)=>{if(unlocked(i)){setActiveId(id);setDrawerOpen(false);window.scrollTo({top:0,behavior:"smooth"});}};
  const goNext=()=>{const n=MODS[activeIdx+1];if(n&&unlocked(activeIdx+1))goTo(n.id,activeIdx+1);};
  const goPrev=()=>{const p=MODS[activeIdx-1];if(p)goTo(p.id,activeIdx-1);};

  const sidebarBase={width:260,minWidth:260,background:C.white,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflowY:"auto",flexShrink:0};
  const sidebarStyle=isMobile
    ? {...sidebarBase,position:"fixed",top:0,bottom:0,left:0,height:"100dvh",zIndex:60,boxShadow:drawerOpen?"0 0 30px rgba(0,0,0,0.25)":"none",transform:drawerOpen?"translateX(0)":"translateX(-100%)",transition:"transform 0.25s ease"}
    : {...sidebarBase,position:"sticky",top:0,height:"100vh"};

  const sidebar=(
    <aside style={sidebarStyle} aria-hidden={isMobile&&!drawerOpen}>
      <div style={{padding:"1.375rem 1.25rem 1rem",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,fontWeight:700,color:C.terra,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3,fontFamily:sans}}>Guia de Programação</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:"0.875rem",fontFamily:sans}}>Era da IA · Do zero</div>
          <div style={{background:C.cream,borderRadius:999,height:4,overflow:"hidden",marginBottom:5}}>
            <div style={{background:C.terra,height:"100%",borderRadius:999,width:`${pct}%`,transition:"width 0.5s"}}/>
          </div>
          <div style={{fontSize:11,color:C.muted,fontFamily:sans}}>{completed.length}/{MODS.length} concluídos</div>
        </div>
        {isMobile && (
          <button onClick={()=>setDrawerOpen(false)} aria-label="Fechar menu" style={{background:"transparent",border:"none",padding:6,cursor:"pointer",color:C.muted,display:"flex"}}>
            <X size={18}/>
          </button>
        )}
      </div>
      <nav style={{padding:"0.5rem 0",flex:1}}>
        {MODS.map((m,i)=> (
          <button key={m.id} onClick={()=>goTo(m.id,i)} disabled={!unlocked(i)} style={{width:"100%",textAlign:"left",padding:"0.7rem 1.25rem 0.7rem 1rem",background:m.id===activeId?C.terraLight:"transparent",border:"none",borderLeft:`3px solid ${m.id===activeId?C.terra:"transparent"}`,cursor:unlocked(i)?"pointer":"not-allowed",opacity:unlocked(i)?1:0.4,display:"flex",alignItems:"center",gap:10}}>
            <span style={{width:20,height:20,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:done(m.id)?C.greenLight:m.id===activeId?C.terraLight:C.cream,border:`1.5px solid ${done(m.id)?C.green:m.id===activeId?C.terra:C.border}`}}>
              {!unlocked(i)&&<span style={{fontSize:9}}>🔒</span>}
              {unlocked(i)&&done(m.id)&&<CheckCircle size={12} color={C.green}/>}
              {unlocked(i)&&!done(m.id)&&m.id===activeId&&<Circle size={8} color={C.terra} fill={C.terra}/>}
            </span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:9,fontWeight:700,color:m.color,letterSpacing:"0.07em",textTransform:"uppercase",fontFamily:sans,marginBottom:1}}>{m.badge}</div>
              <div style={{fontSize:13,fontWeight:m.id===activeId?500:400,color:C.ink,fontFamily:sans,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.t1} {m.t2}</div>
            </div>
            {m.id===activeId&&<ChevronRight size={13} color={C.terra}/>}
          </button>
        ))}
      </nav>
      <UserMenu onLoginClick={()=>{setDrawerOpen(false);setView("login");}}/>
      <div style={{padding:"0.875rem 1.25rem",borderTop:`1px solid ${C.border}`,fontSize:11,color:C.muted,fontFamily:sans}}>Atualizado com contexto IA 2024+</div>
    </aside>
  );

  return (
    <div style={{display:"flex",minHeight:"100vh",background:C.cream,fontFamily:sans}}>
      {sidebar}
      {isMobile && drawerOpen && (
        <div onClick={()=>setDrawerOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:55}} aria-hidden="true"/>
      )}
      {/* main */}
      <main style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",width:"100%"}}>
        <AnonBanner onLoginClick={()=>setView("login")}/>
        <header style={{display:"flex",alignItems:"center",gap:10,padding:isMobile?"0.7rem 0.9rem":"0.875rem 1.25rem",background:C.white,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:30}}>
          {isMobile && (
            <button onClick={()=>setDrawerOpen(true)} aria-label="Abrir menu" style={{width:38,height:38,borderRadius:8,border:`1px solid ${C.border}`,background:C.white,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Menu size={18}/>
            </button>
          )}
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,fontWeight:700,color:active.color,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:sans}}>{active.badge}</div>
            <div style={{fontSize:14,fontWeight:500,color:C.ink,fontFamily:sans,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{active.t1} {active.t2}</div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={goPrev} disabled={!hasPrev} style={{width:36,height:36,borderRadius:8,border:`1px solid ${C.border}`,background:C.white,cursor:hasPrev?"pointer":"not-allowed",opacity:hasPrev?1:0.35,display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={16}/></button>
            <button onClick={goNext} disabled={!hasNext} style={{width:36,height:36,borderRadius:8,border:`1px solid ${C.border}`,background:C.white,cursor:hasNext?"pointer":"not-allowed",opacity:hasNext?1:0.35,display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={16}/></button>
          </div>
        </header>
        <div style={{flex:1}}>
          <MV mod={active} onComplete={()=>mark(activeId)} onNext={goNext} isCompleted={done(activeId)} mob={isMobile}/>
        </div>
        <footer style={{borderTop:`1px solid ${C.border}`,background:C.white,padding:isMobile?"0.75rem 0.9rem":"0.875rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <button onClick={goPrev} disabled={!hasPrev} style={{display:"flex",alignItems:"center",gap:7,padding:isMobile?"9px 12px":"9px 16px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,cursor:hasPrev?"pointer":"not-allowed",opacity:hasPrev?1:0.35,fontSize:13,color:C.ink,fontFamily:sans}}>
            <ChevronLeft size={14}/>{hasPrev?MODS[activeIdx-1].badge:"Início"}
          </button>
          {!isMobile && (
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              {MODS.map((m,i)=> <div key={m.id} style={{width:i===activeIdx?20:6,height:6,borderRadius:999,background:done(m.id)?C.green:i===activeIdx?C.terra:C.border,transition:"width 0.2s,background 0.2s"}}/>)}
            </div>
          )}
          <button onClick={goNext} disabled={!hasNext} style={{display:"flex",alignItems:"center",gap:7,padding:isMobile?"9px 12px":"9px 16px",background:hasNext?C.ink:C.border,color:hasNext?C.white:C.muted,border:"none",borderRadius:10,cursor:hasNext?"pointer":"not-allowed",fontSize:13,fontWeight:500,fontFamily:sans}}>
            {hasNext?MODS[activeIdx+1].badge:"Guia concluído!"}<ChevronRight size={14}/>
          </button>
        </footer>
      </main>
    </div>
  );
}
