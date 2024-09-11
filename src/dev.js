import { RecintosZoo } from "./recintos-zoo.js";

const resultadoCrocodilo = new RecintosZoo().analisaRecintos('CROCODILO', 1);
const resultadoMacaco = new RecintosZoo().analisaRecintos('MACACO', 2);

console.group('Resultados de Análise de Recintos');
console.group('CROCODILO');
console.log(resultadoCrocodilo);
console.groupEnd();

console.group('MACACO');
console.log(resultadoMacaco);
console.groupEnd();

console.groupEnd();
