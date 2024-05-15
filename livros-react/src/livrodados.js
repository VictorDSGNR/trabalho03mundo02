import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const obterLivros = () => {
  const livrosSalvos = localStorage.getItem('livros');
  return livrosSalvos ? JSON.parse(livrosSalvos) : [];
};

const LivroDados = () => {
  const navigate = useNavigate();
  
  const opcoes = [
    { codEditora: 1, nome: "Alta Books" },
    { codEditora: 2, nome: "Bookman" },
    { codEditora: 3, nome: "Addison Wesley" },
    { codEditora: 4, nome: "Pearson" },
  ];


  const [codEditora, setCodEditora] = useState(opcoes[0]?.codEditora.toString());
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');

  const tratarCombo = (evento) => {
    setCodEditora(evento.target.value);
  };

  const incluir = (evento) => {
    evento.preventDefault();
    const editoraSelecionada = opcoes.find(opcao => opcao.codEditora.toString() === codEditora);
    const novoLivro = {
      codigo: Date.now(),
      titulo,
      resumo,
      editora: editoraSelecionada ? editoraSelecionada.nome : 'Editora Desconhecida',
      autores: autores.split('\n'),
    };

    const livrosAtualizados = [...obterLivros(), novoLivro];
    localStorage.setItem('livros', JSON.stringify(livrosAtualizados));

    navigate('/');
  };

  return (
    <div className="container mt-1 bg-info">
      <div class="p-3 mb-2 bg-primary">
      <section className="container-imagem"></section>  
    <div className="container mt-5 bg-info"/>
      <h1 className='text-white'>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="fontetitulo text-white">Título</label>
          <input type="text" className="form-control fontelista" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="fontetitulo text-white">Resumo</label>
          <textarea className="form-control fontelista" id="resumo" value={resumo} onChange={(e) => setResumo(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="editora" className="fontetitulo text-white">Editora</label>
          <select className="form-select fontetitulo" id="editora" value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.codEditora} value={opcao.codEditora}>{opcao.nome}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="fontetitulo text-white">Autor(es) (1 por linha)</label>
          <textarea className="form-control" id="autores" value={autores} onChange={(e) => setAutores(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-info fontelista">Salvar Dados</button>
      </form>
    </div>
    </div>
  );
};

export default LivroDados;
