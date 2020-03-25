import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css'

import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [descripton, setDescripton] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');

  const data = {
    title,
    descripton,
    value,
  }

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }

  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
              Voltar para o início
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea placeholder="Descrição"
            value={descripton}
            onChange={e => setDescripton(e.target.value)}
          />
          <input placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  )
}