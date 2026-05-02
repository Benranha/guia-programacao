import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const C = {
  cream: "#F8F6F0", white: "#FFF", ink: "#1C1B18",
  muted: "#7A7570", border: "#E2DDD6",
  codeBg: "#1A1917", codeText: "#F0EBE3",
  errBg: "#FBF0EF", errText: "#B83228",
};
const sans = "var(--font-sans,system-ui,sans-serif)";
const mono = "var(--font-mono,'Courier New',monospace)";

// renderiza texto com blocos ``` separados como código
function renderContent(text) {
  const parts = text.split(/```(?:\w+)?\n?/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <pre key={i} style={{
          background: C.codeBg, color: C.codeText, fontFamily: mono,
          fontSize: 13, lineHeight: 1.7, padding: "0.875rem 1rem",
          borderRadius: 8, margin: "0.625rem 0", overflowX: "auto",
          whiteSpace: "pre",
        }}>{part.replace(/\n$/, "")}</pre>
      );
    }
    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>{part}</span>
    );
  });
}

export default function AskAI({ moduleId, moduleTitle, accent }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trackedId, setTrackedId] = useState(moduleId);
  const scrollRef = useRef(null);

  if (trackedId !== moduleId) {
    setTrackedId(moduleId);
    setMessages([]);
    setError(null);
    setInput("");
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    if (!isSupabaseConfigured) {
      setError("A IA precisa do Supabase configurado. Veja o README.");
      return;
    }

    const newMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ask-ai", {
        body: { messages: newMessages, moduleId, moduleTitle },
      });
      if (fnError) throw new Error(fnError.message || "Erro na função.");
      if (data?.error) throw new Error(data.error);
      const text = data?.text?.trim();
      if (!text) throw new Error("A IA não respondeu nada — tente reformular a pergunta.");
      setMessages([...newMessages, { role: "assistant", content: text }]);
    } catch (e) {
      setError(e.message || "Erro ao falar com a IA.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const ac = accent || "#B85438";

  return (
    <div style={{
      background: C.white, borderRadius: 20, padding: "2rem",
      marginTop: "1.5rem", marginBottom: "1.5rem",
      border: `1.5px solid ${ac}30`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.4rem", flexWrap: "wrap" }}>
        <span style={{
          background: C.ink, color: C.white, fontSize: 11, fontWeight: 700,
          padding: "4px 13px", borderRadius: 999, letterSpacing: "0.08em",
          textTransform: "uppercase", fontFamily: sans,
          display: "inline-flex", alignItems: "center", gap: 5,
        }}>
          <Sparkles size={11} /> Pergunte à IA
        </span>
        {messages.length > 0 && (
          <button onClick={reset} style={{
            marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5,
            padding: "5px 11px", background: "transparent",
            border: `1px solid ${C.border}`, borderRadius: 999,
            fontSize: 12, color: C.muted, cursor: "pointer", fontFamily: sans,
          }}>
            <RotateCcw size={11} /> Limpar
          </button>
        )}
      </div>
      <h2 style={{
        fontSize: 22, fontWeight: 700,
        fontFamily: "'Iowan Old Style','Palatino Linotype',Georgia,serif",
        color: C.ink, margin: "0.4rem 0 0.4rem",
      }}>
        Travou? Pergunte aqui.
      </h2>
      <p style={{ fontSize: 14, color: C.muted, fontFamily: sans, margin: "0 0 1.25rem", lineHeight: 1.6 }}>
        IA focada SÓ neste módulo ({moduleTitle}). Perguntas fora do escopo serão redirecionadas.
      </p>

      <div ref={scrollRef} style={{
        background: C.cream, borderRadius: 14, padding: messages.length ? "1rem" : "1.5rem",
        marginBottom: "0.875rem", maxHeight: 380, overflowY: "auto",
        border: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {messages.length === 0 && !loading && (
          <div style={{ fontSize: 13, color: C.muted, fontFamily: sans, lineHeight: 1.6, textAlign: "center" }}>
            Exemplos do que perguntar:<br/>
            <span style={{ color: C.ink, fontStyle: "italic" }}>
              "Por que minha imagem não aparece?" · "Qual a diferença entre . e # no CSS?" · "Como centralizar um div?"
            </span>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "88%",
            background: m.role === "user" ? ac : C.white,
            color: m.role === "user" ? C.white : C.ink,
            padding: "0.75rem 1rem", borderRadius: 14,
            borderTopRightRadius: m.role === "user" ? 4 : 14,
            borderTopLeftRadius: m.role === "user" ? 14 : 4,
            fontSize: 14, lineHeight: 1.65, fontFamily: sans,
            border: m.role === "user" ? "none" : `1px solid ${C.border}`,
          }}>
            {m.role === "user" ? m.content : renderContent(m.content)}
          </div>
        ))}
        {loading && (
          <div style={{
            alignSelf: "flex-start", padding: "0.75rem 1rem",
            background: C.white, borderRadius: 14, borderTopLeftRadius: 4,
            border: `1px solid ${C.border}`,
            fontSize: 14, color: C.muted, fontFamily: sans,
            display: "inline-flex", gap: 4, alignItems: "center",
          }}>
            <span style={{ animation: "blink 1.4s infinite" }}>·</span>
            <span style={{ animation: "blink 1.4s infinite 0.2s" }}>·</span>
            <span style={{ animation: "blink 1.4s infinite 0.4s" }}>·</span>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          background: C.errBg, color: C.errText, fontFamily: sans,
          fontSize: 13, padding: "0.75rem 0.875rem", borderRadius: 10,
          marginBottom: "0.75rem", borderLeft: `3px solid ${C.errText}`,
          lineHeight: 1.55,
        }}>{error}</div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={`Pergunte sobre ${moduleTitle}...`}
          disabled={loading}
          rows={1}
          style={{
            flex: 1, padding: "0.75rem 0.875rem", borderRadius: 10,
            border: `1.5px solid ${C.border}`, fontSize: 14,
            fontFamily: sans, resize: "none", outline: "none",
            background: loading ? C.cream : C.white, color: C.ink,
            lineHeight: 1.5,
          }}
          onFocus={(e) => (e.target.style.borderColor = ac)}
          onBlur={(e) => (e.target.style.borderColor = C.border)}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            padding: "0 1rem", background: input.trim() && !loading ? ac : C.border,
            color: input.trim() && !loading ? C.white : C.muted,
            border: "none", borderRadius: 10,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            gap: 5, fontSize: 14, fontWeight: 600, fontFamily: sans,
          }}
        >
          <Send size={15} />
        </button>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:.2} 50%{opacity:1} }`}</style>
    </div>
  );
}
