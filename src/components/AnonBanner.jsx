import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { C, sans } from "../lib/theme.js";
import AuthModal from "./AuthModal.jsx";

export default function AnonBanner() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (loading || user || dismissed) return null;

  return (
    <>
      <div
        style={{
          background: C.terraLight,
          color: C.terraDark,
          borderBottom: `1px solid ${C.terra}30`,
          padding: "10px 16px",
          fontFamily: sans,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <AlertCircle size={16} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, minWidth: 200, lineHeight: 1.5 }}>
          Você não está logado. Seu progresso <strong>não será salvo</strong> ao recarregar a página.
        </span>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "6px 12px",
            background: C.terra,
            color: C.white,
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: sans,
          }}
        >
          Entrar
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dispensar aviso"
          style={{
            background: "transparent",
            border: "none",
            color: C.terraDark,
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={14} />
        </button>
      </div>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
