/**Classe dos botoes da calculator */
class ButtonsControler {
  /************************************************Variaveis Privadas*************************************** */
  utilites = new Utilities();

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
  }
  /**Limpa o ultimo item adcionado do array de operações  */
  cancelEntry() {
    this.operation.pop();
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
    this.operation[this.operation.length - 1] = value;
  }
  /*******************************************Confirma o ULTIMO operador Digitado, caso haja mudança de operador */
  IsOperator(value) {
    /**indexOf vai ver se existe dentro de VALUE algum item do array.IndexOF e 
     * retorna o INDEX do array se ACHAR ou seja TRUE OU -1 se não achar se for falso.*/
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  /******************************************Recebe todos os  numeros digitados */
  addOperation(value) {   
    if (isNaN(this.getLastOperation())) {
      //Aqui somente valores NÃO NUMERICOS
      //isNaN pertence a WINDOWS e verifica se é ou não um numero, seja string ou int float etc
      // não é Numero
      if (this.IsOperator(value)) {
        //É um OPERADOR? Sim então coloco ele no FINAL do Array, passando o VALUE 
        this.setLastOperation(value);
      } else if(isNaN(value)) {
        // se for ponto, igual etc
        console.log('ELSEIF aninhado: É um PONTO ou IGUAL',value);
      } 
      else {
        //array estava vazio e É um numero;
        console.log('ELSE do array vazio',value);        
         this.operation.push(value);
      }

    } else {      
      /**
       * Aqui somente são numeros , que vem pelo paramentro da função
       transformo o numero  em string, concateno com o uktimo item digitado
      se for numero  e volto a transformar em numero e e faço PUSH no array.
      */
      let newValue =
        this.getLastOperation().toString() + value.toString(); // concateno o atual array com o ultimo item digitado     
       this.setLastOperation(parseInt(newValue));
    }
    console.log('Dentro do AddOPeration() no final',this.operation);
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
        this.operation.push("+");
        break;
      case "subtracao":
        this.operation.push("-");
        break;
      case "divisao":
        this.operation.push("/");
        break;
      case "multiplicacao":
        this.operation.push("*");
        break;
      case "porcento":
        this.operation.push("%");
        break;
      case "igual":
        // this.operation.push('=');
        break;
      case "ponto":
        this.operation.push(".");
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
