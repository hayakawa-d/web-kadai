import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError("ログインに失敗しました");
    }
  };

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError("Googleログインに失敗しました");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>ログイン</h1>

        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" onClick={loginEmail}>
          ログイン
        </button>

        <button className="auth-button google" onClick={loginGoogle}>
          Googleでログイン
        </button>

        <button className="auth-switch" onClick={onSwitch}>
          新規登録はこちら
        </button>
      </div>
    </div>
  );
}

export default Login;
