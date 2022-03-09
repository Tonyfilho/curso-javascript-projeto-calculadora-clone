/**Classe dos botoes da calculator */
class ButtonsControler {
  /************************************************Variaveis Privadas*************************************** */
  utilites = new Utilities();

  // _displayTimeEl;
  _buttons; //array de buttons.
  _textBtn; //botão selecionado.
  _eventsMouse; // var do evento do mouse click e outros.
  _eventCursorMouse; // var do evento do mousePointer do cursor.
  _operation = []; //var para armazenar todas a operações.

  constructor() {
    this._eventsMouse = "click drag";
    this._eventCursorMouse = "mouseover mouseup mousedown";
    this._displayCalcEl = document.querySelector("#display");
  }
  /********************************************************FUNÇOES********************************************* */
  /**Limpa o Array de operações  */
  clearAll() {
    this.operation = [];
  }
  /**Limpa o ultimo item adcionado do array de operações  */
  cancelEntry() {
    this.operation.pop();
  }
  /**Envia uma mensagemd e error para display  */
  setError() {
    window.calculator.displayCalc = "error";
  }
  /**Envia uma mensagemd e error para display  */
  addOperation(value){
    this.operation.push(value);
  }
  /**Execulta as Açoes do Botão */
  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.cancelEntry();
        break;
      case "soma":
        //
        break;
      case "subtracao":
        //
        break;
      case "divisao":
        //
        break;
      case "multiplicacao":
        //
        break;
      case "porcento":
        //
        break;
      case "iqual":
        //
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;

      default:
        this.setError();
        break;
    }
    console.log(this.operation)
  }
  /**Vai no DOM e captura o  Botão */
  initButtonEvents() {
    /**Usando o QUERY_SELECTOR_ALL , pegando um, array de buttons e suas TAGs filhas > */
    this.buttons = document.querySelectorAll("#buttons > g, #parts > g");
    /**pegando todos o Buttons com ID #buttons***/
    this.buttons.forEach((btn) => {
      this.utilites.addEventListenerALL(btn, this._eventsMouse, () => {
        console.log(btn.className.baseVal.replace("btn-", ""));
        this.textBtn = btn.className.baseVal.replace("btn-", "");
        this.execBtn(this.textBtn);
      });
    });
    /**mudando o cursor do mouse */
    this.buttons.forEach((btn) => {
      this.utilites.changeMouseCursor(btn, this._eventCursorMouse, () => {});
    });
  }

  /**************************************************************GETS e SETS************************************ */
  /**Get e Set do ARRAY de Buttons*/
  get buttons() {
    return this._buttons;
  }
  set buttons(btn) {
    this._buttons = btn;
  }
  /**Get e Set da Var _textBtn */
  get button() {
    return _textBtn;
  }
  set button(value) {
    this._textBtn = value;
  }
  /**Get e Set da Var _operation */
  get operation() {
    return _operation;
  }
  set operation(value) {
    this._operation.push(value);
  }
  /**Get e Set da Var _displayCalcEl */
  // get operation(){
  //   return _operation;
  // }
  // set operation(value) {
  //   this._operation = value;
  // }
}
