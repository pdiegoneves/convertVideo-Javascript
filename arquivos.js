const fs = require('fs')

const Arquivos = {
    listarArquivos(path) {
        const lista = fs.readdirSync(path, (err, itens) => itens);
        const listaDeArquivos = []
        const listaDePastas = []

        lista.forEach((item, index, array) => {
            if(ePasta(item)) {
                listaDePastas.push(item)
            } else {
                listaDeArquivos.push(item)
            }
        })

        listaDePastas.forEach((item, index, array) => {
            const listaTemp = fs.readdirSync(item, (err, itens) => itens);
            listaTemp.forEach((item, index, array) => {
                if(ePasta(item)) {
                    //listaDePastas.push(item)
                    console.log(`pasta: ${item}`)
                } else {
                    //listarArquivos.push(item)
                    console.log(`arquivo: ${item}`)
                }
            })
        })
        return listaDeArquivos.filter(this.filtrarVideos);
    },
       getNomeDoArquivo(arquivo) {
        const nome = arquivo.split('.');
        nome.pop();
        return nome.toString().replace(",",".");
    },
    
    filtrarVideos (arquivo) { 
        const extensoes = [ 'mp4', 'mkv', 'flv', 'mov', 'avi', 'wmv', 'm4a', 'ts', 'webm' ]
        for (extensao of extensoes) {
            if (arquivo.indexOf(extensao) != -1 || arquivo.indexOf(extensao.toUpperCase()) != -1){
                return true
            }
        }
    }
};
function ePasta (path) {
    try {
        return fs.lstatSync(path).isDirectory()
    } catch {
        return false
    }       
}
module.exports = Arquivos;
