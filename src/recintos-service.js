import { gerarAnimal, animaisCarnivoros, animaisPorBioma } from "./recintos-repository.js";

function procurarHabitatsCompativeis(biomasCompativeis, habitatsExistentes) {
    let habitatsDisponiveis = new Map();
    for (const bioma of biomasCompativeis) {
        for (const [habitatNumero, habitatExistente] of Object.entries(habitatsExistentes)) {
            if (habitatExistente.bioma.includes(bioma)) {
                habitatsDisponiveis.set(Number(habitatNumero), habitatExistente);
            }
        }
    }
    return habitatsDisponiveis;
}

function procurarBiomasCompativeis(novoAnimal) {
    let biomasCompativeis = [];
    for (const [bioma, animais] of Object.entries(animaisPorBioma)) {
        if (animais.includes(novoAnimal.tipo)) {
            biomasCompativeis.push(bioma);
        }
    }
    return biomasCompativeis;
}

function adicionarAnimalAoHabitat(novoAnimal, quantidade, habitat) {
    if (habitat.temEspacoSuficiente(novoAnimal, quantidade)) {
        habitat.adicionarAnimais(novoAnimal, quantidade);
        const espacoLivre = habitat.capacidade - habitat.espacoOcupado();
        return { espacoLivre, capacidade: habitat.capacidade };
    }
    return null;
}

function verificarCompatibilidadeCarnivoros(habitat, novoAnimal) {
    const novoAnimalECarcivoro = animaisCarnivoros.includes(novoAnimal.tipo);

    if (novoAnimalECarcivoro) {
        for (const animalExistente of habitat.animaisExistentes) {
            if (animaisCarnivoros.includes(animalExistente.tipo) && animalExistente.tipo !== novoAnimal.tipo) {
                return false; // carnívoro diferente, incompatível
            }
        }

        for (const animalExistente of habitat.animaisExistentes) {
            if (!animaisCarnivoros.includes(animalExistente.tipo)) {
                return false; // animal não carnívoro, incompatível
            }
        }
    } else {
        // Verifica se o habitat já contém carnívoros
        for (const animalExistente of habitat.animaisExistentes) {
            if (animaisCarnivoros.includes(animalExistente.tipo)) {
                return false; // Há um carnívoro no habitat, incompatível
            }
        }
    }

    return true;
}

function recintosService(tipoAnimal, quantidade, habitatsExistentes) {
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
    }

    try {
        const novoAnimal = gerarAnimal(tipoAnimal);
        const biomasCompativeis = procurarBiomasCompativeis(novoAnimal);
        const habitatsCompativeis = procurarHabitatsCompativeis(biomasCompativeis, habitatsExistentes);
        const recintosViaveis = [];

        for (const [numero, habitat] of habitatsCompativeis) {
            if (verificarCompatibilidadeCarnivoros(habitat, novoAnimal)) {
                const resultado = adicionarAnimalAoHabitat(novoAnimal, quantidade, habitat);
                if (resultado) {
                    recintosViaveis.push(`Recinto ${numero} (espaço livre: ${resultado.espacoLivre} total: ${resultado.capacidade})`);
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis.sort() };
    } catch (e) {
        return { erro: e.message };
    }
}

export { recintosService };
