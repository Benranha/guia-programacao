import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { C, serif, sans } from "../lib/theme.js";

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
        background: `linear-gradient(160deg, ${C.ink} 0%, #2A2926 100%)`,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        fontFamily: sans,
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 14px",
            background: "rgba(255,255,255,0.08)",
            color: "#F0EBE3",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 10,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: sans,
          }}
        >
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
          style={{
            background: C.white,
            borderRadius: 22,
            padding: "2.25rem 2rem",
            maxWidth: 440,
            width: "100%",
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.terra,
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
                fontWeight: 700,
                fontFamily: serif,
                color: C.ink,
                margin: "0 0 0.5rem",
                lineHeight: 1.15,
              }}
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
            </h2>
            <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.5 }}>
              {mode === "login"
                ? "Acesse para continuar de onde parou."
                : "Crie uma conta para salvar seu progresso entre dispositivos."}
            </p>
          </div>

          {!isConfigured && (
            <div
              style={{
                background: "#FBF0EF",
                color: "#B83228",
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 13,
                marginBottom: "1rem",
                lineHeight: 1.5,
              }}
            >
              Supabase não configurado. Defina <code>VITE_SUPABASE_URL</code> e{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> em <code>.env.local</code>.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.ink, marginBottom: 5 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={busy || !isConfigured}
              autoFocus
              style={{
                width: "100%",
                padding: "11px 13px",
                border: `1.5px solid ${C.border}`,
                borderRadius: 10,
                fontSize: 14,
                fontFamily: sans,
                marginBottom: "0.875rem",
                boxSizing: "border-box",
              }}
            />
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: C.ink, marginBottom: 5 }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={busy || !isConfigured}
              style={{
                width: "100%",
                padding: "11px 13px",
                border: `1.5px solid ${C.border}`,
                borderRadius: 10,
                fontSize: 14,
                fontFamily: sans,
                marginBottom: "1rem",
                boxSizing: "border-box",
              }}
            />

            {error && (
              <div
                style={{
                  background: "#FBF0EF",
                  color: "#B83228",
                  padding: "9px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: "0.875rem",
                }}
              >
                {error}
              </div>
            )}
            {info && (
              <div
                style={{
                  background: C.greenLight,
                  color: C.green,
                  padding: "9px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: "0.875rem",
                }}
              >
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !isConfigured}
              style={{
                width: "100%",
                padding: "13px",
                background: busy || !isConfigured ? C.border : C.terra,
                color: busy || !isConfigured ? C.muted : C.white,
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                cursor: busy || !isConfigured ? "not-allowed" : "pointer",
                fontFamily: sans,
              }}
            >
              {busy ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 13, color: C.muted }}>
            {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
            <button
              onClick={switchMode}
              style={{
                background: "transparent",
                border: "none",
                color: C.terra,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                fontSize: 13,
                fontFamily: sans,
              }}
            >
              {mode === "login" ? "Criar conta" : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
