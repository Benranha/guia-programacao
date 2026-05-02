import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { useAuth } from "./useAuth.js";
import { ProgressContext } from "./ProgressContext.js";

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    if (!user) {
      Promise.resolve().then(() => {
        if (!cancelled) setCompleted([]);
      });
      return () => {
        cancelled = true;
      };
    }
    Promise.resolve().then(() => {
      if (!cancelled) setLoading(true);
    });
    supabase
      .from("user_progress")
      .select("module_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setCompleted(data.map((row) => row.module_id));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const markComplete = async (moduleId) => {
    if (completed.includes(moduleId)) return;
    if (!user || !isSupabaseConfigured) return;
    setCompleted((prev) => (prev.includes(moduleId) ? prev : [...prev, moduleId]));
    const { error } = await supabase
      .from("user_progress")
      .upsert({ user_id: user.id, module_id: moduleId }, { onConflict: "user_id,module_id" });
    if (error) {
      setCompleted((prev) => prev.filter((id) => id !== moduleId));
      console.error("Erro ao salvar progresso:", error.message);
    }
  };

  const isComplete = (moduleId) => completed.includes(moduleId);

  return (
    <ProgressContext.Provider value={{ completed, markComplete, isComplete, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}
