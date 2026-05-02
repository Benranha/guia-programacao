import { useState } from "react";
import { Info, X } from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";
import { T, sans } from "../lib/theme.js";

export default function AnonBanner({ onLoginClick }) {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (loading || user || dismissed) return null;

  return (
    <div
      style={{
        background: T.accentSoft,
        color: T.text,
        borderBottom: `1px solid ${T.border}`,
        padding: "10px 16px",
        fontFamily: sans,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <Info size={15} color={T.accent} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, minWidth: 200, lineHeight: 1.5 }}>
        Você não está logado — seu progresso <strong>não será salvo</strong> ao recarregar.
      </span>
      <button
        onClick={onLoginClick}
        className="gp-btn gp-btn-primary"
        style={{ padding: "6px 14px", fontSize: 12 }}
      >
        Entrar
      </button>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dispensar aviso"
        style={{
          background: "transparent",
          border: "none",
          color: T.textMuted,
          cursor: "pointer",
          padding: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
