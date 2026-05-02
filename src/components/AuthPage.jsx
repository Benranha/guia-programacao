import { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { T, sans, display } from "../lib/theme.js";

export default function AuthPage({ onBack }) {
  const { signIn, signUp, isConfigured } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    const currentEmail = email;
    const currentPassword = password;
    setEmail("");
    setPassword("");
    try {
      if (mode === "login") {
        await signIn(currentEmail, currentPassword);
      } else {
        const { user, session } = await signUp(currentEmail, currentPassword);
        if (user && !session) {
          setInfo("Conta criada! Verifique seu email para confirmar antes de entrar.");
        }
      }
    } catch (err) {
      setError(err.message || "Erro ao processar a solicitação.");
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setEmail("");
    setPassword("");
    setError("");
    setInfo("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: `radial-gradient(ellipse at top, var(--accent-soft), var(--bg) 60%)`,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        fontFamily: sans,
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <button onClick={onBack} className="gp-btn gp-btn-ghost" style={{ fontSize: 13 }}>
          <ArrowLeft size={14} /> Voltar ao guia
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 1.25rem 3rem",
        }}
      >
        <div
          className="gp-card gp-fade-in"
          style={{
            padding: "2.25rem 2rem",
            maxWidth: 440,
            width: "100%",
            boxShadow: T.shadowLg,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: T.accent,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <BookOpen size={22} />
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.accent,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Guia de Programação
            </div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                fontFamily: display,
                color: T.textStrong,
                margin: "0 0 0.5rem",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {mode === "login" ? "Bem-vindo de volta" : "Criar sua conta"}
            </h2>
            <p style={{ fontSize: 14, color: T.textMuted, margin: 0, lineHeight: 1.55 }}>
              {mode === "login"
                ? "Acesse para continuar de onde parou."
                : "Salve seu progresso entre dispositivos."}
            </p>
          </div>

          {!isConfigured && (
            <div
              style={{
                background: T.dangerSoft,
                color: T.danger,
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 13,
                marginBottom: "1rem",
                lineHeight: 1.5,
                border: `1px solid ${T.danger}`,
              }}
            >
              Supabase não configurado. Defina <code style={{ fontFamily: "var(--font-mono)" }}>VITE_SUPABASE_URL</code> e{" "}
              <code style={{ fontFamily: "var(--font-mono)" }}>VITE_SUPABASE_ANON_KEY</code> em <code style={{ fontFamily: "var(--font-mono)" }}>.env.local</code>.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={busy || !isConfigured}
              autoFocus
              className="gp-input"
              style={{ marginBottom: "0.875rem" }}
            />
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: T.text, marginBottom: 6 }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={busy || !isConfigured}
              className="gp-input"
              style={{ marginBottom: "1rem" }}
            />

            {error && (
              <div
                style={{
                  background: T.dangerSoft,
                  color: T.danger,
                  padding: "9px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: "0.875rem",
                  borderLeft: `3px solid ${T.danger}`,
                }}
              >
                {error}
              </div>
            )}
            {info && (
              <div
                style={{
                  background: T.successSoft,
                  color: T.success,
                  padding: "9px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: "0.875rem",
                  borderLeft: `3px solid ${T.success}`,
                }}
              >
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !isConfigured}
              className="gp-btn gp-btn-primary"
              style={{ width: "100%", padding: "13px", fontSize: 15, fontWeight: 600 }}
            >
              {busy ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 13, color: T.textMuted }}>
            {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
            <button onClick={switchMode} className="gp-link" style={{ fontSize: 13 }}>
              {mode === "login" ? "Criar conta" : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
