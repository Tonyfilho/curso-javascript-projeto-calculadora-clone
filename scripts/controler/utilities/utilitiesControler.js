/**Esta classe é para funções globais que podem ser utilizadas em outras partes do codigo */
class Utilities {
  /**Criando um Função local EventListenerALL, pois all não existem no JS */
  addEventListenerALL(btn, eventNames, callback) {
    eventNames.split(" ").forEach((eventName) => {
      btn.addEventListener(eventName, callback, false);
    });
  }
  /**Criando uma função que muda o cursor point do mouse na medida que passamos na tecla do calculator */
  changeMouseCursor(btn, eventNames, callback) {
    eventNames.split(" ").forEach((eventName) => {
      btn.style.cursor = "pointer";
      btn.addEventListener(eventName, callback, false);
    });
  }
}
