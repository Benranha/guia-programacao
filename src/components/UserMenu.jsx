import { useState } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { C, sans } from "../lib/theme.js";
import AuthModal from "./AuthModal.jsx";

export default function UserMenu() {
  const { user, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: "0.875rem 1.25rem", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted, fontFamily: sans }}>
        Carregando...
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div style={{ padding: "0.875rem 1.25rem", borderTop: `1px solid ${C.border}` }}>
          <button
            onClick={() => setOpen(true)}
            style={{
              width: "100%",
              padding: "9px 12px",
              background: C.terra,
              color: C.white,
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: sans,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <LogIn size={14} /> Entrar / Criar conta
          </button>
        </div>
        <AuthModal open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  const label = user.email || "Usuário";

  return (
    <div style={{ padding: "0.875rem 1.25rem", borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: sans, fontSize: 12, color: C.ink, minWidth: 0 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: C.terraLight,
            color: C.terra,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User size={14} />
        </span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      </div>
      <button
        onClick={signOut}
        style={{
          padding: "7px 10px",
          background: "transparent",
          color: C.muted,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: sans,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <LogOut size={12} /> Sair
      </button>
    </div>
  );
}
