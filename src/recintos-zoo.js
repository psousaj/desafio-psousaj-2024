import { recintosService } from "./recintos-service.js";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        return recintosService(animal, quantidade)
    }

}

export { RecintosZoo as RecintosZoo };
