import React, { useState, useEffect } from 'react';
import { obterLivros } from './livrodados'; 

const LivroLista = () => {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const dadosDosLivros = obterLivros();
    setLivros(dadosDosLivros);
  }, []);

  const excluirLivro = (codigoLivro) => {
    const livrosAtualizados = livros.filter(livro => livro.codigo !== codigoLivro);
    localStorage.setItem('livros', JSON.stringify(livrosAtualizados));
    setLivros(livrosAtualizados);
  };

  return (
        <div className="container-md7">
          <section className="container-imagem"></section>          
      <table className="table table-info">
        <thead className="table-dark">
          <tr>
          <th className="fontetitulo">Título</th>
          <th className="fontetitulo">Resumo</th>
          <th className="fontetitulo">Editora</th>
          <th className="fontetitulo">Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro, index) => (
            <tr key={index}>
              <td className="fontelista">
                {livro.titulo}
                <br />
                <button 
                  className="btn btn-danger btn-sm mt-2 fontelista" 
                  onClick={() => excluirLivro(livro.codigo)}
                >
                  Excluir
                </button>
              </td>
              <td className="fontelista">{livro.resumo}</td>
              <td className="fontelista">{livro.editora}</td>
              <td className="fontelista">{livro.autores.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default LivroLista;
