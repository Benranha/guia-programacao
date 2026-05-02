import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, ArrowRight, RotateCcw, ChevronRight, ChevronLeft, Circle, Menu, X } from "lucide-react";
import { useProgress } from "./contexts/useProgress.js";
import { useAuth } from "./contexts/useAuth.js";
import { useIsMobile } from "./lib/useMediaQuery.js";
import UserMenu from "./components/UserMenu.jsx";
import AnonBanner from "./components/AnonBanner.jsx";
import AuthPage from "./components/AuthPage.jsx";

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
      </div>
    </div>
  );
}

// ── module data ───────────────────────────────────────────────────────────────
const MODS=[
{id:"mod0",badge:"Módulo 0",color:"#B85438",time:"~50 min",
t1:"Você já",t2:"programa.",
subtitle:"Antes de qualquer linguagem, descubra que o raciocínio por trás já está em você.",
sections:[
{num:"1",label:"Definição",sc:"#7F77DD",title:"O que é programar?",
body:"Programar é dar instruções tão claras que até alguém completamente literal consiga seguir sem errar. Um computador não interpreta, não adivinha e não preenche lacunas.",
x:{t:"n",e:"💡",tx:"A parte mais importante da programação não é a linguagem — é o raciocínio. Toda sintaxe se aprende em dias. O raciocínio lógico é o que leva meses.",bg:C.purpleLight,tc:"#3C3489"}},
{num:"2",label:"Comparação",sc:"#1D9E75",title:"Prompt, pseudocódigo e código",
body:"Um prompt bem escrito e um algoritmo têm estrutura idêntica: objetivo claro, parâmetros, restrições. A diferença não é a inteligência — é só a linguagem usada.",
x:{t:"tb",h:["","Prompt","Pseudocódigo","Python"],r:[["Executa","IA","Ninguém","Computador"],["Linguagem","Natural","Estruturada","Formal"],["Você usa","Sim","Módulo 1","Módulo 3"]]}},
{num:"3",label:"Circunstâncias",sc:"#D47F1A",title:"Por que aprender se a IA já escreve código?",
body:"A IA escreve código — mas quem dirige a IA precisa entender o resultado. Quem sabe ler código corrige a IA na hora. Quem não sabe fica preso em cada ajuste.",
x:{t:"n",e:"🤖",tx:"O papel do programador está mudando de 'quem escreve código' para 'quem sabe o que o código deve fazer'.",bg:"#EEF4FB",tc:"#0C3460"}},
{num:"4",label:"Relação",sc:"#3B8BD4",title:"Onde este módulo se encaixa",
body:"Este módulo estabelece que o raciocínio algorítmico já existe antes de qualquer linguagem.",
x:{t:"c",lang:"Mapa de conexões",code:"Módulo 0\n  ├── Alimenta:     Módulo 1 (lógica em pseudocódigo)\n  └── Prepara para: todos os outros módulos"}},
{num:"5",label:"Testemunho",sc:"#D4537E",title:"Quem já esteve no mesmo lugar",
body:"Sasha Laundy é designer e engenheira de software. Deu uma palestra na PyCon 2013 vinda do design, não da engenharia.",
x:{t:"q",q:"A coisa que mais me surpreendeu ao aprender a programar foi perceber o quanto do raciocínio eu já fazia. Só não tinha nome para ele.",a:"Sasha Laundy",r:"Designer → Engenheira · PyCon 2013"}},
],
act:{type:"q",qs:[
{q:"Qual dessas sequências é um algoritmo válido?",o:["Azul, cachorro, sete","Acorde → escove os dentes → tome café → saia","Feliz, janela, laranja","Corra, pensar, bonito"],a:1,ok:"Exato! Cada passo leva ao próximo em direção a um objetivo claro.",no:"Um algoritmo tem ordem e objetivo. Qual lista tem cada item levando ao próximo?"},
{q:"\"Legenda pro Instagram, tom descontraído, máx 3 linhas, emoji no final, sem hashtags.\" Quantas instruções distintas?",o:["2","3","5","7"],a:2,ok:"Isso! As 5: tema, tom, limite, emoji, sem hashtags. Você já especifica parâmetros.",no:"Conte cada especificação: tema, tom, tamanho, o que adicionar, o que remover."},
{q:"Por que entender código é valioso mesmo que a IA escreva código para você?",o:["Para impressionar","A IA vai ser desativada","Para dirigir a IA com precisão e corrigir erros","Não é — a IA faz tudo melhor"],a:2,ok:"Perfeito. Toda ferramenta funciona melhor nas mãos de quem entende o resultado.",no:"Quando a IA gera código errado, o que diferencia quem resolve de quem fica travado?"},
{q:"No Canva, você define posição, tamanho e cor de cada elemento. Isso é:",o:["Arte pura — sem lógica","Dar instruções precisas a um sistema","Matemática avançada","IA gerando arte"],a:1,ok:"Exatamente. Cada ajuste no Canva é uma instrução para um sistema.",no:"Definir posição, tamanho e cor é emitir instruções para um sistema."},
]}},

{id:"modExtra",badge:"Módulo Extra",color:"#7F77DD",time:"~30 min",hasInstall:true,
t1:"Configurando",t2:"seu ambiente.",
subtitle:"O VS Code é onde todo o código deste guia vai ser escrito. Instale uma vez, use para sempre.",
sections:[
{num:"1",label:"Definição",sc:"#7F77DD",title:"O que é um editor de código?",
body:"Um editor de código é o espaço onde você escreve e organiza seu código — como o Canva para design. Qualquer editor de texto serviria, mas sem realce de sintaxe e autocomplete seria como montar um layout no Word.",
x:{t:"n",e:"💡",tx:"Realce de sintaxe colore palavras de acordo com o que fazem no código. Reduz erros e acelera a leitura.",bg:C.purpleLight,tc:"#3C3489"}},
{num:"2",label:"Comparação",sc:"#1D9E75",title:"VS Code vs. outras opções",
body:"O VS Code é gratuito, extensível e usado por 73% dos profissionais globalmente — iniciantes e seniores na mesma ferramenta.",
x:{t:"tb",ac:"#7F77DD",h:["","VS Code","Bloco de notas","Replit"],r:[["Extensões","Milhares","Nenhuma","Nenhuma"],["Sem internet","Sim","Sim","Não"],["IA integrada","Sim (Copilot)","Não","Parcial"]]}},
{num:"3",label:"Circunstâncias",sc:"#D47F1A",title:"Extensões essenciais",
body:"Instale as 5 extensões abaixo com Ctrl+Shift+X (Windows/Linux) ou Cmd+Shift+X (Mac).",
x:{t:"c",lang:"Extensões",code:"1. Portuguese (Brazil)  → interface em português\n2. Prettier             → formata o código ao salvar\n3. Live Server          → HTML no navegador em tempo real\n4. Python (Microsoft)   → execução e debug de Python\n5. Color Highlight      → mostra cores CSS no editor"}},
{num:"4",label:"Relação",sc:"#3B8BD4",title:"Onde o VS Code se encaixa",
body:"Este módulo é infraestrutura pura — sem conteúdo técnico novo. Garante que o ambiente esteja pronto antes de precisar.",
x:{t:"c",lang:"Necessário para",code:"├── Módulo 2 (HTML + CSS com Live Server)\n├── Módulo 3 (Python com execução local)\n└── Módulos GitHub e MySQL"}},
{num:"5",label:"Testemunho",sc:"#D4537E",title:"Por que o mundo usa o mesmo editor",
body:"Stack Overflow Developer Survey 2023 com 90.000+ devs: VS Code é o editor preferido por 73,3% dos profissionais.",
x:{t:"q",ac:"#7F77DD",q:"O mais surpreendente não é que iniciantes usam o VS Code. É que engenheiros com 15 anos de experiência usam o mesmo. Não existe 'graduar' para uma ferramenta melhor.",a:"Stack Overflow Developer Survey 2023",r:"90.000+ desenvolvedores"}},
],
act:{type:"c",title:"Colocando o ambiente no ar",sub:"Marque cada item conforme for concluindo.",msg:"VS Code instalado, extensões no lugar, primeiro arquivo criado. Pronto para o Módulo 1.",
steps:[
{id:"i1",l:"VS Code instalado e aberto"},{id:"i2",l:"Extensão Portuguese (Brazil) instalada"},{id:"i3",l:"Extensão Prettier instalada"},{id:"i4",l:"Extensão Live Server instalada"},{id:"i5",l:"Extensão Python instalada"},{id:"i6",l:"Extensão Color Highlight instalada"},{id:"i7",l:"Pasta 'guia-programacao' criada em Documentos"},{id:"i8",l:"Arquivo 'ola.html' criado dentro da pasta"},{id:"i9",l:"Live Server aberto — arquivo aparece no navegador"},
]}},

{id:"mod1",badge:"Módulo 1",color:"#1D9E75",time:"~2h",
t1:"Raciocínio",t2:"e lógica.",
subtitle:"As três estruturas que formam qualquer algoritmo — em qualquer linguagem, em qualquer época.",
sections:[
{num:"1",label:"Definição",sc:"#7F77DD",title:"O que é lógica de programação?",
body:"Lógica de programação é estruturar instruções para um computador seguir. É anterior a qualquer linguagem. Todo programa já existido usa apenas três estruturas: sequência, condição e repetição.",
x:{t:"n",e:"💡",tx:"Sequência: passos em ordem. Condição: executar se algo for verdadeiro. Repetição: executar várias vezes. Isso é tudo.",bg:"#E1F5EE",tc:"#085041"}},
{num:"2",label:"Comparação",sc:"#1D9E75",title:"As três estruturas na prática",
body:"Qualquer algoritmo é uma combinação dessas três estruturas — nem mais, nem menos.",
x:{t:"c",lang:"Sequência → Condição → Repetição",code:"# Sequência\nLEIA nome\nESCREVA 'Olá, ' + nome\n\n# Condição\nSE idade >= 18 ENTÃO\n  ESCREVA 'Pode dirigir'\nSENÃO\n  ESCREVA 'Ainda não'\nFIM SE\n\n# Repetição\nPARA i DE 1 ATÉ 5 FAÇA\n  ESCREVA i\nFIM PARA"}},
{num:"3",label:"Circunstâncias",sc:"#D47F1A",title:"Variáveis e operadores",
body:"Variável é um espaço com nome que armazena um valor. O valor pode mudar; o nome permanece — como uma caixinha com etiqueta.",
x:{t:"c",lang:"Variáveis e operadores",code:"nome  = 'Ana'      ← texto (string)\nidade = 18         ← número inteiro\nmaior = VERDADEIRO ← booleano\n\nidade >= 18        → verdadeiro se 18 ou mais\nidade >= 18 E nome = 'Ana' → ambos verdadeiros"}},
{num:"4",label:"Relação",sc:"#3B8BD4",title:"Da lógica ao Python",
body:"As estruturas aqui em pseudocódigo são exatamente o que você escreve em Python. Só a sintaxe muda.",
x:{t:"c",lang:"Pseudocódigo → Python",code:"SE idade >= 18 ENTÃO  →  if idade >= 18:\n  ESCREVA 'ok'        →      print('ok')\nFIM SE               →  (indentação = bloco)"}},
{num:"5",label:"Testemunho",sc:"#D4537E",title:"A base que não muda",
body:"Dijkstra desenvolveu algoritmos usados em GPS e redes até hoje. A lógica que ele defendia — sequência, condição, repetição — é a mesma que você aprende agora.",
x:{t:"q",ac:"#1D9E75",q:"Ciência da computação não é sobre computadores, assim como astronomia não é sobre telescópios. É sobre estruturas, algoritmos e a arte de resolver problemas.",a:"Edsger Dijkstra",r:"Cientista da computação · Prêmio Turing 1972"}},
],
act:{type:"q",qs:[
{q:"Você precisa verificar se uma pessoa pode votar (mínimo 16 anos). Qual estrutura lógica é essencial?",o:["Sequência simples","Condição (SE/SENÃO) — verificar se idade >= 16","Repetição — verificar várias vezes","Nenhuma — o computador descobre"],a:1,ok:"Exato! Verificar 'SE idade >= 16' é o núcleo. Condição é a estrutura certa quando o resultado depende de uma verificação.",no:"O resultado depende de uma verificação? Quando algo precisa ser verdadeiro para uma ação acontecer, qual estrutura entra em cena?"},
{q:"Qual pseudocódigo resolve 'exibir os números de 1 a 5 automaticamente'?",o:["ESCREVA 1 / ESCREVA 2 / ESCREVA 3 / ESCREVA 4 / ESCREVA 5","PARA i DE 1 ATÉ 5 FAÇA / ESCREVA i / FIM PARA","SE i = 5 ENTÃO / ESCREVA i","variavel = 5 / ESCREVA variavel"],a:1,ok:"Correto! O loop PARA é ideal quando você sabe quantas repetições precisa. Resolve em qualquer escala.",no:"Quando repetir algo um número conhecido de vezes, qual estrutura existe para isso?"},
{q:"O que é uma variável em lógica de programação?",o:["Um valor fixo que nunca muda","Um espaço com nome que armazena um valor que pode ser acessado depois","Um tipo especial de loop","Uma condição SE/SENÃO"],a:1,ok:"Exatamente. Uma variável é como uma caixinha com etiqueta: você guarda algo, dá um nome, e usa o nome para acessar o valor depois.",no:"Uma variável não é fixa (isso seria constante). O que define uma variável é armazenar um valor identificado por um nome."},
{q:"Qual a diferença entre PARA (for) e ENQUANTO (while)?",o:["São a mesma estrutura","PARA repete número definido de vezes; ENQUANTO repete enquanto condição for verdadeira","ENQUANTO é mais rápido","PARA é Python; ENQUANTO é JavaScript"],a:1,ok:"Perfeito. PARA quando você sabe quantas vezes: 'repita 10 vezes'. ENQUANTO quando não sabe: 'repita até a senha estar correta'.",no:"A diferença está na previsibilidade: quando você sabe o número exato, usa uma; quando depende de condição, usa outra."},
]}},

{id:"mod2",badge:"Módulo 2",color:"#D47F1A",time:"~2h",
t1:"HTML + CSS —",t2:"o Canva do código.",
subtitle:"Toda página web do mundo é feita com HTML e CSS. Você vai criar a sua antes do fim deste módulo.",
sections:[
{num:"1",label:"Definição",sc:"#7F77DD",title:"HTML e CSS: estrutura e estilo",
body:"Se uma página web fosse uma casa: HTML é a construção — paredes, janelas, porta. CSS é a decoração — cor das paredes, estilo dos móveis, iluminação. Você não pode decorar sem paredes.",
x:{t:"tb",h:["","HTML","CSS"],r:[["Significa","HyperText Markup Language","Cascading Style Sheets"],["Para quê","Definir o que existe na página","Como cada coisa aparece"],["Analogia","Esqueleto e estrutura","Pele, roupa, visual"],["Arquivo","index.html","style.css"]]}},
{num:"2",label:"Comparação",sc:"#1D9E75",title:"HTML + CSS vs. Canva vs. Word",
body:"O Canva é mais rápido para criar artes — mas o que você cria só existe dentro do Canva. Com HTML + CSS, o que você cria existe na internet, em qualquer navegador.",
x:{t:"tb",h:["","HTML + CSS","Canva","Word"],r:[["Publica na web","Sim, qualquer servidor","Na plataforma Canva","Limitado"],["Controle","Total","Parcial","Baixo"],["Aprende lógica","Sim","Não","Não"]]}},
{num:"3",label:"Circunstâncias",sc:"#D47F1A",title:"Tags e propriedades essenciais",
body:"HTML funciona com tags — palavras entre colchetes angulares. CSS aplica visual através de propriedades.",
xs:[
{t:"c",lang:"Tags HTML mais usadas",code:"<h1>Título principal</h1>     ← h1 a h6\n<p>Um parágrafo.</p>           ← parágrafos\n<a href='url'>Link</a>         ← link\n<img src='foto.jpg' alt='x'>   ← imagem\n<ul><li>Item</li></ul>         ← lista\n<div>Container</div>           ← caixa"},
{t:"c",lang:"Propriedades CSS mais usadas",code:"body {\n  background-color: #F8F6F0;\n  font-family: Georgia, serif;\n  font-size: 16px;\n  padding: 2rem;\n}\nh1 { color: #B85438; font-size: 2rem; }\n.cartao { border-radius: 12px; padding: 1.5rem; }"},
]},
{num:"4",label:"Relação",sc:"#3B8BD4",title:"HTML + CSS no guia",
body:"HTML e CSS são a base visual do guia. Tudo que você aprende em UI/UX (Módulo 4) será aplicado aqui.",
x:{t:"c",lang:"Dependências",code:"Módulo 2\n  ├── Depende de:  Módulo Extra (VS Code + Live Server)\n  ├── Leva a:      Módulo 4 (UI/UX aplicado via CSS)\n  └── Conecta com: Módulo 3 (Python pode gerar HTML)"}},
{num:"5",label:"Testemunho",sc:"#D4537E",title:"A linguagem que construiu a internet",
body:"Tim Berners-Lee criou o HTML em 1989 para compartilhar documentos entre pesquisadores. Não fazia ideia de que criaria a base de toda a internet moderna.",
x:{t:"q",ac:"#D47F1A",q:"A web é mais uma invenção social do que técnica. Eu a projetei para ter um efeito social — para ajudar as pessoas a trabalharem juntas.",a:"Tim Berners-Lee",r:"Inventor do HTML e da World Wide Web · 1989"}},
],
act:{type:"c",title:"Construa sua primeira página",sub:"Siga os passos em ordem no VS Code. Cada item desbloqueia o próximo.",msg:"Você criou uma página web real do zero com HTML e CSS. Ela roda no navegador e pode ser publicada na internet.",
steps:[
{id:"h1",l:"Crie o arquivo index.html na pasta guia-programacao"},{id:"h2",l:"Adicione a estrutura basica HTML: DOCTYPE, html, head, body"},{id:"h3",l:"Adicione um h1 com seu nome dentro do body"},{id:"h4",l:"Adicione um parágrafo sobre você"},{id:"h5",l:"Adicione uma lista com 3 habilidades suas"},{id:"h6",l:"Crie o arquivo style.css na mesma pasta"},{id:"h7",l:"Linke o CSS no HTML com a tag link dentro do head"},{id:"h8",l:"No CSS, mude a cor de fundo do body"},{id:"h9",l:"Defina uma fonte e tamanho para o texto"},{id:"h10",l:"Adicione padding e margem para o conteúdo respirar"},{id:"h11",l:"Abra com o Live Server e veja no navegador"},
]}},

{id:"mod3",badge:"Módulo 3",color:"#3B8BD4",time:"~2h",
t1:"Python —",t2:"a linguagem principal.",
subtitle:"Com a lógica do Módulo 1 como base, o Python vai parecer pseudocódigo que o computador realmente executa.",
sections:[
{num:"1",label:"Definição",sc:"#7F77DD",title:"O que é Python?",
body:"Python é uma linguagem de alto nível criada em 1991. 'Alto nível' significa que é próxima da linguagem humana. Olha como Python se parece com pseudocódigo:",
xs:[
{t:"tb",h:["Pseudocódigo (Módulo 1)","Python (Módulo 3)"],r:[["SE idade >= 18 ENTÃO","if idade >= 18:"],["  ESCREVA 'ok'","    print('ok')"],["PARA i DE 1 ATÉ 5 FAÇA","for i in range(1, 6):"],["  ESCREVA i","    print(i)"]]},
]},
{num:"2",label:"Comparação",sc:"#1D9E75",title:"Python vs. outras linguagens",
body:"Para quem começa com foco em IA, automação e dados, Python é a escolha certa. JavaScript será a segunda linguagem natural para interfaces web.",
x:{t:"tb",h:["","Python","JavaScript","Java"],r:[["Curva inicial","Baixa","Média","Alta"],["Lê como inglês","Muito","Razoável","Menos"],["IA e dados","Líder","Parcial","Pouco"]]}},
{num:"3",label:"Circunstâncias",sc:"#D47F1A",title:"Python na prática",
body:"Variáveis, condicionais, loops e funções em Python seguem a mesma lógica do Módulo 1 — só a sintaxe é diferente.",
xs:[
{t:"c",lang:"Variáveis e tipos",code:"nome  = 'Ana'    # string\nidade = 18       # int\naltura = 1.65    # float\nmaior = True     # bool\nprint(nome)      # Ana"},
{t:"c",lang:"Condicionais e loops",code:"if idade >= 18:\n    print('Maior de idade')\nelse:\n    print('Menor de idade')\n\nhabilidades = ['design', 'Python', 'UX']\nfor h in habilidades:\n    print(h)"},
{t:"c",lang:"Funções",code:"def saudar(nome):\n    return 'Olá, ' + nome + '!'\n\nprint(saudar('Ana'))   # Olá, Ana!"},
]},
{num:"4",label:"Relação",sc:"#3B8BD4",title:"Python no guia",
body:"Python é o eixo central do guia. Conecta a lógica (Módulo 1) com IA, dados e os módulos avançados.",
x:{t:"c",lang:"Dependências",code:"Módulo 3\n  ├── Depende de:  Módulo 1 (mesmas estruturas, nova sintaxe)\n  ├── Leva a:      Módulo GitHub (versionar o código)\n  └── Conecta com: Módulo MySQL (Python + banco de dados)"}},
{num:"5",label:"Testemunho",sc:"#D4537E",title:"A linguagem que Guido construiu para humanos",
body:"Guido van Rossum nomeou Python em homenagem ao grupo de comédia Monty Python — não à cobra. A filosofia: código legível vale mais do que código otimizado que só você entende.",
x:{t:"q",ac:"#3B8BD4",q:"Python é uma linguagem para adultos que tratam outros adultos como adultos. Eu a projetei para ser legível, não eficiente para o compilador.",a:"Guido van Rossum",r:"Criador do Python · 1991"}},
],
act:{type:"q",qs:[
{q:"O que o código abaixo imprime?\n\nprint(2 + 3 * 4)",o:["20","14","24","Erro — não pode misturar + e *"],a:1,ok:"Correto! Multiplicação antes de adição: 3 * 4 = 12, depois 2 + 12 = 14. Python segue as regras matemáticas.",no:"Python segue precedência: multiplicação antes de adição. Calcule 3 * 4 primeiro, depois some 2."},
{q:"O que o código abaixo imprime?\n\nnome = 'Ana'\nprint('Olá, ' + nome + '!')",o:["Olá, nome!","Olá, Ana!","Ana","Erro"],a:1,ok:"Exato! O + entre strings as concatena. 'Olá, ' + 'Ana' + '!' = 'Olá, Ana!'.",no:"O + entre strings as junta. Leia: junte 'Olá, ' com o valor de nome e depois com '!'."},
{q:"O que o código abaixo imprime?\n\nfor i in range(4):\n    print(i)",o:["1 2 3 4","0 1 2 3","4","0 1 2 3 4"],a:1,ok:"Correto! range(4) gera 0, 1, 2, 3 — começa em 0 e para antes do 4.",no:"range(4) começa em 0 e gera 4 números: 0, 1, 2, 3. Em Python, contagem começa em 0."},
{q:"O que o código abaixo imprime?\n\ndef dobrar(n):\n    return n * 2\n\nprint(dobrar(5))",o:["5","dobrar(5)","10","Erro — falta ponto e vírgula"],a:2,ok:"Perfeito! dobrar(5) → n=5 → retorna 5 * 2 → print() exibe 10.",no:"Siga o fluxo: dobrar(5) é chamado, n recebe 5, a função retorna 5 * 2, print() exibe o resultado."},
]}},

{id:"mod4",badge:"Módulo 4",color:"#D4537E",time:"~2h",
t1:"UI e UX —",t2:"design com propósito.",
subtitle:"Você já tem intuição estética. Aqui você aprende a nomear, analisar e replicar o que faz uma interface boa.",
sections:[
{num:"1",label:"Definição",sc:"#7F77DD",title:"UI vs. UX",
body:"UI (User Interface) é o que o usuário vê e toca — botões, cores, tipografia, layout. UX (User Experience) é o que o usuário experiencia ao usar — facilidade, clareza, satisfação.",
x:{t:"n",e:"🚗",tx:"Analogia: UI é o design do carro — cor, formato, interior. UX é a experiência de dirigir — como o volante responde, se a visibilidade é boa. Um carro pode ser lindo (UI) e desconfortável de dirigir (UX ruim).",bg:C.terraLight,tc:C.terraDark}},
{num:"2",label:"Comparação",sc:"#1D9E75",title:"As 10 Heurísticas de Nielsen",
body:"Jakob Nielsen publicou em 1994 dez princípios de usabilidade que ainda são o padrão da indústria.",
x:{t:"tb",h:["#","Heurística","Em palavras simples"],r:[["1","Visibilidade do status","Sempre diga o que está acontecendo"],["2","Correspondência com o mundo real","Use palavras que o usuário conhece"],["3","Controle e liberdade","Permita desfazer ações"],["4","Consistência e padrões","Mesma coisa = mesmo visual"],["5","Prevenção de erros","Previna antes de corrigir"],["6","Reconhecimento > Recordação","Mostre opções, não force memorização"],["7","Flexibilidade","Atalhos para experientes"],["8","Design minimalista","Menos é mais"],["9","Recuperação de erros","Mensagens úteis e humanas"],["10","Ajuda e documentação","Fácil de encontrar quando necessária"]]}},
{num:"3",label:"Circunstâncias",sc:"#D47F1A",title:"Princípios de UI: hierarquia e consistência",
body:"Enquanto as heurísticas são sobre UX, estes princípios são sobre o visual da interface.",
x:{t:"tb",h:["Princípio","O que é","Exemplo"],r:[["Hierarquia visual","Importantes têm mais destaque","Título grande, subtítulo médio, corpo pequeno"],["Contraste","Texto e fundo com diferença legível","Texto escuro em fundo claro"],["Consistência","Mesma função = mesma aparência","Todos os botões principais em azul"],["Acessibilidade","Funciona para todos","Contraste WCAG, textos alternativos"]]}},
{num:"4",label:"Relação",sc:"#3B8BD4",title:"UI/UX no guia",
body:"UI/UX conecta tudo que foi aprendido até aqui com o usuário final. Todo código serve alguém.",
x:{t:"c",lang:"Dependências",code:"Módulo 4\n  ├── Depende de:  Módulo 2 (HTML+CSS é onde UI/UX vira código)\n  ├── Leva a:      Projeto integrador (aplicar tudo junto)\n  └── Conecta com: todos os módulos — toda interface tem UX"}},
{num:"5",label:"Testemunho",sc:"#D4537E",title:"O livro que mudou o design de produtos",
body:"Don Norman cunhou o termo 'user experience' na Apple nos anos 90. O livro dele analisa por que produtos cotidianos são difíceis de usar e como o design poderia evitar isso.",
x:{t:"q",ac:"#D4537E",q:"Quando as coisas funcionam bem, não notamos. É só quando funcionam mal que nos damos conta de que design existia o tempo todo.",a:"Don Norman",r:"Psicólogo cognitivo · autor de 'The Design of Everyday Things' · 1988"}},
],
act:{type:"q",qs:[
{q:"Você abre um app de delivery. O botão de confirmar pedido está no canto superior esquerdo, em fonte pequena e cor cinza. Qual problema de UX isso representa?",o:["Nenhum — o usuário encontra eventualmente","Viola a visibilidade — a ação principal não tem destaque compatível com sua importância","O problema é de UI, não de UX","O app precisa de mais cores"],a:1,ok:"Exato! O botão mais importante precisa de destaque proporcional — tamanho, cor e posição claros. É a heurística de visibilidade do status.",no:"Quando a ação mais importante não tem destaque, o usuário precisa procurar por ela. Qual heurística de Nielsen trata isso?"},
{q:"Qual a diferença entre UI e UX?",o:["São a mesma coisa","UI é o que o usuário vê (botões, cores, layout); UX é o que o usuário experiencia (fluidez, clareza, satisfação)","UI é para web; UX é para mobile","UX é mais avançado — profissionais migram de UI para UX"],a:1,ok:"Perfeito! UI = visual. UX = a jornada completa. Uma tela pode ser linda (UI) e frustrante de usar (UX ruim).",no:"Releia a Seção 1. A distinção: UI é o que você vê, UX é o que você sente ao usar. Porta bonita (UI) e difícil de abrir (UX ruim)."},
{q:"Um formulário com 20 campos não indica quais estão errados quando o usuário tenta enviar. Qual heurística é violada?",o:["Design minimalista","Ajuda para reconhecer e recuperar erros","Flexibilidade de uso","Consistência"],a:1,ok:"Correto! O sistema deve ajudar o usuário a entender e corrigir erros — não apenas rejeitar o formulário sem explicação.",no:"Quando um sistema não explica o que deu errado nem como corrigir, qual heurística de Nielsen está sendo violada?"},
{q:"Você usa 7 fontes diferentes, 5 paletas de cores e 4 tamanhos de botão numa mesma página. Qual princípio de UI isso viola?",o:["Nenhum — variedade é criativa","Consistência — mesma função deve ter mesma aparência; variação sem propósito cria ruído","Acessibilidade","Responsividade"],a:1,ok:"Exato! Consistência: mesma função, mesma aparência. Variação excessiva cria ruído visual e dificulta o aprendizado do padrão.",no:"Se cada botão parece diferente, o usuário não sabe qual padrão seguir. Qual princípio trata isso?"},
]}},

{id:"modProj",badge:"Projeto",color:"#D85A30",time:"~3h",
t1:"Projeto",t2:"integrador.",
subtitle:"Tudo que você aprendeu, aplicado em uma página real que você vai querer mostrar para as pessoas.",
pillars:[{l:"Lógica",c:"#1D9E75"},{l:"HTML+CSS",c:"#D47F1A"},{l:"Python",c:"#3B8BD4"},{l:"UI/UX",c:"#D4537E"},{l:"VS Code",c:"#7F77DD"}],
sections:[
{num:"B",label:"Briefing",sc:"#D85A30",title:"O que você vai construir",
body:"Crie uma página de portfólio pessoal que reúna seus projetos, sua identidade visual e um script Python funcional relacionado ao tema. Não existe um resultado certo — existe o seu resultado.",
xs:[
{t:"n",e:"🎨",tx:"Módulo 1 e 2: estrutura lógica das seções, fluxo de conteúdo, hierarquia da informação.",bg:C.terraLight,tc:C.terraDark},
{t:"n",e:"💻",tx:"Módulo 2: HTML para estrutura, CSS para visual — paleta, tipografia, espaçamento.",bg:"#FAEEDA",tc:"#633806"},
{t:"n",e:"🐍",tx:"Módulo 3: um script Python — lista de obras, calculadora de preços de freela, ou gerador de paletas.",bg:"#E6F1FB",tc:"#042C53"},
{t:"n",e:"✨",tx:"Módulo 4: as 10 heurísticas de Nielsen como checklist de revisão antes de entregar.",bg:"#FBEAF0",tc:"#4B1528"},
]},
{num:"E",label:"Estrutura",sc:"#3B8BD4",title:"Mínimo sugerido",
body:"A página precisa de pelo menos 4 seções e um script Python funcional.",
xs:[
{t:"c",lang:"index.html",code:"<header>\n  <!-- Seu nome + navegação -->\n</header>\n<section id='sobre'>\n  <!-- Quem você é, o que você faz -->\n</section>\n<section id='trabalhos'>\n  <!-- Galeria de projetos ou artes -->\n</section>\n<section id='contato'>\n  <!-- Email, redes sociais -->\n</section>"},
{t:"c",lang:"exemplo_python.py",code:"obras = [\n    {'titulo': 'Logo para café', 'valor': 350},\n    {'titulo': 'Banner Instagram', 'valor': 150},\n]\ntotal = 0\nfor obra in obras:\n    print(obra['titulo'], '→ R$', obra['valor'])\n    total += obra['valor']\nprint('Total: R$', total)"},
]},
],
act:{type:"c",title:"Lista de entrega",sub:"Complete cada etapa em ordem. Quando todas estiverem marcadas, o guia está concluído.",msg:"Parabéns! Você criou um portfólio web real com HTML, CSS, Python e boas práticas de UI/UX. Este é o ponto de partida — não o fim. GitHub e MySQL chegam em breve.",
steps:[
{id:"p1",l:"Escolha o tema: portfólio de artes, página pessoal ou apresentação de projeto"},{id:"p2",l:"Rascunhe a estrutura no papel — mínimo: cabeçalho, sobre você, trabalhos, contato"},{id:"p3",l:"Use as 10 heurísticas de Nielsen como guia das decisões de design"},{id:"p4",l:"Crie index.html e style.css no VS Code"},{id:"p5",l:"Implemente o HTML com pelo menos 4 seções distintas"},{id:"p6",l:"Aplique CSS com paleta de cores coerente — máximo 3 cores principais"},{id:"p7",l:"Garanta hierarquia visual: h1 maior que h2, h2 maior que parágrafo"},{id:"p8",l:"Escreva um script Python simples relacionado ao tema"},{id:"p9",l:"Teste com Live Server e ajuste o que parecer errado"},{id:"p10",l:"Revise com as heurísticas: consistente? Clara? Sem erros visuais?"},{id:"p11",l:"Mostre para uma pessoa e anote o que ela achou difícil de entender"},
]}},
];

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
