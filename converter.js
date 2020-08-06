const shell = require("shelljs");
const funcoesDeArquivos = require("./funcoesDeArquivos");
const os = require("os");

const parametros = "-e x264 -T";

const pastas = ["D:/teste"] || __dirname;

let pastaIndice = 0;
let executavel = "";
if (os.type() === "Linux") {
  executavel = "handbrake-jz.cli";
} else {
  executavel = "HandBrakeCLI.exe";
}

const converterTodosArquivos = (listaArquivos) => {
  listaArquivos.map((arquivo) => converter(arquivo));
};

function converter(arquivo) {
  console.log(`INICIANDO A CONVERSÃO DO ARQUIVO ${arquivo}`);
  shell.exec(
    `${executavel} -i "${pastas[pastaIndice]}/${arquivo}" -o "${
      pastas[pastaIndice]
    }/${funcoesDeArquivos.getNomeDoArquivo(arquivo)}-1.mp4" ${parametros}`
  );
  console.log(`CONCLUÍDO A CONVERSÃO DO ARQUIVO ${arquivo}`);
}

for (let pasta of pastas) {
  console.log(pastas[pastaIndice]);
  converterTodosArquivos(funcoesDeArquivos.listarArquivos(pastas[pastaIndice]));
  pastaIndice++;
}
