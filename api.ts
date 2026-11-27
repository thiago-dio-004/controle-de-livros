// Exporta o contrato principal usado por toda a camada de serviço.
export interface Livro {
  id: number;
  titulo: string;
  nota: number;
}

// Exporta o tipo DTO usado para criar um livro sem enviar o id.
export type CriarLivroDTO = Omit<Livro, "id">;

// Exporta o tipo usado pelo bônus de edição parcial.
export type AtualizarLivroDTO = Partial<Omit<Livro, "id">>;

// Endereço da API usado pelas quatro operações.
const RECURSO = "/api/livros";

// Lê a resposta JSON ou lança uma mensagem quando o servidor falha.
async function lerResposta(resposta: Response): Promise<unknown> {
  // Verifica se o servidor respondeu com status de erro, como 400 ou 404.
  if (!resposta.ok) {
    // Define uma mensagem padrão caso o servidor não envie uma descrição.
    let mensagem = `Erro na requisição (${resposta.status}).`;
    try {
      // Lê o corpo JSON enviado pelo servidor e o declara como desconhecido.
      const corpo: unknown = await resposta.json();
      // Confirma que o corpo é um objeto e possui uma propriedade chamada mensagem.
      if (typeof corpo === "object" && corpo !== null && "mensagem" in corpo) {
        // Informa ao TypeScript a forma esperada da propriedade mensagem.
        const valor = (corpo as { mensagem?: unknown }).mensagem;
        // Usa o texto recebido somente quando ele realmente for uma string.
        if (typeof valor === "string") mensagem = valor;
      }
    } catch {
      // Mantém a mensagem padrão quando o servidor não envia JSON.
    }
    throw new Error(mensagem);
  }

  if (resposta.status === 204) return undefined;
  return resposta.json();
}

// Lista os livros do servidor com uma requisição GET assíncrona.
export async function listar(): Promise<Livro[]> {
  const resposta = await fetch(RECURSO);
  if (!resposta.ok) throw new Error(`Não foi possível listar os livros (${resposta.status}).`);
  return await resposta.json() as Livro[];
}

// Cria um novo livro enviando os dados por POST.
export async function criar(dados: CriarLivroDTO): Promise<Livro> {
  const resposta = await fetch(RECURSO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return await lerResposta(resposta) as Livro;
}

// Atualiza um livro existente enviando somente os campos informados por PUT.
export async function atualizar(id: number, dados: AtualizarLivroDTO): Promise<Livro> {
  const resposta = await fetch(`${RECURSO}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return await lerResposta(resposta) as Livro;
}

// Exclui um livro pelo id usando o método DELETE.
export async function deletar(id: number): Promise<void> {
  const resposta = await fetch(`${RECURSO}/${id}`, { method: "DELETE" });
  await lerResposta(resposta);
}