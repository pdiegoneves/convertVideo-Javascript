const fs = require('fs')
const Arquivos = {
    listarArquivos(path) {
        const listaDeArquivos = fs.readdirSync(path, (err, arquivos) => arquivos);
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
module.exports = Arquivos;
