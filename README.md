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

- Node.js instalado
- npm instalado

### Instalacao e inicializacao

```bash
npm install
npm start
```

Abra <http://localhost:3000> no navegador.

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
