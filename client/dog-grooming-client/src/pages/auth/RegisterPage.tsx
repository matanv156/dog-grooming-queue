import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, type RegisterRequest } from "../../api/auth";
import styles from "./AuthPage.module.css";
import logo from "../../assets/images/logo.png";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password || !fullName) {
      setError("Please fill all fields.");
      return;
    }

    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
      setError("Please enter both first and last name.");
      return;
    }

    setLoading(true);

    const newUser: RegisterRequest = {
      username,
      password,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
    };

    const res = await register(newUser);

    if (res?.status === 200) {
      navigate("/login");
    } else if (res?.status === 400) {
      setError(
        typeof res.data === "string" ? res.data : "Username already exists."
      );
    } else {
      setError("Sign up failed. Please try again later.");
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
          <h1 className={styles.title}>Nice to meet you!</h1>
          <p className={styles.subtitle}>
            Please enter your details to sign up
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

            <input
              type="text"
              placeholder="Full Name"
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          {error && <p className={styles.error}>{error}</p>}

          <p className={styles.footerText}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};
