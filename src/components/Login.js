import { supabase } from "../supabaseClient";

export default function Login() {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
    if (error) {
      alert("Error al iniciar sesión: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Iniciar sesión</h2>
      <button onClick={handleGitHubLogin}>Login con GitHub</button>
    </div>
  );
}
