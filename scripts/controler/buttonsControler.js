/**Classe dos botoes da calculator */
class ButtonsControler {
  _buttons;
  _eventsMouse;
  _eventCursorMouse;
  /**Pegando os TODOS Eventos do botão */

  constructor() {
    this._eventsMouse = "click drag";
    this._eventCursorMouse = "mouseover mouseup mousedown";
  }

  initButtonEvents() {
    /**Usando o QUERY_SELECTOR_ALL , pegando um, array de buttons e suas TAGs filhas > */
    this.buttons = document.querySelectorAll("#buttons > g, #parts > g");
    this.buttons.forEach((btn) => {
      this.addEventListenerALL(btn, this._eventsMouse, () => {
        console.log(btn.className.baseVal.replace("btn-", ""));
      });
    });
    /**mudando o cursor do mouse */
    this.buttons.forEach((btn) => {
      this.changeMouseCursor(btn, this._eventCursorMouse, () => {});
    });
  }

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

  /**GETS e SETS */
  get buttons() {
    return this._buttons;
  }
  set buttons(btn) {
    this._buttons = btn;
  }
}
