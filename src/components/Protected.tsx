import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Protected({ children }: any) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = "/login";
      } else {
        setOk(true);
      }
    });
  }, []);
  return ok ? children : null;
}
