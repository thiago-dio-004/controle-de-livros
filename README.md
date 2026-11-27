# Controle de Livros

Aplicacao full stack desenvolvida em aula para praticar a integracao entre frontend e uma API propria.

A interface permite cadastrar, listar, editar e excluir livros. Os dados sao mantidos em memoria pelo servidor Express.

## Funcionalidades

- Listagem de livros com estado de carregamento
- Cadastro de livros
- Edicao de titulo e nota
- Exclusao de livros
- Validacao de titulo e nota entre 0 e 5
- Feedback de erros e opcao para tentar novamente
- Layout responsivo

## Tecnologias

- HTML5
- CSS3
- JavaScript
- TypeScript
- Node.js
- Express
- Fetch API

## Como executar

### Requisitos

- Node.js instalado (versao recomendada: 20 ou superior)
- npm instalado junto com o Node.js
- Terminal PowerShell, CMD ou integrado do VS Code

### 1. Entrar na pasta do projeto

Clone o repositorio ou baixe o ZIP do GitHub, na opção "Código" --> opção "Baixar ZIP". Depois, abra a pasta no VS Code e use o terminal integrado.

```powershell
cd caminho\onde\voce\baixou\controle-de-livros
```

Se o terminal ja estiver aberto dentro da pasta do projeto, pule esta etapa.

Para clonar diretamente:

```powershell
git clone https://github.com/thiago-dio-004/controle-de-livros.git
cd controle-de-livros
```

### 2. Instalar as dependencias

```powershell
npm install
```

O comando cria a pasta `node_modules` e instala o Express, o TypeScript e as dependencias de desenvolvimento.

### 3. Compilar o TypeScript

```powershell
npm run build
```

Esse comando usa o `tsconfig.json` e gera os arquivos JavaScript executaveis `server.js` e `api.js`.

### 4. Iniciar o servidor

```powershell
npm start
```

O servidor sera iniciado em modo de desenvolvimento e ficara observando o arquivo `server.ts`.

### 5. Abrir a aplicacao

Acesse <http://localhost:3000> no navegador.

Para parar o servidor, pressione `Ctrl+C` no terminal.

### Executar em outro terminal

Depois de iniciar o servidor, abra um segundo terminal para testar a API:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/livros"
```

Exemplo para criar um livro:

```powershell
$dados = @{
    titulo = "Dom Casmurro"
    nota = 4.7
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:3000/api/livros" `
  -Method Post `
  -ContentType "application/json" `
  -Body $dados
```

## Endpoints da API

| Metodo | Rota | Descricao |
|---|---|---|
| GET | `/api/livros` | Lista os livros |
| POST | `/api/livros` | Cria um livro |
| PUT | `/api/livros/:id` | Atualiza um livro |
| DELETE | `/api/livros/:id` | Remove um livro |

### Exemplos

Criar um livro:

```json
{
  "titulo": "Dom Casmurro",
  "nota": 4.7
}
```

Resposta esperada:

```json
{
  "id": 3,
  "titulo": "Dom Casmurro",
  "nota": 4.7
}
```

## Estrutura do projeto

```text
.
├── index.html
├── style.css
├── api.ts
├── api.js
├── server.ts
├── server.js
├── package.json
├── tsconfig.json
└── README.md
```

## Observacao

Os livros ficam armazenados apenas na memoria da aplicacao. Reiniciar o servidor limpa as alteracoes realizadas durante a execucao.
