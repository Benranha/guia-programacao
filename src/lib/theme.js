// Tokens do design system. Os valores reais ficam em CSS vars (`src/index.css`)
// — esses helpers só fornecem strings prontas pra usar em styles inline.

export const T = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  surface2: 'var(--surface-2)',
  surface3: 'var(--surface-3)',
  text: 'var(--text)',
  textStrong: 'var(--text-strong)',
  textMuted: 'var(--text-muted)',
  textSubtle: 'var(--text-subtle)',
  border: 'var(--border)',
  borderStrong: 'var(--border-strong)',

  accent: 'var(--accent)',
  accentHover: 'var(--accent-hover)',
  accentSoft: 'var(--accent-soft)',
  accentRing: 'var(--accent-ring)',

  success: 'var(--success)',
  successSoft: 'var(--success-soft)',
  warning: 'var(--warning)',
  warningSoft: 'var(--warning-soft)',
  danger: 'var(--danger)',
  dangerSoft: 'var(--danger-soft)',

  codeBg: 'var(--code-bg)',
  codeText: 'var(--code-text)',
  codeBorder: 'var(--code-border)',
  overlay: 'var(--overlay)',

  shadowSm: 'var(--shadow-sm)',
  shadowMd: 'var(--shadow-md)',
  shadowLg: 'var(--shadow-lg)',
};

export const sans = 'var(--font-sans)';
export const mono = 'var(--font-mono)';
export const display = 'var(--font-display)';

// pilares com fallback semântico (usa CSS vars que mudam por tema)
export const PILLARS = [
  { l: 'Definição', c: 'var(--p-definicao)' },
  { l: 'Comparação', c: 'var(--p-comparacao)' },
  { l: 'Circunstâncias', c: 'var(--p-circunstancias)' },
  { l: 'Relação', c: 'var(--p-relacao)' },
  { l: 'Testemunho', c: 'var(--p-testemunho)' },
];

// Compat: muitos arquivos importam `C` e `serif` do tema antigo.
// Mantemos para evitar quebrar o build durante a migração — todos os valores
// agora apontam para as CSS vars novas.
export const C = {
  cream: 'var(--bg)',
  white: 'var(--surface)',
  ink: 'var(--text)',
  terra: 'var(--accent)',
  terraLight: 'var(--accent-soft)',
  terraDark: 'var(--accent-hover)',
  muted: 'var(--text-muted)',
  border: 'var(--border)',
  green: 'var(--success)',
  greenLight: 'var(--success-soft)',
  purple: 'var(--p-definicao)',
  purpleLight: 'var(--accent-soft)',
};
export const serif = 'var(--font-display)';

// hook de tema simples (light/dark) com persistência em localStorage
import { useEffect, useState } from 'react';
const STORAGE_KEY = 'gp-theme';

function getInitial() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle, setTheme };
}
