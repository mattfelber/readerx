import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
export default function Dashboard({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Bienvenido al Dashboard</h2>
      {user && <p>Usuario: {user.email}</p>}
      <button onClick={handleLogout}>Cerrar sesión</button>

      {/* Aquí se renderizan ApiTest y TextReader */}
      <div style={{ marginTop: "2rem" }}>{children}</div>
    </div>
  );
}
