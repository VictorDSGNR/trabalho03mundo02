import type { NextPage } from 'next'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Livro } from '../../classes/modelo/Livro';
import Head from 'next/head';
import { LinhaLivro } from '../../componentes/LinhaLivro'; 

const LivroLista: NextPage = () => { 
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregando, setCarregando] = useState(true);

  const baseURL = "http://localhost:3000/api/livros";

  const getLivros = async () => {
    setCarregando(true)
    try {
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setCarregando(false)
  };

  const deleteLivro = async (code:number | string) => {
    if (carregando){
      return
    }
    setCarregando(true)
    try {
      const response = await fetch(`${baseURL}/${code}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      getLivros()
      alert('Livro excluído com sucesso')
    } catch (error) {
      alert("Error deleting livro");
    }
    setCarregando(false)
  };

  const handleDeleteLivro =  (code:number | string) => { 
    deleteLivro(code)
  }

  useEffect(() => {
    getLivros();
  }, []);

  return ( 
  <div className="container md-8">
    <Head>
        <title>Catálogo</title>
    </Head> 
     
    <table className="table table-info">
    <section className="container-imagem"></section>   
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
          <LinhaLivro key={index} livro={livro} excluir={handleDeleteLivro} />
        ))}
      </tbody>
    </table>
  </div>
) }


export default LivroLista;