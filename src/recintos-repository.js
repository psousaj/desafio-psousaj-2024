import { animaisTipos, biomasTipo } from "./tipos.js";

function gerarHabitat(bioma, tamanhoMaximo, animaisExistentes) {
    return {
        bioma: bioma,
        capacidade: tamanhoMaximo,
        animaisExistentes
    }
}

const gerarAnimal = (tipo) => {
    const newTipo = animaisTipos[tipo.toUpperCase()];

    // Verifica se o tipo existe no objeto animaisTipos
    if (!newTipo) {
        throw new Error('Animal inválido');
    }

    function pegarTamanhoPadrao(tipo) {
        switch (tipo.toLowerCase()) {
            case 'macaco':
                return 1;
            case 'leao':
                return 3;
            case 'leopardo':
                return 2;
            case 'crocodilo':
                return 3;
            case 'gazela':
                return 2;
            case 'hipopotamo':
                return 4;
            default:
                throw new Error('Animal inválido');
        }
    }

    return { tipo: newTipo, espacoOcupado: pegarTamanhoPadrao(tipo) };
};

// Acho que seria interessante ter um repositório salvando e gerando os números sequencialmente
// mas para simplificar, um objeto com os números à mão é razoável porém não escala
const habitatsExistentesMock = {
    1: gerarHabitat(biomasTipo.SAVANA, 10, [gerarAnimal('macaco'), gerarAnimal('macaco'), gerarAnimal('macaco')]),
    2: gerarHabitat(biomasTipo.FLORESTA, 5),
    3: gerarHabitat(biomasTipo.SAVANA_E_RIO, 7, [gerarAnimal('gazela')]),
    4: gerarHabitat(biomasTipo.RIO, 8),
    5: gerarHabitat(biomasTipo.SAVANA, 9, [gerarAnimal('leao')]),
};

const animaisPorBioma = {
    savana: ['leao', 'leopardo', 'gazela', 'hipopotamo'],
    rio: ['crocodilo', 'hipopotamo'],
    floresta: ['macaco'],
}
const animaisCarnívoros = ['leao', 'leopardo']

export {
    gerarAnimal,
    gerarHabitat,
    habitatsExistentesMock as habitatsExistentes,
    animaisPorBioma,
    animaisCarnívoros
}