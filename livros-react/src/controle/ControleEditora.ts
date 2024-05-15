
import { Editora } from "../modelo/Editora";


export class ControleEditora {
    
    private editoras: Editora[] = [];

    constructor() {
        
        this.editoras.push(new Editora(1, "Editora A"));
        this.editoras.push(new Editora(2, "Editora B"));
        this.editoras.push(new Editora(3, "Editora C"));
    }

    
    getEditoras(): Editora[] {
        return this.editoras;
    }

    
    getEditoraPorCodigo(codEditora: number): Editora | undefined {
        return this.editoras.find(editora => editora.codEditora === codEditora);
    }

    
    adicionarEditora(editora: Editora): void {
        this.editoras.push(editora);
    }

    
    removerEditora(codEditora: number): void {
        this.editoras = this.editoras.filter(editora => editora.codEditora !== codEditora);
    }

    
    atualizarEditora(editoraAtualizada: Editora): void {
        const index = this.editoras.findIndex(editora => editora.codEditora === editoraAtualizada.codEditora);
        if (index !== -1) {
            this.editoras[index] = editoraAtualizada;
        }
    }
}
