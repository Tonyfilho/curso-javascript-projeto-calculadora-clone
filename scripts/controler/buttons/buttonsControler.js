/**Classe dos botoes da calculator */
class ButtonsControler {
  /************************************************Variaveis Privadas*************************************** */
  utilites = new Utilities();
  // DISPLAY_CALC;

  // _displayTimeEl;
  _buttons; //array de buttons.
  _textBtn; //botão selecionado.
  _eventsMouse; // var do evento do mouse click e outros.
  _eventCursorMouse; // var do evento do mousePointer do cursor.
  _operation; //array para armazenar todas a operações.

  constructor() {
    this._eventsMouse = "click drag";
    this._eventCursorMouse = "mouseover mouseup mousedown";
    this._displayCalcEl = document.querySelector("#display");
    this._operation = [];
  }
  /********************************************************FUNÇOES********************************************* */
  /**Limpa o Array de operações  */
  clearAll() {
    this.operation = [];
    this.setLastNumberToDisplay();
  }
  /**Limpa o ultimo item adcionado do array de operações  */
  cancelEntry() {
    this.operation.pop();
    this.setLastNumberToDisplay();
  }
  /**Envia uma mensagemd e error para display  */
  setError() {
    window.calculator.displayCalc = "error";
  }
  /**Recebe a ultimo item digitado e verifica se é Numero ou sinal e concatena se for numero */
  getLastOperation() {
    const lastNumero = this.operation[this.operation.length - 1];
    return lastNumero;
  }
  /*******************************************Muda a ultima operação */
  setLastOperation(value) {
    console.log("SETLastOPERATION ", value);
    this.operation[this.operation.length - 1] = value;
  }
  /*******************************************Confirma o ULTIMO operador Digitado, caso haja mudança de operador */
  IsOperator(value) {
    /**indexOf vai ver se existe dentro de VALUE algum item do array.IndexOF e
     * retorna o INDEX do array se ACHAR ou seja TRUE OU -1 se não achar se for falso.*/
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }
  /*********************************************VErifica se existem mais de 3 itens no array
   * para já fazer uma operação.
   */
  pushOperator(value) {
    console.log("PUSHOPERATORValue", value);
    this.operation.push(value);
    if (this.operation.length > 3) {  
      console.log("chamou os calc") ;
      this.calc();
    }
  }

  /**
   *
   * Metodo de calculo
   */
  calc() {
    /** temos que remover o ultimo dado do Array e guardar em ultima
     * Variavel antes de de usar o EVAL Pois acada 2pares de numeros e 1 Operador
     * temos que fazer uma calculo antes de continuar. O Eval é uma função do JS para calculos
     * muito poderosa, o POP() é para Pegar a ultima posição do array */
    let lastOperation = this.operation.pop(); //usando
    let resulteval = eval(this.operation.join(""));
    this.operation = [resulteval, lastOperation]; //mudando as posições do array
    this.setLastNumberToDisplay();
    console.log(
      "OPERATION dentro CALC",
      this.operation,' ResultEval',
      resulteval,' LastOperarion',
      lastOperation
    );
  }

  setLastNumberToDisplay() {
    let lastNumber;
    console.log('setLastNumberToDisplay LENGTH',this.operation.length - 1);
    for (let i = this.operation.length - 1; i >= 0; i--) {
      if (!this.IsOperator(this.operation[i])) {
        lastNumber = this.operation[i];
        console.log('LASTNUMBER', lastNumber, ' [I]', i);
        break;
      }
    }
    window.calculator.displayCalc = lastNumber;
  }

  /******************************************Recebe todos os  numeros digitados */
  addOperation(value) {
    // console.log("É Numero?", value, " ", isNaN(this.getLastOperation()));
    if (isNaN(this.getLastOperation())) {     
      //Aqui somente valores NÃO NUMERICOS
      //isNaN pertence a WINDOWS e verifica se é ou não um numero, seja string ou int float etc
      // não é Numero
      if (this.IsOperator(value)) {
        //É um OPERADOR? Sim então coloco ele no FINAL do Array, passando o VALUE
        this.setLastOperation(value);
      } else if (isNaN(value)) {        
        console.log("se for ponto, igual etc", value);
      } else {       
        // this.operation.push(value);
        this.pushOperator(value);
        this.setLastNumberToDisplay();
      }
    } else {
      /**
       * Aqui somente são numeros , que vem pelo paramentro da função
       transformo o numero  em string, concateno com o uktimo item digitado
      se for numero  e volto a transformar em numero e e faço PUSH no array.
      */
      //verificando se é Numero ou Operador aqui no numeros
      if (this.IsOperator(value)) {
        //adcionando um operador no array, quando mudamos de numero para operador       
        this.pushOperator(value);
      } else {
        //adcionando um Numero no array.
        let newValue = this.getLastOperation().toString() + value.toString(); // concateno o atual array com o ultimo item digitado
        this.setLastOperation(parseInt(newValue));
        //atualizar o display da calculadora. Pois Aqui é o ULTIMO VALOR adcionado nos botões
        this.setLastNumberToDisplay();

      }
    }
    // console.log("Dentro do AddOPeration() no final", this.operation);
  }
  /*************************************Execulta as Açoes do Botão */
  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.cancelEntry();
        break;
      case "soma":
        this.addOperation("+");
        break;
      case "subtracao":
        this.addOperation("-");

        break;
      case "divisao":
        this.addOperation("/");
        break;
      case "multiplicacao":
        this.addOperation("*");
        break;
      case "porcento":
        this.addOperation("%");
        break;
      case "igual":
        break;
      case "ponto":
        this.operation.push(".");
        break;

      case "0":
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
  }
  /************************************Vai no DOM e captura o  Botão */
  initButtonEvents() {
    /**Usando o QUERY_SELECTOR_ALL , pegando um, array de buttons e suas TAGs filhas > */
    this.buttons = document.querySelectorAll("#buttons > g, #parts > g");
    /**pegando todos o Buttons com ID #buttons***/
    this.buttons.forEach((btn) => {
      this.utilites.addEventListenerALL(btn, this._eventsMouse, () => {
        // console.log(btn.className.baseVal.replace("btn-", ""));
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
    return this._operation;
  }
  set operation(value) {
    this._operation.push(value);
  }
  /**Get e Set da Var _displayCalcEl */
}
