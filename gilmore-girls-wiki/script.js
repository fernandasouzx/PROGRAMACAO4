const container = document.querySelectorAll(".personagem-card")[0]
console.log(container)
const lis = container.querySelectorAll("li")

/* Ação para ciclar nos personagens e aparecer a descrição completa */
lis.forEach((li) => {
  li.addEventListener("click", (event) => {
    const descricao = li.querySelectorAll(".descricao")[0];
    console.log(descricao.classList);

    lis.forEach((el) => {
      if (li != el) {
        const aux = el.querySelectorAll(".descricao")[0];
        aux.classList.remove("active-descricao");
        console.log(el);
      }
    })

    descricao.classList.toggle("active-descricao");
  })

})

/* Ação para botao de curiosidades */
const curiosidades = [
  "☕ A produção gastava mais de $1.000 por semana apenas em copos de café vazios para usar como props.",
  "📺 Lauren Graham e Alexis Bledel se tornaram amigas reais durante as filmagens e mantêm a amizade até hoje.",
  "🏆 Gilmore Girls ganhou o prêmio de melhor drama do Television Critics Association em 2002.",
  "📖 Amy Sherman-Palladino disse que as 'quatro últimas palavras' da série foram planejadas antes mesmo do piloto ser filmado.",
  "🎬 Edward Herrmann (Richard Gilmore) era fã apaixonado de Rory na vida real e adorava os livros que ela lia na série.",
  "🌿 O jardim de Luke foi plantado e cuidado por uma equipe de jardinagem que trabalhava nos dias de folga das filmagens.",
  "☕ Existem cafés temáticos de Gilmore Girls ao redor do mundo, especialmente nos EUA e Japão.",
  "📚 A lista de livros de Rory Gilmore virou livro impresso - 'The Gilmore Girls' Guide to Life' incluía todos os títulos mencionados.",
  "🎭 Kelly Bishop (Emily Gilmore) era dançarina profissional antes de virar atriz — ela ganhou um Tony Award na Broadway.",
  "👩‍❤️‍💋‍👨 Milo Ventimiglia e Alexis Bledel (Jess e Rory) namoraram na vida real por três anos e meio.",
  "🧔‍♂️ O pai de Lane vive com ela e a mãe, mas nunca apareceu no show.",
  "👩‍🎤 Carole King (que canta a música de abertura) aparece na terceira temporada como a dona de uma loja de música, que deixa Lane usar sua bateria da loja para praticar.",
  "Além do café, a personalidade de Rory Gilmore não estaria completa sem seu passatempo preferido: a leitura! A personagem influenciou tanto os fãs da série a adotar o hábito, que criaram o Desafio Rory Gilmore, o qual inclui todos os livros mencionados ao longo da série, desde 1984 (1949), de George Orwell a Anna Karênina (1877), de Liev Tolstói.",
  "Sookie seria lésbica no roteiro original."

];
let lastRandom = -1;

function showRandomCuriosity() {
  let idx;
  do { idx = Math.floor(Math.random() * curiosidades.length); } while (idx === lastRandom);
  lastRandom = idx;
  const display = document.getElementById('random-curiosity-display');
  display.textContent = curiosidades[idx];
  display.classList.add('visible');
}
