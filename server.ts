// Importa o Express e os tipos usados para tipar requisições e respostas HTTP.
import express, { type Request, type Response } from "express";

// Define o formato de um livro utilizado no backend.
export interface Livro {
  id: number;
  titulo: string;
  nota: number;
}

// Define os dados aceitos na criação, removendo o id gerado pelo servidor.
type CriarLivroDTO = Omit<Livro, "id">;

// Define os dados aceitos na edição parcial, removendo o id do corpo.
type AtualizarLivroDTO = Partial<Omit<Livro, "id">>;

// Cria a aplicação Express.
const app = express();

// Ativa o servidor na porta definida pela atividade.
const PORTA = 3000;

// Converte o corpo JSON das requisições em objeto JavaScript.
app.use(express.json());

// Serve index.html, api.js e os demais arquivos estáticos da raiz do projeto.
app.use(express.static("."));

// Mantém os livros em memória, conforme solicitado pela atividade.
const livros: Livro[] = [
  { id: 1, titulo: "Admirável Mundo Novo", nota: 4.2 },
  { id: 2, titulo: "O Quarto do Despejo", nota: 4.8 },
];

// Guarda o próximo id que será atribuído a um novo livro.
let proximoId = 3;

// Lista todos os livros, aguardando 1 segundo para exibir o estado Loading.
app.get("/api/livros", (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json(livros);
  }, 1000);
});

// Cria um livro após validar e converter os dados enviados pelo formulário.
app.post(
  "/api/livros",
  (req: Request<Record<string, never>, unknown, CriarLivroDTO>, res: Response) => {
    const titulo = String(req.body.titulo ?? "").trim();
    const nota = Number(req.body.nota);

    // Exige título não vazio e uma nota numérica dentro da faixa de 0 a 5.
    if (!titulo || req.body.nota === undefined || req.body.nota === null ||
      !Number.isFinite(nota) || nota < 0 || nota > 5) {
      res.status(400).json({
        mensagem: "Informe um título e uma nota válida entre 0 e 5.",
      });
      return;
    }

    // Cria um objeto completo do tipo Livro.
    // proximoId++ atribui o ID atual e depois aumenta o contador.
    const novoLivro: Livro = {
      id: proximoId++,
      titulo,
      nota,
    };

    // Adiciona o novo livro ao array armazenado na memória do servidor.
    livros.push(novoLivro);

    // Responde com o status 201 Created e retorna o livro criado.
    res.status(201).json(novoLivro);
  },
);

// Atualiza parcialmente um livro; esta rota implementa o bônus de edição.
app.put(
  "/api/livros/:id",
  (req: Request<{ id: string }, unknown, AtualizarLivroDTO>, res: Response) => {
    // Converte o id recebido na URL de texto para número.
    const id = Number(req.params.id);
    const livro = livros.find((item) => item.id === id);

    // Retorna 404 quando não encontra o registro.
    if (!livro) {
      res.status(404).json({ mensagem: "Livro não encontrado." });
      return;
    }

    // Atualiza o título somente quando ele foi enviado na requisição.
    if (req.body.titulo !== undefined) {
      const titulo = String(req.body.titulo).trim();
      if (!titulo) {
        res.status(400).json({ mensagem: "O título não pode ficar vazio." });
        return;
      }
      livro.titulo = titulo;
    }

    // Atualiza e valida a nota somente quando ela foi enviada.
    if (req.body.nota !== undefined) {
      const nota = Number(req.body.nota);
      if (!Number.isFinite(nota) || nota < 0 || nota > 5) {
        res.status(400).json({ mensagem: "A nota deve estar entre 0 e 5." });
        return;
      }
      livro.nota = nota;
    }

    res.status(200).json(livro);
  },
);

// Remove um livro pelo id informado na rota.
app.delete("/api/livros/:id", (req: Request<{ id: string }>, res: Response) => {
  // Converte o id da URL para número e localiza o índice no array.
  const id = Number(req.params.id);
  const indice = livros.findIndex((item) => item.id === id);

  // Retorna 404 caso o id não corresponda a nenhum livro.
  if (indice === -1) {
    res.status(404).json({ mensagem: "Livro não encontrado." });
    return;
  }

  livros.splice(indice, 1);
  res.status(204).send();
});

// Coloca o servidor para ouvir na porta 3000.
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});