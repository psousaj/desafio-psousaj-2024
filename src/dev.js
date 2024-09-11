import { RecintosZoo } from "./recintos-zoo.js";

const resultadoCrocodilo = new RecintosZoo().analisaRecintos('CROCODILO', 1);
const resultadoHipopotamo = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);

console.group('Resultados de Análise de Recintos');
console.group('CROCODILO');
console.log(resultadoCrocodilo);
console.groupEnd();

console.group('HIPOPOTAMO');
console.log(resultadoHipopotamo);
console.groupEnd();

console.groupEnd();
