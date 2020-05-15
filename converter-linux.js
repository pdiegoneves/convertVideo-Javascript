const fs = require('fs')
const shell = require('shelljs')
const pastas = ['/home/diego/Vídeos/MESTRES DO CAPITALISMO/O Jeito Clube do Valor de Investir Dinheiro'
] || __dirname
let pastaIndice = 0
const executavel = 'handbrake-jz.cli'
const parametros = '-e x265 -T'

const converterTodos = listaArquivos => {
	criarPasta(pastas[pastaIndice])
    for ( arquivo of listaArquivos ) {
        converter(arquivo)
    }
}

function filtrarVideos (arquivo) { 
	if (arquivo.indexOf('mp4') != -1 ) {
		return true;
	}
	
	if (arquivo.indexOf('MP4') != -1 ) {
		return true;
	}
	
	if (arquivo.indexOf('mkv') != -1 ) {
		return true;
	}
	
	if (arquivo.indexOf('mkv') != -1 ) {
		return true;
	}
	
	if (arquivo.indexOf('MKV') != -1 ) {
		return true;
	}
	
	if (arquivo.indexOf('FLV') != -1 ) {
		return true;
	}
	
	if (arquivo.indexOf('flv') != -1 ) {
		return true;
	}
}


function listarArquivos(path) {
    const listaDeArquivos = fs.readdirSync(path, (err, arquivos) => arquivos)
    return listaDeArquivos.filter(filtrarVideos)
}

function converter(arquivo) {
    console.log(`INICIANDO A CONVERSÃO DO ARQUIVO ${arquivo}`)
    shell.exec(`${executavel} -i "${pastas[pastaIndice]}/${arquivo}" -o "${pastas[pastaIndice]}_op/${arquivo.split('.')[0]}.mp4" ${parametros}`)
    console.log(`CONCLUÍDO A CONVERSÃO DO ARQUIVO ${arquivo}`)
    shell.exec(`echo ${arquivo} concluído em ${Date(Date.now())} >> ${pastas[pastaIndice]}_op/convercao.log`)
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