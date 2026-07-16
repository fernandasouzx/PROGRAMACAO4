const container = document.querySelectorAll(".personagem-card")[0]
console.log(container)
const lis = container.querySelectorAll("li")

//carregar os personagens da API
const lista = document.getElementById("personagens-list");

// Carrega personagens da API
async function carregarPersonagens() {
    try {
        const resposta = await fetch("http://localhost:3001/personagens");
        const personagens = await resposta.json();
        // ordena pelo campo de ordenação antes de exibir
        personagens.sort((a, b) => a.ordemApresentacao - b.ordemApresentacao);
        lista.innerHTML = "";

        personagens.forEach((personagem) => {
            lista.innerHTML += `
                <li>
                    <img src="${personagem.imagem}" alt="${personagem.titulo}" />
                    <h4>
                        <b>${personagem.titulo}</b>
                    </h4>
                    <div class="wrap_text">
                        <p>${personagem.resumo}</p>
                        <div class="descricao">
                            <p>${personagem.conteudo}</p>
                        </div>
                    </div>
                </li>
            `;
        });

        adicionarEventos();
    } catch (erro) {
        console.error("Erro ao carregar personagens:", erro);
    }
}

// Eventos para abrir/fechar descrição
function adicionarEventos() {
    const lis = document.querySelectorAll("#personagens-list li");

    lis.forEach((li) => {
        li.addEventListener("click", () => {

            lis.forEach((el) => {
                if (el !== li) {
                    el.querySelector(".descricao")
                        .classList.remove("active-descricao");
                }
            });

            li.querySelector(".descricao")
                .classList.toggle("active-descricao");
        });
    });
}

carregarPersonagens();

let curiosidades = [];
let lastRandom = -1;

// Busca as curiosidades da API assim que a página carrega
async function carregarCuriosidades() {
    try {
        const resposta = await fetch("http://localhost:3001/curiosidades");
        curiosidades = await resposta.json();
    } catch (erro) {
        console.error("Erro ao carregar curiosidades:", erro);
    }
}

// Mostra uma curiosidade aleatória
function showRandomCuriosity() {
    if (curiosidades.length === 0) {
        console.warn("Nenhuma curiosidade carregada ainda.");
        return;
    }

    let idx;
    do {
        idx = Math.floor(Math.random() * curiosidades.length);
    } while (idx === lastRandom && curiosidades.length > 1);

    lastRandom = idx;

    const display = document.getElementById("random-curiosity-display");
    display.textContent = curiosidades[idx].texto; // "texto" é o campo que vem da API
    display.classList.add("visible");
}

carregarCuriosidades();