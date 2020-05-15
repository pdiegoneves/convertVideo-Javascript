const fs = require('fs')
const shell = require('shelljs')
const pastas = [
"D:/CURSOS/_Converter/1-Tratar/Manutencao Express - Formatacao e Reparo de Computadores/1. Módulo 1 - Apresentação e Introdução aos Conceitos Base",
"D:/CURSOS/_Converter/1-Tratar/Manutencao Express - Formatacao e Reparo de Computadores/2. Módulo 2 - Conhecendo o Hardware de um Computador",
"D:/CURSOS/_Converter/1-Tratar/Manutencao Express - Formatacao e Reparo de Computadores/3. Módulo 3 - Software e os Principais Problemas de Computadores",
"D:/CURSOS/_Converter/1-Tratar/Manutencao Express - Formatacao e Reparo de Computadores/4. Módulo 4 - Formatação de Computadores Completo",
"D:/CURSOS/_Converter/1-Tratar/Manutencao Express - Formatacao e Reparo de Computadores/5. Módulo 5 - EXTRA - Manutenção de Computadores (Hardware)",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/1. Introdução ao Curso",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/10. Shared Preferences",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/11. Futures e Streams",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/12. Padrão Bloc (Business Logic Component)",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/13. Tela de Detalhes do Carro",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/14. Pull To Refresh",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/15. SQLite - banco de dados",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/16. Brincando com Cache",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/17. Salvar nos Favoritos",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/18. InserirAtualizarExcluir o Carro no Web Service",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/19. Camera - fotos e galeria",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/2. Instalação do Flutter SDK",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/20. Fotos nos Carros",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/21. Gerenciamento de Estado com Provider",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/22. Streams e Bus de Eventos",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/23. Alertas do tipo LongClick, BottomSheet e Share",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/24. Multimídia - VideoPlayer",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/25. Google Maps",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/26. Firebase Authentication",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/27. ATENÇÃO",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/28. Firebase RemoteConfig",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/29. Firebase Firestore",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/3. Dart básico",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/30. FCM - Firebase Cloud Messaging (Push Notifications)",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/31. Firebase Storage",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/32. Outros Widgets",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/33. Outros plugins",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/34. Revisão ListViewPageView e Futures",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/35. Revisão app dos Filmes",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/36. Extras - app Carros",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/37. Extras - Parser de JSON",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/38. Dúvidas & Extras",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/39. Exemplos de Código (Dúvidas)",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/4. Flutter básico e Widgets",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/40. Build Android e Google Play",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/5. Projeto dos Carros - Formulário de Login",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/6. Login com Web Service",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/7. Home & Drawer",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/8. Lista de Carros",
"D:/CURSOS/_Converter/1-Tratar/Flutter Essencial/9. TabBar"
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