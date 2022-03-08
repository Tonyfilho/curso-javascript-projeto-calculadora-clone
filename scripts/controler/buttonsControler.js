/**Classe dos botoes da calculator */
class ButtonsControler {
  _buttons;
  /**Pegando os TODOS Eventos do botão */
  initButtonEvents() {
    /**Usando o QUERY_SELECTOR_ALL , pegando um, array de buttons e suas TAGs filhas > */
    this.buttons = document.querySelectorAll("#buttons > g, #parts > g");
    this.buttons.forEach((btn, _index) => {
      btn.addEventListener("click", (env) => {
        console.log(btn.className.baseVal.replace("btn-", ""));
        return btn.className.baseVal.replace("btn-", "");
      });
    });
  }

  get buttons() {
    return this._buttons;
  }
  set buttons(btn) {
    this._buttons = btn;
  }
}
