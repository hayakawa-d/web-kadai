import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

function Register({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError("登録に失敗しました");
    }
  };

  const registerGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError("Google登録に失敗しました");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>新規登録</h1>

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

        <button className="auth-button" onClick={registerEmail}>
          メールで登録
        </button>

        <button className="auth-button google" onClick={registerGoogle}>
          Googleで登録
        </button>

        <button className="auth-switch" onClick={onSwitch}>
          ログインはこちら
        </button>
      </div>
    </div>
  );
}

export default Register;
