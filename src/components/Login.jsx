import React, { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --- Проверка полей ---
  function validate(email, password) {
    if (!email.includes("@")) return "Email должен содержать @";
    if (password.length < 6) return "Пароль должен быть не меньше 6 символов";
    return null;
  }

  // --- Вход ---
  async function handleSignIn(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const err = validate(email, password);
    if (err) {
      setMessage(err);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage("Ошибка входа: " + error.message);
    else {
      setMessage("Вход выполнен успешно");
      navigate("/");
    }
    setLoading(false);
  }

  // --- Регистрация --
  async function handleSignUp(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const err = validate(email, password);
    if (err) {
      setMessage(err);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setMessage("Ошибка регистрации: " + error.message);
    else setMessage("Письмо для подтверждения отправлено");
    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Вход / Регистрация</h1>

        <form>
          <div className="login-input">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-actions">
            <button disabled={loading} onClick={handleSignIn}>
              {loading ? "Вход..." : "Войти"}
            </button>
            <button disabled={loading} onClick={handleSignUp}>
              Регистрация
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`login-message ${
              message.includes("Ошибка") ? "error" : "success"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
