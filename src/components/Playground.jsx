import { useEffect, useRef, useState } from "react";
import { Code2, X, Play, RotateCcw, Sparkles } from "lucide-react";
import { T, sans, mono, display } from "../lib/theme.js";

const STORAGE_CODE = "gp-playground-code-v1";
const STORAGE_HINT = "gp-playground-hint-dismissed-v1";

const DEFAULTS = {
  html: `<h1>Olá!</h1>
<p>Edite o HTML, CSS e JS — a preview atualiza sozinha.</p>
<button id="b">Clique aqui</button>`,
  css: `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  color: #222;
}
button {
  background: #1D9E75;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}
button:hover { background: #167a5b; }`,
  js: `document.getElementById('b').addEventListener('click', () => {
  alert('Funcionou! 🎉');
});`,
};

function loadCode() {
  try {
    const raw = localStorage.getItem(STORAGE_CODE);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

function buildSrcDoc({ html, css, js }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>${css}</style>
</head>
<body>
${html}
<script>
try { ${js} } catch (e) { document.body.insertAdjacentHTML('beforeend', '<pre style="color:#c00;background:#fee;padding:8px;border-radius:6px;margin-top:1rem;font-family:monospace;font-size:12px">'+ e.message +'</pre>'); }
</script>
</body>
</html>`;
}

export default function Playground() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(loadCode);
  const [tab, setTab] = useState("html");
  const [preview, setPreview] = useState(() => buildSrcDoc(loadCode()));
  const [hintDismissed, setHintDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_HINT) === "1"; } catch { return false; }
  });
  const debounceRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_CODE, JSON.stringify(code)); } catch { /* ignore */ }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPreview(buildSrcDoc(code)), 350);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [code]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismissHint = () => {
    setHintDismissed(true);
    try { localStorage.setItem(STORAGE_HINT, "1"); } catch { /* ignore */ }
  };

  const openPlayground = () => {
    dismissHint();
    setOpen(true);
  };

  const reset = () => {
    if (!confirm("Restaurar código de exemplo? Seu código atual será perdido.")) return;
    setCode(DEFAULTS);
  };

  const runNow = () => setPreview(buildSrcDoc(code));

  return (
    <>
      {!open && (
        <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
          {!hintDismissed && (
            <div
              className="gp-pop"
              style={{
                position: "relative",
                background: T.surface,
                border: `1px solid ${T.accent}`,
                borderRadius: 14,
                padding: "0.875rem 1rem 0.875rem 1.1rem",
                maxWidth: 260,
                boxShadow: T.shadowLg,
                fontFamily: sans,
              }}
            >
              <button
                onClick={dismissHint}
                aria-label="Fechar dica"
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: T.textMuted,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={13} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Sparkles size={13} color={T.accent} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Exclusivo para você
                </span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: T.text, paddingRight: 18 }}>
                Um playground só seu pra testar HTML, CSS e JS — preview ao vivo.
              </div>
              <span
                style={{
                  position: "absolute",
                  right: 22,
                  bottom: -7,
                  width: 12,
                  height: 12,
                  background: T.surface,
                  borderRight: `1px solid ${T.accent}`,
                  borderBottom: `1px solid ${T.accent}`,
                  transform: "rotate(45deg)",
                }}
              />
            </div>
          )}
          <button
            onClick={openPlayground}
            aria-label="Abrir playground"
            className="gp-btn gp-btn-primary"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              padding: 0,
              boxShadow: T.shadowLg,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code2 size={22} />
          </button>
        </div>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: T.overlay,
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            fontFamily: sans,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0.75rem 1rem",
              background: T.surface,
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <Code2 size={18} color={T.accent} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Playground
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.textStrong, fontFamily: display }}>
                Teste HTML, CSS e JS ao vivo
              </div>
            </div>
            <button onClick={runNow} className="gp-btn gp-btn-ghost" style={{ fontSize: 12 }}>
              <Play size={13} /> Rodar
            </button>
            <button onClick={reset} className="gp-btn gp-btn-ghost" style={{ fontSize: 12 }}>
              <RotateCcw size={13} /> Resetar
            </button>
            <button onClick={() => setOpen(false)} aria-label="Fechar" className="gp-btn-icon">
              <X size={16} />
            </button>
          </div>

          <div style={{ flex: 1, display: "flex", minHeight: 0, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 360px", minWidth: 280, display: "flex", flexDirection: "column", borderRight: `1px solid ${T.border}`, background: T.surface }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${T.border}` }}>
                {["html", "css", "js"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "none",
                      borderBottom: `2px solid ${tab === t ? T.accent : "transparent"}`,
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: tab === t ? 700 : 500,
                      color: tab === t ? T.accent : T.textMuted,
                      fontFamily: mono,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      transition: "color 120ms ease, border-color 120ms ease",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <textarea
                value={code[tab]}
                onChange={(e) => setCode((c) => ({ ...c, [tab]: e.target.value }))}
                spellCheck={false}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  resize: "none",
                  padding: "1rem",
                  fontFamily: mono,
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  background: T.codeBg,
                  color: T.codeText,
                  width: "100%",
                  minHeight: 220,
                }}
              />
            </div>

            <div style={{ flex: "1 1 360px", minWidth: 280, display: "flex", flexDirection: "column", background: "#fff" }}>
              <div style={{ padding: "8px 14px", borderBottom: `1px solid ${T.border}`, fontSize: 11, color: T.textMuted, fontFamily: mono, letterSpacing: "0.1em", textTransform: "uppercase", background: T.surface }}>
                Preview
              </div>
              <iframe
                title="Preview"
                srcDoc={preview}
                sandbox="allow-scripts allow-modals"
                style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
