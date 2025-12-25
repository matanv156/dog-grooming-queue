import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await loginApi(username, password);
    setLoading(false);

    if (res) {
      setUser({ username: res.username, token: res.token });
      navigate("/appointments");
    } else {
      setError("Login failed. Check username/password.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formPanel}>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
      <div className={styles.imagePanel} />
    </div>
  );
};
