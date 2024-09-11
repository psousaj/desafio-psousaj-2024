import { animaisCarnivoros } from "./recintos-repository.js";
import { animaisTipos } from "./tipos.js";

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

function verificarCompatibilidadeHipopotamo(habitat, novoAnimal) {
    if (novoAnimal.tipo === animaisTipos.HIPOPOTAMO) {
        for (const animalExistente of habitat.animaisExistentes) {
            if (animalExistente.tipo !== animaisTipos.HIPOPOTAMO && !['savanna', 'rio'].includes(habitat.bioma)) {
                return false; // Hipopótamo só tolera outras espécies em savana e rio
            }
        }
    }
    return true;
}

function verificarCompatibilidadeMacaco(habitat, novoAnimal, quantidade) {
    if (novoAnimal.tipo === animaisTipos.MACACO) {
        if (habitat.animaisExistentes.length === 0 && quantidade <= 1) {
            return false; // Macaco precisa de pelo menos outro animal no recinto
        }
    }
    return true;
}

export { verificarCompatibilidadeCarnivoros, verificarCompatibilidadeHipopotamo, verificarCompatibilidadeMacaco };
