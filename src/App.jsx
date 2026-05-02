import { useEffect, useState } from "react";
import {
  Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, ChevronRight, ChevronLeft,
  Menu, X, Lock, Sun, Moon, Trophy, Flame, BookOpen,
} from "lucide-react";
import { useProgress } from "./contexts/useProgress.js";
import { useAuth } from "./contexts/useAuth.js";
import { useIsMobile } from "./lib/useMediaQuery.js";
import { T, sans, mono, display, PILLARS, useTheme } from "./lib/theme.js";
import UserMenu from "./components/UserMenu.jsx";
import AnonBanner from "./components/AnonBanner.jsx";
import AuthPage from "./components/AuthPage.jsx";
import AskAI from "./components/AskAI.jsx";
import { MODS } from "./modules/index.js";

// ── primitives ────────────────────────────────────────────────────────────────

function Pill({ children, color, soft, mono: useMono }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: useMono ? mono : sans,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: useMono ? 0 : "0.06em",
        textTransform: useMono ? "none" : "uppercase",
        padding: "4px 10px",
        borderRadius: 999,
        background: soft || `${color}1A`,
        color: color || T.text,
      }}
    >
      {children}
    </span>
  );
}

function SectionCard({ num, label, color, title, children, mob }) {
  return (
    <article
      className="gp-card gp-fade-in"
      style={{
        padding: mob ? "1.25rem 1.1rem" : "1.75rem 1.875rem",
        marginBottom: "1rem",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: mob ? 12 : 14, flexWrap: "wrap" }}>
        <Pill color={color}>{num} · {label}</Pill>
      </header>
      <h2
        style={{
          fontSize: mob ? 19 : 22,
          fontWeight: 700,
          fontFamily: display,
          color: T.textStrong,
          margin: "0 0 0.875rem",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: mob ? 15 : 16, lineHeight: 1.7, color: T.text, fontFamily: sans }}>{children}</div>
    </article>
  );
}

function Note({ e, t, bg, tc }) {
  return (
    <div
      style={{
        background: bg || T.accentSoft,
        borderRadius: 12,
        padding: "0.875rem 1.1rem",
        margin: "0.875rem 0",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        border: `1px solid ${T.border}`,
      }}
    >
      <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1.4 }}>{e}</span>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: tc || T.text, fontFamily: sans }}>{t}</div>
    </div>
  );
}

