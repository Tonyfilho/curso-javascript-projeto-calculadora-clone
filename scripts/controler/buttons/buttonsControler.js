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
  _lastOperator = ""; // var q armazena o ultimo operador digitado
  _lastNumber = ""; // var q armazena o ultimo numero digitado

  constructor() {
    this._eventsMouse = "click drag";
    this._eventCursorMouse = "mouseover mouseup mousedown";
    this._displayCalcEl = document.querySelector("#display");
    this._operation = [];
    this.initKeyBoard();
  }
  /********************************************************FUNÇOES********************************************* */
  /**Limpa o Array de operações  */
  clearAll() {
    this.operation = this.operation.length = 0;
    this.lastNumber = "";
    this.lastOperator = "";
    this.setLastNumberToDisplay();
  }
  /**Limpa o ultimo item adcionado do array de operações  */
  cancelEntry() {
    this.operation === null ? 0 : this.operation.pop();
    this.setLastNumberToDisplay();
  }
  /**Envia uma mensagemd e error para display  */
  setError() {
    window.calculator.displayCalc = "error";
  }
  /**Recebe a ultimo item digitado e verifica se é Numero ou sinal e concatena se for numero */
  getLastOperation() {
    return this.operation[this.operation.length - 1];
  }
  /*******************************************Muda a ultima operação */
  setLastOperation(value) {
    this.operation[this.operation.length - 1] = value;
  }
  /*******************************************Confirma o ULTIMO operador Digitado, caso haja mudança de operador */
  isOperator(value) {
    /**indexOf vai ver se existe dentro de VALUE algum item do array.IndexOF e
     * retorna o INDEX do array se ACHAR ou seja TRUE OU -1 se não achar se for falso.*/
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }
  /*********************************************VErifica se existem mais de 3 itens no array
   * para já fazer uma operação.
   */
  pushOperator(value) {
    this.operation.push(value);
    if (this.operation.length > 3) {
      this.calc();
    }
  }
  /*********************************************** Pega o EVAL e fz o calculo do array */
  getResult() {
    return eval(this.operation.join(""));
  }
  /**
   *
   *************************************************** Metodo de calculo
   */
  calc() {
    /** temos que remover o ultimo dado do Array e guardar em ultima
     * Variavel antes de de usar o EVAL Pois acada 2pares de numeros e 1 Operador
     * temos que fazer uma calculo antes de continuar. O Eval é uma função do JS para calculos
     * muito poderosa, o POP() é para Pegar a ultima posição do array */
    let last = "";
    this.lastOperator = this.getLastItem();
    if (this.operation.length < 3) {
      let firstItem = this.operation[0];
      this.operation = [firstItem, this.lastOperator, this.lastNumber];
    }
    if (this.operation.length > 3) {
      last = this.operation.pop(); //usando
      this.lastNumber = this.getResult();
    } else if (this.operation.length == 3) {
      this.lastNumber = this.getLastItem(false);
    }
    let resulteval = this.getResult();
    if (last == "%") {
      resulteval /= 100; //fazendo o Porcentos e atualizando o array
      this.operation = [resulteval];
    } else {
      this.operation = [resulteval]; //mudando as posições do array
      if (last) {
        this.operation.push(last);
      }
    }
    this.setLastNumberToDisplay();
  }
  /**Pega o Ultimo Item  seja Numero ou Operador*/
  getLastItem(isOperator = true) {
    let lastItem;
    for (let i = this.operation.length - 1; i >= 0; i--) {
      if (this.isOperator(this.operation[i]) == isOperator) {
        lastItem = this.operation[i];
        break;
      }
    }
    if (!lastItem) {
      // Caso seja undefine , guardo o ultimo item dentro do last
      lastItem = isOperator ? this.lastOperator : this.lastNumber;
    }
    return lastItem;
  }

  setLastNumberToDisplay() {
    let last = this.getLastItem(false);
    window.calculator.displayCalc = last;
  }

  /******************************************Recebe todos os  numeros digitados */
  addOperation(value) {
    // console.log("É Numero?", value, " ", isNaN(this.getLastOperation()));
    if (isNaN(this.getLastOperation())) {
      //Aqui somente valores NÃO NUMERICOS
      //isNaN pertence a WINDOWS e verifica se é ou não um numero, seja string ou int float etc
      // não é Numero
      if (this.isOperator(value)) {
        //É um OPERADOR? Sim então coloco ele no FINAL do Array, passando o VALUE
        this.setLastOperation(value);
      }
      // else if (isNaN(value)) {
      //   console.log("se for ponto, igual etc", value);
      // }
      else {
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
      if (this.isOperator(value)) {
        //adcionando um operador no array, quando mudamos de numero para operador
        this.pushOperator(value);
      } else {
        //adcionando um Numero no array.
        let newValue = this.getLastOperation().toString() + value.toString(); // concateno o atual array com o ultimo item digitado
        this.setLastOperation(newValue);
        //atualizar o display da calculadora. Pois Aqui é o ULTIMO VALOR adcionado nos botões
        this.setLastNumberToDisplay();
      }
    }
    // console.log("Dentro do AddOPeration() no final", this.operation);
  }
  /******************************GetDOT()***** faz o calculo com numeros q tem Pontos */
  addDot() {
    let lastOperation = this.getLastOperation();
    if (
      typeof lastOperation === "string" &&
      lastOperation.split("").indexOf(".") > -1
    )
      return;
    if (this.isOperator(lastOperation) || !lastOperation) {
      this.pushOperator("0.");
    } else {
      this.setLastOperation(lastOperation.toString() + ".");
    }
    this.setLastNumberToDisplay();
  }
  /***********************Evento de Copiar e Colar */
  copyCliBoard() {
    let input = document.createElement('input');
    input.value = window.calculator.displayCalc;
    //Adcionando este Input criado no BODY do navegador
    document.body.appendChild(input);
    // Selecionando o Conteudo do Input
    input.select();
    //Copiando para Sistema Operacional
    document.execCommand('Copy');





  }

  /***********************************Pega os Eventos de outras Teclas fora do padrão comum */
  initKeyBoard() {
    document.addEventListener("keyup", (evento) => {
      switch (evento.key) {
        case "Escape":
          this.clearAll();
          break;
        case "Control":
        case "Alt":
        case "Backspace":
          this.cancelEntry();
          break;
        case "+":
        case "-":
        case "/":
        case "*":
        case "%":
          this.addOperation(evento.key);
        case "Enter":
        case "=":
          this.calc();
          break;
        case ".":
        case ",":
          this.addDot();
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
          this.addOperation(parseInt(evento.key));
          break;
        case 'c':
         if(evento.ctrlKey) {
           this.copyCliBoard();
         }

        break;
      }
    });
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
        this.calc();
        break;
      case "ponto":
        this.addDot();
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
    this._operation = value;
  }
  /**Get e Set da Var _lastOperator */
  get lastOperator() {
    return this._lastOperator;
  }
  set lastOperator(value) {
    this._lastOperator = value;
  }
  /**Get e Set da Var _lastNumber */
  get lastNumber() {
    return this._lastNumber;
  }
  set lastNumber(value) {
    this._lastNumber = value;
  }
  /**Get e Set da Var _displayCalcEl */
}
