import {
    gerarAnimal,
    habitatsExistentes,
    animaisCarnívoros,
    animaisPorBioma
} from "./recintos-repository.js";

function procurarHabitatsCompativeis(biomasCompativeis) {
    let habitatsDisponiveis = new Map();
    for (const bioma of biomasCompativeis) {
        for (const [habitatNumero, habitatExistente] of Object.entries(habitatsExistentes)) {
            // includes porque pode haver habitats mistos
            // Ex: savana e rio
            if (habitatExistente.bioma.includes(bioma)) {
                habitatsDisponiveis.set(
                    Number.parseInt(habitatNumero),
                    habitatExistente,
                )
            }
        };
    }
    return habitatsDisponiveis
}

function procurarBiomasCompativeis(novoAnimal) {
    let biomasCompativeis = [];
    for (const [bioma, dados] of Object.entries(animaisPorBioma)) {
        if (dados.includes(novoAnimal.tipo)) {
            biomasCompativeis.push(bioma)
        }
    };
    return biomasCompativeis
}

// Onde irei aplicar as regras do negócio
function recintosService(tipoAnimal, quantidade) {
    const novoAnimal = gerarAnimal(tipoAnimal)
    const biomasCompativeis = procurarBiomasCompativeis(novoAnimal);
    const habitatsCompativeis = procurarHabitatsCompativeis(biomasCompativeis);

    for (const [numero, habitat] of habitatsCompativeis) {
        console.log(habitat)
    }
    // console.log(habitatsCompativeis)
};

export { recintosService }