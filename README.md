# jogomemoria
projeto Jogo da Memoria

Para a execução desse projeto e necessário ter o "node e mongoDb "  instalados.


1 - Baixe o projeto

2 - Abra o terminal e navegue até a pasta do projeto

3 - Execute o coomando "npm install" na raiz do projeto onde está localizado o arquivio "package.json"

4 - Ainda na pasta raiz execute o comando "npm start"

5 - Em uma nova tela do terminal execute o comando "mongod"  para subir o mongoDB.

6 - Em uma nova tela do terminal execute o comando "gulp start"  para subir o projeto.

7 - Abra o navegador e na barra de endereço insira "http://localhost:3000"


*Caso seu mongoDb tenha usuario e senha e necessário alterar a linha 4 do arquivo servidorNode.js "mongodb://localhost:27017/jogoMemoria" 
par mongodb://USER:PASS@localhost:27017/jogoMemoria
USER -> Usuario do Banco
PASS -> Senha