import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { T, sans } from "../lib/theme.js";

export default function UserMenu({ onLoginClick }) {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: "0.875rem 1.125rem", borderTop: `1px solid ${T.border}`, fontSize: 11, color: T.textMuted, fontFamily: sans }}>
        Carregando…
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: "0.875rem 1.125rem", borderTop: `1px solid ${T.border}` }}>
        <button onClick={onLoginClick} className="gp-btn gp-btn-primary" style={{ width: "100%", fontSize: 13 }}>
          <LogIn size={14} /> Entrar / Criar conta
        </button>
      </div>
    );
  }

  const label = user.email || "Usuário";
  const initial = (label[0] || "U").toUpperCase();

  return (
    <div
      style={{
        padding: "0.875rem 1.125rem",
        borderTop: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: sans, minWidth: 0 }}>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: T.accent,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 12,
            fontWeight: 700,
          }}
          aria-hidden
        >
          {initial}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11, color: T.textSubtle, lineHeight: 1.2 }}>Logado como</div>
          <div
            style={{
              fontSize: 12,
              color: T.text,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        </div>
      </div>
      <button onClick={signOut} className="gp-btn gp-btn-ghost" style={{ fontSize: 12, padding: "7px 10px" }}>
        <LogOut size={12} /> Sair
      </button>
    </div>
  );
}
