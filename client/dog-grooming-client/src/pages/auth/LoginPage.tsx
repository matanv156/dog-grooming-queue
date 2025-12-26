import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi, type LoginRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./AuthPage.module.css";

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

    if (username && password) {
      const user: LoginRequest = { username: username, password: password };
      const res = await loginApi(user);
      setLoading(false);

      if (res) {
        setUser({ username: res.username, token: res.token });
        navigate("/appointments");
      } else {
        setError("Login failed. Check username/password.");
      }
    } else {
      setError("Please fill both fields.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection} />
      <div className={styles.formSection}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Dog Grooming Logo" className={styles.logo} />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>
            Please enter your details to sign in
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className={styles.button}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            className={styles.footerText}
            onClick={() => navigate("/register")}
          >
            Don’t have an account? <span>Sign up</span>
          </p>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};
