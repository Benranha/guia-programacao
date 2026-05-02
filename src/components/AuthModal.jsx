import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { C, serif, sans } from "../lib/theme.js";

export default function AuthModal({ open, onClose }) {
  const { signIn, signUp, signInWithGoogle, isConfigured } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  if (!open) return null;

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setInfo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    try {
      if (mode === "login") {
        await signIn(email, password);
        onClose();
        reset();
      } else {
        const { user, session } = await signUp(email, password);
        if (user && !session) {
          setInfo("Conta criada! Verifique seu email para confirmar antes de entrar.");
        } else {
          onClose();
          reset();
        }
      }
    } catch (err) {
      setError(err.message || "Erro ao processar a solicitação.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "Erro ao entrar com Google.");
      setBusy(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28,27,24,0.55)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.white,
          borderRadius: 18,
          padding: "1.75rem",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
          fontFamily: sans,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: C.muted,
            padding: 4,
          }}
        >
          <X size={18} />
        </button>

        <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: serif, color: C.ink, margin: "0 0 0.4rem" }}>
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h2>
        <p style={{ fontSize: 14, color: C.muted, margin: "0 0 1.25rem", lineHeight: 1.5 }}>
          {mode === "login"
            ? "Acesse para continuar de onde parou."
            : "Crie uma conta para salvar seu progresso entre dispositivos."}
        </p>

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

        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy || !isConfigured}
          style={{
            width: "100%",
            padding: "11px",
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            color: C.ink,
            cursor: busy || !isConfigured ? "not-allowed" : "pointer",
            fontFamily: sans,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            opacity: busy || !isConfigured ? 0.6 : 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.5 6.5 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.5 6.5 29 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 43.5c4.9 0 9.4-1.9 12.7-4.9l-5.9-5c-1.9 1.4-4.3 2.3-6.8 2.3-5.2 0-9.6-2.9-11.3-7l-6.5 5C9.6 39.1 16.2 43.5 24 43.5z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.4 5.6l5.9 5c-.4.4 6.7-4.9 6.7-14.6 0-1.2-.1-2.4-.4-3.5z" />
          </svg>
          Entrar com Google
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "1rem 0",
            color: C.muted,
            fontSize: 12,
          }}
        >
          <div style={{ flex: 1, height: 1, background: C.border }} />
          ou
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

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
            style={{
              width: "100%",
              padding: "10px 12px",
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
              padding: "10px 12px",
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
              padding: "12px",
              background: busy || !isConfigured ? C.border : C.terra,
              color: busy || !isConfigured ? C.muted : C.white,
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: busy || !isConfigured ? "not-allowed" : "pointer",
              fontFamily: sans,
            }}
          >
            {busy ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: 13, color: C.muted }}>
          {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setInfo("");
            }}
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
  );
}
