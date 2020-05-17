const shell = require('shelljs')
const arq = require('./arquivos')
const os = require('os')
const pastas = [
'/home/diego/Videos/01 - Introdução e Instalação'
] || __dirname
let pastaIndice = 0
let executavel = ''
if(os.type() === 'Linux') {
	executavel = 'handbrake-jz.cli'
} else {
	executavel = 'HandBrakeCLI.exe'
}

const parametros = '-e x264 -T'

const converterTodosArquivos = listaArquivos => {
    for ( arquivo of listaArquivos ) {
        converter(arquivo)
    }
}

function converter(arquivo) {
	console.log(`INICIANDO A CONVERSÃO DO ARQUIVO ${arquivo}`)
    shell.exec(`${executavel} -i "${pastas[pastaIndice]}/${arquivo}" -o "${pastas[pastaIndice]}/${arq.getNomeDoArquivo(arquivo)}-1.mp4" ${parametros}`)
    console.log(`CONCLUÍDO A CONVERSÃO DO ARQUIVO ${arquivo}`)
}

for(let pasta of pastas){
	console.log(pastas[pastaIndice])
	converterTodosArquivos(arq.listarArquivos(pastas[pastaIndice]))
	pastaIndice++
}
