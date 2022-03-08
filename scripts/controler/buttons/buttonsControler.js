/**Classe dos botoes da calculator */
class ButtonsControler {
  utilites = new Utilities();
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
     this.utilites.addEventListenerALL(btn, this._eventsMouse, () => {
        console.log(btn.className.baseVal.replace("btn-", ""));
      });
    });
    /**mudando o cursor do mouse */
    this.buttons.forEach((btn) => {
      this.utilites.changeMouseCursor(btn, this._eventCursorMouse, () => {});
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
