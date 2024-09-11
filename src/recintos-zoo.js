import { recintosService } from "./recintos-service.js";
import { gerarAnimal, Habitat } from "./recintos-repository.js";
import { biomasTipo } from "./tipos.js";

class RecintosZoo {
    constructor() {
        this.habitatsExistentes = {
            1: new Habitat(biomasTipo.SAVANA, 10, Array.from({ length: 3 }, () => gerarAnimal('macaco'))),
            2: new Habitat(biomasTipo.FLORESTA, 5),
            3: new Habitat([biomasTipo.SAVANA, biomasTipo.RIO], 7, [gerarAnimal('gazela')]),
            4: new Habitat(biomasTipo.RIO, 8),
            5: new Habitat(biomasTipo.SAVANA, 9, [gerarAnimal('leao')]),
        };
    }

    analisaRecintos(animal, quantidade) {
        return recintosService(animal, quantidade, this.habitatsExistentes);
    }
}

export { RecintosZoo as RecintosZoo };
