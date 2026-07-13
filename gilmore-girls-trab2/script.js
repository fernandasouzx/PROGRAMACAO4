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



// ----------------------
// Curiosidades aleatórias
// ----------------------

const curiosidades = [
    "☕ A produção gastava mais de $1.000 por semana apenas em copos de café vazios para usar como props.",
    "📺 Lauren Graham e Alexis Bledel se tornaram amigas reais durante as filmagens e mantêm a amizade até hoje.",
    "🏆 Gilmore Girls ganhou o prêmio de melhor drama do Television Critics Association em 2002.",
    "📖 Amy Sherman-Palladino disse que as 'quatro últimas palavras' da série foram planejadas antes mesmo do piloto ser filmado.",
    "🎬 Edward Herrmann (Richard Gilmore) era fã apaixonado de Rory na vida real e adorava os livros que ela lia na série.",
    "🌿 O jardim de Luke foi plantado e cuidado por uma equipe de jardinagem que trabalhava nos dias de folga das filmagens.",
    "☕ Existem cafés temáticos de Gilmore Girls ao redor do mundo.",
    "📚 A lista de livros de Rory Gilmore virou um desafio para os fãs.",
    "🎭 Kelly Bishop (Emily) ganhou um Tony Award antes de atuar na série.",
    "👩‍❤️‍💋‍👨 Milo Ventimiglia e Alexis Bledel namoraram na vida real.",
    "🧔‍♂️ O pai de Lane nunca apareceu na série.",
    "👩‍🎤 Carole King interpreta Sophie na série.",
    "Sookie seria lésbica no roteiro original."
];

let lastRandom = -1;

function showRandomCuriosity() {

    let idx;

    do {
        idx = Math.floor(Math.random() * curiosidades.length);
    } while (idx === lastRandom);

    lastRandom = idx;

    const display = document.getElementById("random-curiosity-display");
    display.textContent = curiosidades[idx];
    display.classList.add("visible");
}