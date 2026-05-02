import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { T, sans, mono, display } from "../lib/theme.js";

// renderiza texto com blocos ``` separados como código
function renderContent(text) {
  const parts = text.split(/```(?:\w+)?\n?/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <pre
          key={i}
          style={{
            background: T.codeBg,
            color: T.codeText,
            fontFamily: mono,
            fontSize: 13,
            lineHeight: 1.7,
            padding: "0.875rem 1rem",
            borderRadius: 8,
            margin: "0.625rem 0",
            overflowX: "auto",
            whiteSpace: "pre",
            border: `1px solid ${T.codeBorder}`,
          }}
        >
          {part.replace(/\n$/, "")}
        </pre>
      );
    }
    return <span key={i} style={{ whiteSpace: "pre-wrap" }}>{part}</span>;
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
      if (fnError) {
        let detail = fnError.message;
        try {
          const body = await fnError.context?.json?.();
          if (body?.error) detail = body.error;
        } catch {
          // resposta não é JSON — mantém mensagem genérica
        }
        throw new Error(detail || "Erro na função.");
      }
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

  const ac = accent || T.accent;

  return (
    <div
      className="gp-card"
      style={{
        padding: "1.5rem 1.625rem",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: ac,
            color: "#fff",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 11px",
            borderRadius: 999,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: sans,
          }}
        >
          <Sparkles size={11} /> Pergunte à IA
        </span>
        {messages.length > 0 && (
          <button
            onClick={reset}
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 11px",
              background: "transparent",
              border: `1px solid ${T.border}`,
              borderRadius: 999,
              fontSize: 12,
              color: T.textMuted,
              cursor: "pointer",
              fontFamily: sans,
            }}
          >
            <RotateCcw size={11} /> Limpar
          </button>
        )}
      </div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          fontFamily: display,
          color: T.textStrong,
          margin: "0.5rem 0 0.25rem",
          letterSpacing: "-0.01em",
        }}
      >
        Travou? Pergunte aqui.
      </h2>
      <p style={{ fontSize: 14, color: T.textMuted, fontFamily: sans, margin: "0 0 1.25rem", lineHeight: 1.6 }}>
        IA focada SÓ neste módulo (<strong style={{ color: T.text }}>{moduleTitle}</strong>). Perguntas fora do escopo serão redirecionadas.
      </p>

      <div
        ref={scrollRef}
        style={{
          background: T.surface2,
          borderRadius: 12,
          padding: messages.length ? "1rem" : "1.5rem",
          marginBottom: "0.875rem",
          maxHeight: 380,
          overflowY: "auto",
          border: `1px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.length === 0 && !loading && (
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: sans, lineHeight: 1.65, textAlign: "center" }}>
            Exemplos do que perguntar:<br />
            <span style={{ color: T.text, fontStyle: "italic" }}>
              "Por que minha imagem não aparece?" · "Qual a diferença entre . e # no CSS?" · "Como centralizar um div?"
            </span>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className="gp-fade-in"
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "88%",
              background: m.role === "user" ? ac : T.surface,
              color: m.role === "user" ? "#fff" : T.text,
              padding: "0.75rem 1rem",
              borderRadius: 14,
              borderTopRightRadius: m.role === "user" ? 4 : 14,
              borderTopLeftRadius: m.role === "user" ? 14 : 4,
              fontSize: 14,
              lineHeight: 1.65,
              fontFamily: sans,
              border: m.role === "user" ? "none" : `1px solid ${T.border}`,
            }}
          >
            {m.role === "user" ? m.content : renderContent(m.content)}
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "0.75rem 1rem",
              background: T.surface,
              borderRadius: 14,
              borderTopLeftRadius: 4,
              border: `1px solid ${T.border}`,
              fontSize: 14,
              color: T.textMuted,
              fontFamily: sans,
              display: "inline-flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <span style={{ animation: "gp-blink 1.4s infinite" }}>·</span>
            <span style={{ animation: "gp-blink 1.4s infinite 0.2s" }}>·</span>
            <span style={{ animation: "gp-blink 1.4s infinite 0.4s" }}>·</span>
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            background: T.dangerSoft,
            color: T.danger,
            fontFamily: sans,
            fontSize: 13,
            padding: "0.75rem 0.875rem",
            borderRadius: 10,
            marginBottom: "0.75rem",
            borderLeft: `3px solid ${T.danger}`,
            lineHeight: 1.55,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={`Pergunte sobre ${moduleTitle}…`}
          disabled={loading}
          rows={1}
          className="gp-input"
          style={{ flex: 1, resize: "none", lineHeight: 1.5 }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="gp-btn gp-btn-primary"
          aria-label="Enviar pergunta"
          style={{ padding: "0 16px" }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