function Code({ lang, code, mob }) {
  return (
    <div
      style={{
        background: T.codeBg,
        borderRadius: 12,
        padding: mob ? "0.85rem 0.95rem" : "1.1rem 1.35rem",
        margin: "1rem 0",
        overflowX: mob ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        border: `1px solid ${T.codeBorder}`,
      }}
    >
      {lang && (
        <div
          style={{
            fontSize: 10,
            color: "rgba(236,234,226,0.55)",
            fontFamily: mono,
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
          }}
        >
          {lang}
        </div>
      )}
      <pre
        style={{
          margin: 0,
          fontFamily: mono,
          fontSize: mob ? 12 : 13.5,
          lineHeight: 1.7,
          color: T.codeText,
          whiteSpace: mob ? "pre-wrap" : "pre",
          wordBreak: mob ? "break-word" : "normal",
          overflowWrap: mob ? "anywhere" : "normal",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function Table({ h, r, ac, mob }) {
  const cellPad = mob ? "8px 9px" : "10px 14px";
  const cellStyle = { padding: cellPad, borderBottom: `1px solid ${T.border}`, lineHeight: 1.5, wordBreak: "break-word", overflowWrap: "anywhere" };
  return (
    <div style={{ margin: "1rem 0", borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: mob ? 12 : 14, fontFamily: sans, tableLayout: "fixed" }}>
        <thead>
          <tr>
            {h.map((x, i) => (
              <th
                key={i}
                style={{
                  background: i === 0 ? T.surface2 : (ac || T.accent),
                  color: i === 0 ? T.textMuted : "#fff",
                  padding: cellPad,
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: mob ? 11 : 13,
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {r.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? T.surface : T.surface2 }}>
              {row.map((cell, j) => (
                <td key={j} style={{ ...cellStyle, color: j === 0 ? T.textMuted : T.text, fontWeight: j === 0 ? 500 : 400 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Quote({ q, a, r, ac, mob }) {
  return (
    <div
      style={{
        background: T.codeBg,
        borderRadius: 16,
        padding: mob ? "1.25rem 1.1rem" : "1.625rem 1.875rem",
        margin: "1rem 0",
        border: `1px solid ${T.codeBorder}`,
      }}
    >
      <div style={{ fontSize: mob ? 40 : 52, lineHeight: 0.9, color: ac || T.accent, fontFamily: display, marginBottom: 8, userSelect: "none", fontWeight: 700 }}>&ldquo;</div>
      <p style={{ fontSize: mob ? 15 : 17, lineHeight: 1.65, margin: "0 0 0.875rem", fontFamily: display, fontStyle: "italic", color: T.codeText, overflowWrap: "anywhere" }}>{q}</p>
      <div style={{ fontWeight: 600, fontSize: mob ? 13 : 14, color: "#fff", fontFamily: sans }}>{a}</div>
      <div style={{ fontSize: 12, color: "rgba(236,234,226,0.55)", fontFamily: sans, marginTop: 2 }}>{r}</div>
    </div>
  );
}

function Xtra({ x, ac, mob }) {
  if (!x) return null;
  if (x.t === "n") return <Note e={x.e} t={x.tx} bg={x.bg} tc={x.tc} />;
  if (x.t === "c") return <Code lang={x.lang} code={x.code} mob={mob} />;
  if (x.t === "tb") return <Table h={x.h} r={x.r} ac={x.ac || ac} mob={mob} />;
  if (x.t === "q") return <Quote q={x.q} a={x.a} r={x.r} ac={x.ac || ac} mob={mob} />;
  return null;
}

// ── tutorial card ─────────────────────────────────────────────────────────────

function ErrCard({ bad, fix, why }) {
  return (
    <div
      style={{
        background: T.surface2,
        borderRadius: 10,
        padding: "0.875rem 1rem",
        border: `1px solid ${T.border}`,
        marginBottom: "0.625rem",
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
        <span style={{ color: T.danger, fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: mono, lineHeight: 1.55 }}>✗</span>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: T.text, fontFamily: sans }}>{bad}</div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
        <span style={{ color: T.success, fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: mono, lineHeight: 1.55 }}>✓</span>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: T.text, fontFamily: sans }}>{fix}</div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: T.textMuted, fontFamily: sans, paddingLeft: 22, fontStyle: "italic" }}>{why}</div>
    </div>
  );
}

function Tutorial({ n, title, intro, code, lang, explain, errors, ac }) {
  return (
    <div
      className="gp-card"
      style={{
        padding: "1.625rem 1.875rem",
        marginBottom: "1rem",
        borderTop: `3px solid ${ac || T.accent}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.875rem", flexWrap: "wrap" }}>
        <Pill color={T.textStrong} soft={T.surface3}>Tutorial · {n}</Pill>
        <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: display, color: T.textStrong, margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      {intro && <p style={{ fontSize: 15, lineHeight: 1.7, color: T.text, fontFamily: sans, margin: "0 0 1rem" }}>{intro}</p>}
      {code && <Code lang={lang} code={code} />}
      {explain && <p style={{ fontSize: 14, lineHeight: 1.7, color: T.textMuted, fontFamily: sans, margin: "0.5rem 0 1.25rem" }}>{explain}</p>}
      {errors && errors.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: sans, marginBottom: "0.625rem" }}>
            Erros comuns
          </div>
          {errors.map((e, i) => <ErrCard key={i} bad={e.bad} fix={e.fix} why={e.why} />)}
        </div>
      )}
    </div>
  );
}

// ── quiz engine ───────────────────────────────────────────────────────────────

function Quiz({ qs, ac, onComplete, isCompleted, mob }) {
  const [ans, setAns] = useState({});
  const [sub, setSub] = useState(isCompleted);
  const ok = qs.every((_, i) => ans[i] !== undefined);
  const sc = qs.filter((q, i) => ans[i] === q.a).length;
  const pct = sc / qs.length;
  const e = pct === 1 ? "🎯" : pct >= 0.75 ? "✨" : pct >= 0.5 ? "💪" : "🌱";
  const msg = pct === 1
    ? "Resultado perfeito! Você dominou os conceitos deste módulo."
    : pct >= 0.75 ? "Muito bem! Reveja os itens marcados e siga em frente."
    : "Releia as seções com dificuldade e tente de novo.";

  return (
    <div
      className="gp-card"
      style={{
        padding: mob ? "1.25rem 1.1rem" : "1.875rem",
        marginBottom: "1.5rem",
        borderColor: `${ac || T.accent}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Pill color={T.textStrong} soft={T.surface3}>Quiz</Pill>
        <span style={{ fontSize: 12, color: T.textMuted, fontFamily: sans }}>{qs.length} perguntas</span>
      </div>
      <h2 style={{ fontSize: mob ? 22 : 26, fontWeight: 700, fontFamily: display, color: T.textStrong, margin: "0.5rem 0 0.4rem", letterSpacing: "-0.02em" }}>
        Aplique o que você leu
      </h2>
      <p style={{ fontSize: mob ? 14 : 15, color: T.textMuted, fontFamily: sans, margin: "0 0 1.5rem", lineHeight: 1.6 }}>
        Responda todas para ver seu resultado e desbloquear o próximo módulo.
      </p>

      {qs.map((q, i) => (
        <div
          key={i}
          style={{
            background: T.surface2,
            borderRadius: mob ? 12 : 14,
            padding: mob ? "1rem" : "1.375rem",
            marginBottom: "0.875rem",
            border: `1px solid ${T.border}`,
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.6, margin: "0 0 1rem", fontFamily: sans, color: T.textStrong, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: ac || T.accent,
                color: "#fff",
                borderRadius: "50%",
                width: 24,
                height: 24,
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
                marginTop: 1,
                fontFamily: mono,
              }}
            >
              {i + 1}
            </span>
            <span>{q.q}</span>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.o.map((opt, j) => {
              const sel = ans[i] === j, cor = j === q.a;
              let bg = T.surface, bd = T.border, cl = T.text, fw = 400;
              if (sub) {
                if (cor) { bg = T.successSoft; bd = T.success; cl = T.success; fw = 500; }
                else if (sel) { bg = T.dangerSoft; bd = T.danger; cl = T.danger; }
              } else if (sel) {
                bg = T.accentSoft; bd = ac || T.accent; fw = 500;
              }
              return (
                <button
                  key={j}
                  onClick={() => !sub && setAns((p) => ({ ...p, [i]: j }))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 15px",
                    background: bg,
                    border: `1.5px solid ${bd}`,
                    borderRadius: 10,
                    cursor: sub ? "default" : "pointer",
                    textAlign: "left",
                    color: cl,
                    fontFamily: sans,
                    transition: "background 120ms ease, border-color 120ms ease, transform 120ms ease",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: `2px solid ${sub && cor ? T.success : sub && sel ? T.danger : sel ? ac || T.accent : T.borderStrong}`,
                      background: sub && cor ? T.success : sub && sel && !cor ? T.danger : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {sub && cor && <CheckCircle2 size={11} color="#fff" />}
                    {sub && sel && !cor && <XCircle size={11} color="#fff" />}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, fontWeight: fw }}>{opt}</span>
                </button>
              );
            })}
          </div>
          {sub && ans[i] !== undefined && (
            <div
              style={{
                marginTop: "0.875rem",
                padding: "0.875rem 1rem",
                background: ans[i] === q.a ? T.successSoft : T.dangerSoft,
                borderRadius: 10,
                fontSize: 14,
                lineHeight: 1.6,
                color: ans[i] === q.a ? T.success : T.danger,
                fontFamily: sans,
                borderLeft: `3px solid ${ans[i] === q.a ? T.success : T.danger}`,
              }}
            >
              {ans[i] === q.a ? "✓ " + q.ok : "✗ " + q.no}
            </div>
          )}
        </div>
      ))}

      {!sub ? (
        <button
          className="gp-btn gp-btn-primary"
          onClick={() => { if (!ok) return; setSub(true); onComplete(); }}
          disabled={!ok}
          style={{ width: "100%", padding: "14px", fontSize: 15, fontWeight: 600, marginTop: 4 }}
        >
          {ok ? <>Ver resultado <ArrowRight size={16} /></> : `Responda todas (${Object.keys(ans).length}/${qs.length})`}
        </button>
      ) : (
        <div
          className="gp-pop"
          style={{
            background: pct >= 0.75 ? T.successSoft : T.accentSoft,
            border: `1px solid ${pct >= 0.75 ? T.success : T.accent}`,
            borderRadius: 16,
            padding: "1.625rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 10 }}>{e}</div>
          <div style={{ fontSize: 32, fontWeight: 800, fontFamily: display, color: T.textStrong, marginBottom: 6, letterSpacing: "-0.02em" }}>
            {sc}/{qs.length}
          </div>
          <p style={{ fontSize: 15, color: T.textMuted, fontFamily: sans, lineHeight: 1.65, maxWidth: 420, margin: "0 auto 1.25rem" }}>{msg}</p>
          <button
            className="gp-btn gp-btn-ghost"
            onClick={() => { setAns({}); setSub(false); }}
            style={{ padding: "9px 18px", fontSize: 13 }}
          >
            <RotateCcw size={13} /> Refazer
          </button>
        </div>
      )}
    </div>
  );
}

// ── checklist engine ──────────────────────────────────────────────────────────

function Checklist({ title, sub, steps, ac, msg, onComplete, onNext, isCompleted, mob }) {
  const [chk, setChk] = useState({});
  const toggle = (id) => setChk((p) => ({ ...p, [id]: !p[id] }));
  const cnt = steps.filter((s) => chk[s.id]).length;
  const done = cnt === steps.length;
  if (done && !isCompleted) onComplete();

  return (
    <div
      className="gp-card"
      style={{
        padding: mob ? "1.25rem 1.1rem" : "1.875rem",
        marginBottom: "1.5rem",
        borderColor: ac || T.accent,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Pill color={T.textStrong} soft={T.surface3}>Atividade prática</Pill>
      </div>
      <h2 style={{ fontSize: mob ? 22 : 26, fontWeight: 700, fontFamily: display, color: T.textStrong, margin: "0.5rem 0 0.375rem", letterSpacing: "-0.02em" }}>{title}</h2>
      <p style={{ fontSize: mob ? 14 : 15, color: T.textMuted, fontFamily: sans, margin: "0 0 1.25rem", lineHeight: 1.6 }}>{sub}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.25rem" }}>
        {steps.map((s) => {
          const checked = !!chk[s.id];
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                background: checked ? T.successSoft : T.surface2,
                border: `1.5px solid ${checked ? T.success : T.border}`,
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: sans,
                transition: "background 120ms ease, border-color 120ms ease",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  border: `2px solid ${checked ? T.success : T.borderStrong}`,
                  background: checked ? T.success : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 120ms ease, border-color 120ms ease",
                }}
              >
                {checked && <CheckCircle2 size={13} color="#fff" />}
              </span>
              <span style={{ fontSize: 14, color: checked ? T.success : T.text, fontWeight: checked ? 500 : 400, textDecoration: checked ? "line-through" : "none" }}>
                {s.l}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ background: T.surface2, borderRadius: 999, height: 6, overflow: "hidden", marginBottom: 6 }}>
        <div
          style={{
            background: ac || T.accent,
            height: "100%",
            borderRadius: 999,
            width: `${(cnt / steps.length) * 100}%`,
            transition: "width 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div style={{ fontSize: 12, color: T.textMuted, fontFamily: sans, marginBottom: "1.25rem" }}>{cnt}/{steps.length} concluídos</div>

      {done && (
        <div
          className="gp-pop"
          style={{
            background: T.successSoft,
            border: `1px solid ${T.success}`,
            borderRadius: 16,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: display, color: T.textStrong, marginBottom: 6, letterSpacing: "-0.01em" }}>
            Atividade concluída!
          </div>
          <p style={{ fontSize: 15, color: T.textMuted, fontFamily: sans, lineHeight: 1.65, maxWidth: 400, margin: "0 auto 1.25rem" }}>{msg}</p>
          <button className="gp-btn gp-btn-primary" onClick={onNext} style={{ padding: "11px 22px", fontSize: 14 }}>
            Próximo módulo <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── module viewer ─────────────────────────────────────────────────────────────

const OSI = {
  windows: ["Acesse code.visualstudio.com", "Clique em Download for Windows", "Execute o .exe e siga o instalador", "Marque 'Add to PATH' e 'Add Open with Code'", "Abra pelo menu Iniciar"],
  mac: ["Acesse code.visualstudio.com", "Clique em Download for Mac", "Abra o .zip — extrai automaticamente", "Arraste para Aplicativos", "Abra pelo Launchpad ou Cmd+Espaço"],
  linux: ["Acesse code.visualstudio.com", "Baixe o pacote .deb ou .rpm", "No terminal: sudo dpkg -i code_*.deb", "Abra com o comando: code"],
};

function ModuleView({ mod, onComplete, onNext, isCompleted, mob }) {
  const [os, setOs] = useState("windows");
  const pillars = mod.pillars || PILLARS;

  return (
    <div style={{ background: T.bg, padding: mob ? "1.25rem 0.875rem 2rem" : "2.25rem 1.5rem 3rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* hero */}
        <header style={{ marginBottom: mob ? "1.75rem" : "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", flexWrap: "wrap" }}>
            <Pill color={mod.color}>{mod.badge}</Pill>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: T.textMuted, fontFamily: sans }}>
              <Clock size={13} /> {mod.time}
            </span>
            {isCompleted && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: T.success, fontFamily: sans, fontWeight: 600 }}>
                <CheckCircle2 size={13} /> Concluído
              </span>
            )}
          </div>
          <h1
            style={{
              fontSize: "clamp(30px, 7vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.05,
              fontFamily: display,
              color: T.textStrong,
              margin: "0 0 0.875rem",
              letterSpacing: "-0.03em",
            }}
          >
            {mod.t1}<br />
            <span style={{ color: mod.color }}>{mod.t2}</span>
          </h1>
          <p style={{ fontSize: mob ? 16 : 18, lineHeight: 1.55, color: T.textMuted, fontFamily: sans, maxWidth: 560, margin: "0 0 1.25rem" }}>
            {mod.subtitle}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {pillars.map((p) => (
              <span
                key={p.l}
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 999,
                  border: `1px solid ${p.c}50`,
                  color: p.c,
                  background: `${p.c}14`,
                  fontFamily: sans,
                  fontWeight: 500,
                }}
              >
                {p.l}
              </span>
            ))}
          </div>
        </header>

        {/* sections */}
        {mod.sections.map((s) => (
          <SectionCard key={s.num} num={s.num} label={s.label} color={s.sc} title={s.title} mob={mob}>
            <p style={{ margin: 0, lineHeight: mob ? 1.7 : 1.78 }}>{s.body}</p>
            {(s.xs || [s.x]).filter(Boolean).map((x, i) => <Xtra key={i} x={x} ac={mod.color} mob={mob} />)}
          </SectionCard>
        ))}

        {/* tutorials */}
        {mod.tutorials && mod.tutorials.length > 0 && (
          <div style={{ margin: "2.25rem 0 1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.625rem" }}>
              <span style={{ height: 1, flex: 1, background: T.border }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: sans }}>
                Tutoriais práticos
              </span>
              <span style={{ height: 1, flex: 1, background: T.border }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: T.textMuted, fontFamily: sans, textAlign: "center", margin: "0 auto 1.5rem", maxWidth: 480 }}>
              Antes da atividade, cada peça que você vai usar — explicada com o código exato e os erros que mais travam quem está começando.
            </p>
            {mod.tutorials.map((t) => (
              <Tutorial key={t.n} n={t.n} title={t.title} intro={t.intro} code={t.code} lang={t.lang} explain={t.explain} errors={t.errors} ac={mod.color} />
            ))}
          </div>
        )}

        {/* install (VS Code) */}
        {mod.hasInstall && (
          <div className="gp-card" style={{ padding: mob ? "1.25rem 1.1rem" : "1.625rem 1.875rem", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: display, color: T.textStrong, margin: "0 0 1rem", letterSpacing: "-0.01em" }}>
              Instalação passo a passo
            </h2>
            <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, marginBottom: "1.25rem", gap: 4 }}>
              {["windows", "mac", "linux"].map((o) => (
                <button
                  key={o}
                  onClick={() => setOs(o)}
                  style={{
                    padding: "8px 16px",
                    border: "none",
                    borderBottom: `2px solid ${os === o ? T.accent : "transparent"}`,
                    background: "transparent",
                    fontSize: 13,
                    fontWeight: os === o ? 600 : 400,
                    color: os === o ? T.accent : T.textMuted,
                    cursor: "pointer",
                    fontFamily: sans,
                    transition: "color 120ms ease, border-color 120ms ease",
                  }}
                >
                  {o === "windows" ? "Windows" : o === "mac" ? "macOS" : "Linux"}
                </button>
              ))}
            </div>
            <ol style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: 10 }}>
              {OSI[os].map((s, i) => <li key={i} style={{ fontSize: 15, lineHeight: 1.6, color: T.text, fontFamily: sans }}>{s}</li>)}
            </ol>
          </div>
        )}

        {/* atividade */}
        {mod.act.type === "q"
          ? <Quiz qs={mod.act.qs} ac={mod.color} onComplete={onComplete} isCompleted={isCompleted} mob={mob} />
          : <Checklist title={mod.act.title} sub={mod.act.sub} steps={mod.act.steps} ac={mod.color} msg={mod.act.msg} onComplete={onComplete} onNext={onNext} isCompleted={isCompleted} mob={mob} />}

        <AskAI moduleId={mod.id} moduleTitle={`${mod.t1} ${mod.t2}`} accent={mod.color} />
      </div>
    </div>
  );
}

// ── app shell ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeId, setActiveId] = useState(MODS[0].id);
  const [view, setView] = useState("guide");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();
  const { completed, markComplete } = useProgress();
  const isMobile = useIsMobile();
  const { theme, toggle: toggleTheme } = useTheme();
  const effectiveView = user ? "guide" : view;
  const drawerActive = isMobile && drawerOpen;

  useEffect(() => {
    document.body.style.overflow = drawerActive ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerActive]);

  useEffect(() => {
    if (!drawerActive) return;
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerActive]);

  if (effectiveView === "login") return <AuthPage onBack={() => setView("guide")} />;

  const unlocked = (idx) => idx === 0 || completed.includes(MODS[idx - 1].id);
  const done = (id) => completed.includes(id);
  const mark = (id) => markComplete(id);
  const activeIdx = MODS.findIndex((m) => m.id === activeId);
  const active = MODS[activeIdx];
  const hasNext = activeIdx < MODS.length - 1 && unlocked(activeIdx + 1);
  const hasPrev = activeIdx > 0;
  const pct = Math.round((completed.length / MODS.length) * 100);

  const goTo = (id, i) => {
    if (unlocked(i)) {
      setActiveId(id);
      setDrawerOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goNext = () => { const n = MODS[activeIdx + 1]; if (n && unlocked(activeIdx + 1)) goTo(n.id, activeIdx + 1); };
  const goPrev = () => { const p = MODS[activeIdx - 1]; if (p) goTo(p.id, activeIdx - 1); };

  const sidebarBase = {
    width: 280,
    minWidth: 280,
    background: T.surface,
    borderRight: `1px solid ${T.border}`,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    flexShrink: 0,
    transition: "background var(--duration) var(--ease), border-color var(--duration) var(--ease)",
  };
  const sidebarStyle = isMobile
    ? {
        ...sidebarBase,
        position: "fixed",
        top: 0, bottom: 0, left: 0,
        height: "100dvh",
        zIndex: 60,
        boxShadow: drawerOpen ? "var(--shadow-lg)" : "none",
        transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      }
    : { ...sidebarBase, position: "sticky", top: 0, height: "100vh" };

  const sidebar = (
    <aside style={sidebarStyle} aria-hidden={isMobile && !drawerOpen}>
      {/* brand + progress */}
      <div style={{ padding: "1.375rem 1.25rem 1.125rem", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                width: 22, height: 22, borderRadius: 6,
                background: T.accent, color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BookOpen size={13} />
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.textStrong, fontFamily: display, letterSpacing: "-0.01em" }}>
              Guia de Programação
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: T.textMuted, marginBottom: "0.875rem", fontFamily: sans }}>
            Era da IA · Do zero
          </div>

          {/* progresso */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
            <Trophy size={12} color={T.accent} />
            <span style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: sans }}>
              {completed.length} de {MODS.length}
            </span>
            <span style={{ fontSize: 11, color: T.textMuted, fontFamily: mono, marginLeft: "auto" }}>
              {pct}%
            </span>
          </div>
          <div style={{ background: T.surface2, borderRadius: 999, height: 5, overflow: "hidden" }}>
            <div
              style={{
                background: `linear-gradient(90deg, ${T.accent}, var(--accent-hover))`,
                height: "100%",
                borderRadius: 999,
                width: `${pct}%`,
                transition: "width 480ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>
        {isMobile && (
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar menu"
            className="gp-btn-icon"
            style={{ width: 32, height: 32 }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* nav */}
      <nav style={{ padding: "0.625rem 0", flex: 1 }}>
        {MODS.map((m, i) => {
          const isActive = m.id === activeId;
          const isDone = done(m.id);
          const isLocked = !unlocked(i);
          return (
            <button
              key={m.id}
              onClick={() => goTo(m.id, i)}
              disabled={isLocked}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.625rem 1.25rem 0.625rem 1rem",
                background: isActive ? T.accentSoft : "transparent",
                border: "none",
                borderLeft: `3px solid ${isActive ? T.accent : "transparent"}`,
                cursor: isLocked ? "not-allowed" : "pointer",
                opacity: isLocked ? 0.45 : 1,
                display: "flex",
                alignItems: "center",
                gap: 11,
                fontFamily: sans,
                transition: "background 160ms ease, border-color 160ms ease",
              }}
            >
              <span
                style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isDone ? T.success : isActive ? T.accent : "transparent",
                  border: `1.5px solid ${isDone ? T.success : isActive ? T.accent : T.borderStrong}`,
                  color: "#fff",
                  fontSize: 11,
                  fontFamily: mono,
                  fontWeight: 700,
                  transition: "background 160ms ease, border-color 160ms ease",
                }}
              >
                {isLocked ? <Lock size={10} color={T.textSubtle} /> : isDone ? <CheckCircle2 size={13} color="#fff" /> : <span style={{ color: isActive ? "#fff" : T.textMuted }}>{i + 1}</span>}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: m.color, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: sans, marginBottom: 1 }}>
                  {m.badge}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? T.textStrong : T.text,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.t1} {m.t2}
                </div>
              </div>
              {isActive && <ChevronRight size={14} color={T.accent} />}
            </button>
          );
        })}
      </nav>

      <UserMenu onLoginClick={() => { setDrawerOpen(false); setView("login"); }} />

      {/* footer com toggle de tema */}
      <div
        style={{
          padding: "0.875rem 1.125rem",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 11, color: T.textSubtle, fontFamily: sans }}>Atualizado · 2024+</span>
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
          className="gp-btn-icon"
          style={{ width: 32, height: 32 }}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: sans }}>
      {sidebar}
      {isMobile && drawerOpen && (
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          aria-label="Fechar menu"
          style={{
            position: "fixed",
            inset: 0,
            background: T.overlay,
            zIndex: 55,
            backdropFilter: "blur(2px)",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        />
      )}

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", width: "100%" }}>
        <AnonBanner onLoginClick={() => setView("login")} />

        {/* header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: isMobile ? "0.7rem 0.875rem" : "0.875rem 1.5rem",
            background: `color-mix(in oklab, var(--surface) 92%, transparent)`,
            backdropFilter: "saturate(180%) blur(8px)",
            WebkitBackdropFilter: "saturate(180%) blur(8px)",
            borderBottom: `1px solid ${T.border}`,
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {isMobile && (
            <button onClick={() => setDrawerOpen(true)} aria-label="Abrir menu" className="gp-btn-icon">
              <Menu size={19} />
            </button>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: active.color, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: sans }}>
              {active.badge}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: T.textStrong,
                fontFamily: sans,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {active.t1} {active.t2}
            </div>
          </div>

          {/* progresso compacto no header (desktop) */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 4 }}>
              <Flame size={14} color={completed.length > 0 ? T.accent : T.textSubtle} />
              <div style={{ width: 110, background: T.surface2, borderRadius: 999, height: 4, overflow: "hidden" }}>
                <div
                  style={{
                    background: T.accent,
                    height: "100%",
                    borderRadius: 999,
                    width: `${pct}%`,
                    transition: "width 320ms ease",
                  }}
                />
              </div>
              <span style={{ fontSize: 12, color: T.textMuted, fontFamily: mono, minWidth: 32, textAlign: "right" }}>
                {pct}%
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button onClick={goPrev} disabled={!hasPrev} aria-label="Módulo anterior" className="gp-btn-icon">
              <ChevronLeft size={18} />
            </button>
            <button onClick={goNext} disabled={!hasNext} aria-label="Próximo módulo" className="gp-btn-icon">
              <ChevronRight size={18} />
            </button>
          </div>
        </header>

        <div style={{ flex: 1 }}>
          <ModuleView
            mod={active}
            onComplete={() => mark(activeId)}
            onNext={goNext}
            isCompleted={done(activeId)}
            mob={isMobile}
          />
        </div>

        {/* footer nav */}
        <footer
          style={{
            borderTop: `1px solid ${T.border}`,
            background: T.surface,
            padding: isMobile ? "0.75rem 0.875rem" : "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <button onClick={goPrev} disabled={!hasPrev} className="gp-btn gp-btn-ghost" style={{ fontSize: 13 }}>
            <ChevronLeft size={14} />
            <span>{hasPrev ? MODS[activeIdx - 1].badge : "Início"}</span>
          </button>

          {!isMobile && (
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {MODS.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => goTo(m.id, i)}
                  disabled={!unlocked(i)}
                  aria-label={`Ir para ${m.t1} ${m.t2}`}
                  style={{
                    width: i === activeIdx ? 22 : 7,
                    height: 7,
                    borderRadius: 999,
                    border: "none",
                    padding: 0,
                    background: done(m.id) ? T.success : i === activeIdx ? T.accent : T.border,
                    cursor: unlocked(i) ? "pointer" : "not-allowed",
                    transition: "width 240ms ease, background 240ms ease",
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={goNext}
            disabled={!hasNext}
            className={hasNext ? "gp-btn gp-btn-primary" : "gp-btn gp-btn-ghost"}
            style={{ fontSize: 13 }}
          >
            <span>{hasNext ? MODS[activeIdx + 1].badge : "Guia concluído!"}</span>
            <ChevronRight size={14} />
          </button>
        </footer>
      </main>
    </div>
  );
}
