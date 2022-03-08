class CalcControler {
  _displayCalc = "0";
  _currentDate = new Date();

  constructor() {
    this._displayCalc = "0";
    this._currentDate;
    this.initialize();
  }

  initialize() {
    let displayCalcEl = document.querySelector("#display");
    let dataEl = document.querySelector("#data");
    let letTimeEl = document.querySelector("#hora");

    /**
     * mandando dados para HTML usando o innerHTML
     */
    displayCalcEl.innerHTML = '300';
    dataEl.innerHTML = this.currentDate.getDate('pt-BR');
    letTimeEl.innerHTML = this.currentDate.getTime('pt-BR');
  }
  get displayCalc() {
    return this._displayCalc;
  }
  set displayCalc(value) {
    this._displayCalc = value;
  }

  get currentDate() {
    return this._currentDate;
  }
  set currentDate(date) {
    this._currentDate = date;
  }
} // end class
