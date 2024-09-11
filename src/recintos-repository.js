import { animaisTipos } from "./tipos.js";

class Animal {
    constructor(tipo) {
        this.tipo = animaisTipos[tipo.toUpperCase()];
        if (!this.tipo) {
            throw new Error('Animal inválido');
        }
        this.espacoOcupado = this.pegarTamanhoPadrao(this.tipo);
    }

    pegarTamanhoPadrao(tipo) {
        switch (tipo.toLowerCase()) {
            case 'macaco': return 1;
            case 'leao': return 3;
            case 'leopardo': return 2;
            case 'crocodilo': return 3;
            case 'gazela': return 2;
            case 'hipopotamo': return 4;
            default: throw new Error('Animal inválido');
        }
    }
}

class Habitat {
    constructor(bioma, capacidade, animaisExistentes = []) {
        this.bioma = bioma;
        this.capacidade = capacidade;
        this.animaisExistentes = animaisExistentes;
    }

    espacoOcupado() {
        let espacoOcupadoTotal = 0;
        for (const animal of this.animaisExistentes) {
            espacoOcupadoTotal += animal.espacoOcupado;
        }
        // Caso especial onde tem mais de uma especie no habitat
        const tiposDeAnimais = this.animaisExistentes.map(obj => obj.tipo)
        if (new Set(tiposDeAnimais).size > 1) {
            espacoOcupadoTotal++;
        }
        return espacoOcupadoTotal;
    }

    temEspacoSuficiente(novoAnimal, quantidade) {
        const espacoNecessario = (novoAnimal.espacoOcupado * quantidade) + this.espacoOcupado();
        return espacoNecessario <= this.capacidade;
    }

    adicionarAnimais(novoAnimal, quantidade) {
        for (let i = 0; i < quantidade; i++) {
            this.animaisExistentes.push(novoAnimal);
        }
    }
}

const gerarAnimal = (tipo) => new Animal(tipo);

const animaisPorBioma = {
    savana: ['leao', 'leopardo', 'gazela', 'hipopotamo', 'macaco'],
    rio: ['crocodilo', 'hipopotamo'],
    floresta: ['macaco'],
};

const animaisCarnivoros = ['leao', 'leopardo', 'crocodilo'];

export { gerarAnimal, animaisPorBioma, animaisCarnivoros, Habitat };
