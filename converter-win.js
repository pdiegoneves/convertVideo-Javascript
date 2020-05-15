const fs = require('fs')
const shell = require('shelljs')
const pastas = [

] || __dirname
let pastaIndice = 0
const executavel = 'HandBrakeCLI.exe'
const parametros = '-e x264 -T'

const converterTodos = listaArquivos => {
	criarPasta(pastas[pastaIndice])
    for ( arquivo of listaArquivos ) {
        converter(arquivo)
    }
}

function filtrarVideos (arquivo) { 
	const extensoes = [ 'mp4', 'mkv', 'flv', 'mov', 'avi', 'wmv', 'm4a', 'ts', 'webm' ]
	for (extensao of extensoes) {
		if (arquivo.indexOf(extensao) != -1 || arquivo.indexOf(extensao.toUpperCase()) != -1){
			return true
		}
	}
}

function listarArquivos(path) {
    const listaDeArquivos = fs.readdirSync(path, (err, arquivos) => arquivos)
    return listaDeArquivos.filter(filtrarVideos)
}

function converter(arquivo) {
	console.log(`INICIANDO A CONVERSÃO DO ARQUIVO ${arquivo}`)
    shell.exec(`${executavel} -i "${pastas[pastaIndice]}/${arquivo}" -o "${pastas[pastaIndice]}_op/${getNomeDoArquivo(arquivo)}.mp4" ${parametros}`)
    console.log(`CONCLUÍDO A CONVERSÃO DO ARQUIVO ${arquivo}`)
}

function getNomeDoArquivo(arquivo) {
	const nome = arquivo.split('.');
	nome.pop();
	return nome.toString()
}

function criarPasta(pasta = __dirname){
    if(fs.existsSync(pastas[pastaIndice]+'_op')) {
        console.log(`pastas[pastaIndice] ${pastas[pastaIndice]}_op já existe`)
    } else {
        console.log(`Criando pastas[pastaIndice] ${pastas[pastaIndice]}_op`)
        fs.mkdirSync(pastas[pastaIndice]+'_op')
    }
}

for(let pasta of pastas){
	console.log(pastas[pastaIndice])
	converterTodos(listarArquivos(pastas[pastaIndice]))
	pastaIndice++
}
//converterTodos(listarArquivos(pastas[0]))
