const container = document.querySelectorAll(".personagem-card")[0]
console.log(container)
const lis = container.querySelectorAll("li")

lis.forEach((li) => {
    li.addEventListener("click", (event) => {
      const descricao = li.querySelectorAll(".descricao")[0];
      console.log(descricao.classList);
      
      lis.forEach((el)=>{
        if(li != el){
          const aux = el.querySelectorAll(".descricao")[0];
          aux.classList.remove("active-descricao");
          console.log(el);
        }
        
      })
      
      descricao.classList.toggle("active-descricao");
    })
  
})


// lis.classList.toggle("visible");