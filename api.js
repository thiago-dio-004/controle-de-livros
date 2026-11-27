// Endereço da API usado pelas quatro operações.
const RECURSO = "/api/livros";
// Lê a resposta JSON ou lança uma mensagem quando o servidor falha.
async function lerResposta(resposta) {
    // Verifica se o servidor respondeu com status de erro, como 400 ou 404.
    if (!resposta.ok) {
        // Define uma mensagem padrão caso o servidor não envie uma descrição.
        let mensagem = `Erro na requisição (${resposta.status}).`;
        try {
            // Lê o corpo JSON enviado pelo servidor e o declara como desconhecido.
            const corpo = await resposta.json();
            // Confirma que o corpo é um objeto e possui uma propriedade chamada mensagem.
            if (typeof corpo === "object" && corpo !== null && "mensagem" in corpo) {
                // Informa ao TypeScript a forma esperada da propriedade mensagem.
                const valor = corpo.mensagem;
                // Usa o texto recebido somente quando ele realmente for uma string.
                if (typeof valor === "string")
                    mensagem = valor;
            }
        }
        catch {
            // Mantém a mensagem padrão quando o servidor não envia JSON.
        }
        throw new Error(mensagem);
    }
    if (resposta.status === 204)
        return undefined;
    return resposta.json();
}
// Lista os livros do servidor com uma requisição GET assíncrona.
export async function listar() {
    const resposta = await fetch(RECURSO);
    if (!resposta.ok)
        throw new Error(`Não foi possível listar os livros (${resposta.status}).`);
    return await resposta.json();
}
// Cria um novo livro enviando os dados por POST.
export async function criar(dados) {
    const resposta = await fetch(RECURSO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    return await lerResposta(resposta);
}
// Atualiza um livro existente enviando somente os campos informados por PUT.
export async function atualizar(id, dados) {
    const resposta = await fetch(`${RECURSO}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    return await lerResposta(resposta);
}
// Exclui um livro pelo id usando o método DELETE.
export async function deletar(id) {
    const resposta = await fetch(`${RECURSO}/${id}`, { method: "DELETE" });
    await lerResposta(resposta);
}
