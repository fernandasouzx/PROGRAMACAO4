# Gilmore Girls - WIKI

Uma enciclopédia digital fan-made dedicada à icônica série de televisão **Gilmore Girls**, criada com amor por fãs de Stars Hollow.

![Stars Hollow](https://img.shields.io/badge/Stars%20Hollow-Welcome-d4a574?style=for-the-badge)
![Coffee](https://img.shields.io/badge/Coffee-Required-7b3a12?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

## Sobre o Projeto

Este projeto é um site wiki completo sobre a série **Gilmore Girls**, desenvolvido como trabalho acadêmico. O site oferece informações detalhadas sobre personagens, episódios memoráveis, temporadas, curiosidades e links úteis para os fãs da série.

A interface foi cuidadosamente projetada para refletir a atmosfera acolhedora e nostálgica de Stars Hollow, com uma paleta de cores quentes inspirada em cafés, outono e a estética visual da série.

## Funcionalidades

### Seção de Personagens
- **13 personagens principais** com imagens, descrições e informações sobre os atores
- Sistema de **cards interativos** que expandem ao clicar, revelando descrições detalhadas
- Listagem de **15 personagens secundários** em formato de tags estilizadas
- Animações suaves de hover para melhor experiência do usuário

### Episódios Memoráveis
- Top 5 episódios mais icônicos da série
- Imagens de cenas marcantes
- Descrições detalhadas de cada episódio
- Layout em cards com efeito glassmorphism

### Temporadas
- Tabela completa com todas as **7 temporadas + Revival**
- Informações sobre ano de exibição, número de episódios e avaliações
- Design responsivo com efeitos hover elegantes

### Curiosidades Interativas
- Lista com **14+ curiosidades** sobre a série
- Botão "Mostrar curiosidade aleatória" com sistema anti-repetição
- Fatos sobre bastidores, atores e produção

### Links Úteis
- Navegação interna rápida
- Links externos para Netflix, IMDb, Wikipedia, Fandom e YouTube
- Cards organizados com ícones e descrições

## Design e Estética

### Paleta de Cores
```css
Fundo principal: #fbeddd (creme quente)
Texto principal: #3b1802 (marrom escuro)
Destaques: #7b3a12 (terracota)
Acentos: #f1ba6e (dourado suave)
Títulos: #5A3A2A (marrom médio)
```

### Tipografia
- **Playfair Display**: Títulos principais (elegante e serifada)
- **Lora**: Corpo do texto e subtítulos (legível e clássica)
- **Crimson Text**: Elementos de destaque (versátil e refinada)

### Elementos Visuais
- Imagem de fundo desfocada de Stars Hollow no header e footer
- Gradientes sutis em elementos decorativos
- Sombras suaves para profundidade
- Animações de hover em cards e botões
- Efeito glassmorphism em episódios memoráveis

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização avançada com Flexbox, gradientes e animações
- **JavaScript**: Interatividade e manipulação do DOM
- **Google Fonts**: Tipografia personalizada

## 📂 Estrutura do Projeto##  Código JavaScript
```bash
  gilmore-girls-wiki/
  │
  ├── index.html          # Página principal
  ├── style.css           # Estilos completos
  ├── script.js           # Interações JavaScript
  ├── README.md           # Documentação do projeto
  ├── especificacao.pdf   # Arquivo de Especificação do trabalho
  │
  └── imgs/               # Diretório de imagens
    ├── stars_hollow.png
    ├── gilmoregirls.png
    ├── coffee.png
    ├── lorelai.png
    ├── rory.png
    ├── luke.png
    └── [outras imagens de personagens]
```
### Sistema de Expansão de Cards
```javascript
// Permite expandir/recolher descrições de personagens
// Garante que apenas um card esteja aberto por vez
lis.forEach((li) => {
  li.addEventListener("click", (event) => {
    const descricao = li.querySelectorAll(".descricao")[0];
    // Fecha outros cards abertos
    lis.forEach((el) => {
      if (li != el) {
        const aux = el.querySelectorAll(".descricao")[0];
        aux.classList.remove("active-descricao");
      }
    })
    // Toggle no card clicado
    descricao.classList.toggle("active-descricao");
  })
})
```

### Sistema de Curiosidades Aleatórias
```javascript
// Exibe curiosidades aleatórias sem repetir a última mostrada
let lastRandom = -1;
function showRandomCuriosity() {
  let idx;
  do { 
    idx = Math.floor(Math.random() * curiosidades.length); 
  } while (idx === lastRandom);
  lastRandom = idx;
  // Exibe a curiosidade selecionada
  display.textContent = curiosidades[idx];
  display.classList.add('visible');
}
```

## Como Usar

1. **Clone ou baixe** o repositório
2. Certifique-se de que todas as imagens estão na pasta `imgs/`
3. Abra o arquivo `index.html` em qualquer navegador moderno
4. Navegue pelas seções usando o menu superior
5. Clique nos personagens para expandir suas descrições
6. Experimente o botão de curiosidades aleatórias!

##  Objetivos do Projeto

- Criar uma experiência imersiva para fãs de Gilmore Girls
- Aplicar conceitos de HTML semântico e acessibilidade
- Demonstrar domínio de CSS moderno (Flexbox, animações, gradientes)
- Implementar interatividade com JavaScript vanilla
- Desenvolver um design visualmente atraente e coeso
- Praticar organização de código e estrutura de projetos

## Autora

**Fernanda Lima de Souza**  
Desenvolvido como projeto acadêmico com dedicação e paixão pela série Gilmore Girls.

## Licença e Disclaimer

Este é um projeto **fan-made** e **não oficial**. Não possui afiliação com:
- Warner Bros. Television
- Netflix
- Amy Sherman-Palladino
- Qualquer entidade oficial relacionada a Gilmore Girls

Todos os direitos sobre a série, personagens e imagens pertencem aos seus respectivos proprietários. Este projeto foi criado apenas para fins educacionais e de entretenimento.

## Agradecimentos

> *"I can't stop drinking the coffee. I stop drinking coffee, I stop doing the standing and walking and the words-putting-into-sentence doing."*  
> — Lorelai Gilmore

Obrigada a todos os fãs de Gilmore Girls que mantêm o espírito de Stars Hollow vivo! 
---

⭐ **Se você é fã de Gilmore Girls, dê uma estrela para este projeto!** ⭐