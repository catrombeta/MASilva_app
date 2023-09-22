# Documentação do Projeto MA Silva

## Introdução

Esse projeto é uma aplicação desenvolvida para a empresa MA Silva, na qual é uma empresa de renome voltada à confecção de rolhas de cortiça e possui foco em sustentabilidade. A aplicação será utilizada em uma feira de stands num dispositivo chamado MUPI que leva o Android (versão 7.1) como sistema operacional.

## Requisitos de Instalação

1. Node.js e npm
2. Java JDK
3. Android Studio
4. Cordova

## Uso

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Adicione a plataforma Android com `cordova platform add android`
4. Execute o comando `cordova run android` para instalar a aplicação no dispositivo

## Estrutura do Projeto

O projeto é dividido em 3 pastas principais:

1. `www`: Contém os arquivos HTML, CSS e JavaScript da aplicação
2. `platforms`: Contém os arquivos nativos da plataforma Android
3. `plugins`: Contém os plugins utilizados pela aplicação
4. `res`: Contém os recursos utilizados pela aplicação como ícones e splash screens

## Telas

A aplicação possui 3 terlas principais:

1. Tela de vídeo corporativo
2. Tela de apresentação de produtos
3. Tela de informações sobre a visão de sustentabilidade da empresa

## Comandos Úteis

1. Certificar de ter o Node.Js e o npm instalados. Em seguida, instalar o Cordova com o comando:
`npm install -g cordova`

2. Criar um projeto com o comando:
 `cordova create <nome do projeto> <nome do pacote> <nome do projeto>`

3. Adicionar plataformas com o comando:
`cordova platform add <nome da plataforma>`
Exemplo: `cordova platform add android`
OBS: para adicionar uma versão específica de Android, utilize o comando:
`cordova platform add android@<versão>`

4. Adicionar plugins com o comando:
`cordova plugin add <nome do plugin>`
Exemplo: `cordova plugin add cordova-plugin-whitelist`

5. Para construir o projeto, utilize o comando:
`cordova build <nome da plataforma>`
Exemplo: `cordova build android`

6. Para executar o projeto no dispositivo, utilize o comando:
`cordova run <nome da plataforma>`
Exemplo: `cordova run android`
OBS: em caso de um dispositivo específico conectado via USB, utilize o comando:
`cordova run android --target=<id do dispositivo>`

7. Para executar o projeto no navegador, utilize o comando:
`cordova run browser`

8. Para executar o projeto no emulador, utilize o comando:
`cordova emulate <nome da plataforma>`

9. Para remover uma plataforma, utilize o comando:
`cordova platform remove <nome da plataforma>`
Exemplo: `cordova platform remove android`

10. Para remover um plugin, utilize o comando:
`cordova plugin remove <nome do plugin>`
Exemplo: `cordova plugin remove cordova-plugin-whitelist`

11. Para listar as plataformas, utilize o comando:
`cordova platform ls`

12. Para listar os plugins, utilize o comando:
`cordova plugin ls`

13. Para listar os dispositivos conectados, utilize o comando:
`adb devices`

## Contato

Para mais informações, entre em contato com o desenvolvedor através do e-mail: `carolinecampost@gmail.com`