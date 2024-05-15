
import { Livro } from "../modelo/Livro";


export class ControleLivro {
    
    private livros: Livro[] = [];

    constructor() {
        
        this.livros.push(new Livro(1, 1, "Título do Livro 1", "Resumo do Livro 1", ["Autor 1", "Autor 2"]));
        this.livros.push(new Livro(2, 2, "Título do Livro 2", "Resumo do Livro 2", ["Autor 3"]));
        this.livros.push(new Livro(3, 3, "Título do Livro 3", "Resumo do Livro 3", ["Autor 4", "Autor 5"]));
    }

    
    obterLivros(): Livro[] {
        return this.livros;
    }

    
    adicionarLivro(livro: Livro): void {
        
        const novoCodigo = this.livros.reduce((acc, cur) => cur.codigo > acc ? cur.codigo : acc, 0) + 1;
        livro.codigo = novoCodigo;
        this.livros.push(livro);
    }

    
    removerLivro(codigo: number): void {
        this.livros = this.livros.filter(livro => livro.codigo !== codigo);
    }

    
    atualizarLivro(livroAtualizado: Livro): void {
        const index = this.livros.findIndex(livro => livro.codigo === livroAtualizado.codigo);
        if (index !== -1) {
            this.livros[index] = livroAtualizado;
        }
    }
}
