import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

function Logon() {
  const [email, setEmail] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("partner", { email });

      const { name, _id } = response.data;

      localStorage.setItem("partnerId", _id);
      localStorage.setItem("partnerEmail", email);
      localStorage.setItem("partnerName", name);

      history.push("profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu E-mail"
          />
          <button className="button" type="submit">
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}

export default Logon;
