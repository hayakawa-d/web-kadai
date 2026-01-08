import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style.css";

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (user) {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }

  return (
    <>
      {mode === "login" && <Login onSwitch={() => setMode("register")} />}
      {mode === "register" && <Register onSwitch={() => setMode("login")} />}
    </>
  );
}

export default App;
