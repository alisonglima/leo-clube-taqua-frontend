import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

function Profile() {
  const [debts, setDebts] = useState([]);
  const [total, setTotal] = useState(0);

  const history = useHistory();

  const partnerId = localStorage.getItem("partnerId");
  const partnerName = localStorage.getItem("partnerName");

  useEffect(() => {
    api
      .get("debt", {
        headers: {
          user_id: partnerId,
        },
      })
      .then((response) => {
        setDebts(response.data);
      });
  }, [partnerId]);

  useEffect(() => {
    const sumTotal = debts
      .map((debt) => debt.value)
      .reduce((total, num) => {
        return total + num;
      }, 0);

    setTotal(sumTotal);
  }, [debts]);

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {partnerName}</span>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Dívidas</h1>

      <ul>
        {debts.map((debt) => (
          <li key={debt._id}>
            <strong>NOME:</strong>
            <p>{debt.name}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(debt.value)}
            </p>
          </li>
        ))}
      </ul>
      <div className="data-bank">
        <h1>
          Total:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </h1>

        <p>
          Caso deseje pagar por transferência bancária:
          <br /> Banco: <strong>Caixa</strong> &nbsp;&nbsp;&nbsp; Agência:{" "}
          <strong>0358</strong>
          <br /> Operação: <strong>013</strong>
          <br /> Conta: <strong>00072956-5</strong>
          <br /> CPF: <strong>354.370.058-81</strong>
          <br /> Beneficiária: <strong>Flávia Correia</strong>
          <br />
          <strong>
            * Não esqueça de mandar o comprovante no meu whatsapp.
          </strong>
          <br />
          <br />
          Caso deseje pagar por boleto bancário, cartão de crédito, pessoalmente
          ou caso tenha qualquer dúvida entre em contato comigo(
          <strong>Alison</strong>) pelo whatsapp.
        </p>
      </div>
    </div>
  );
}

export default Profile;
