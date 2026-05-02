import { useContext } from "react";
import { ProgressContext } from "./ProgressContext.js";

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress deve ser usado dentro de <ProgressProvider>");
  return ctx;
}
