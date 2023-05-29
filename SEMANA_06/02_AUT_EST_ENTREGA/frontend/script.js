// Tentativa de função para verificar se um elemento está visível na tela (não deu certo)


/*function isElementInViewport(element) {
    if(element.getBoundingClientRect()){
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );}
    else{
        return false;
    }
}
  
// Função para adicionar a classe de animação ao elemento quando estiver visível
function addAnimationOnScroll() {
    console.log("teste");
    var element = document.getElementById('rafa');
    if (isElementInViewport(element)) {
      element.classList.add('fade-in');
    }
}
  
  // Evento de scroll para ativar a animação quando o elemento estiver visível na tela
window.addEventListener('scroll', addAnimationOnScroll());
  
  // Ativar a animação assim que a página for carregada se o elemento já estiver visível
window.addEventListener('load', addAnimationOnScroll()); */ 