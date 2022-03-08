class CalcControler {
  buttons;
  _locale;
  _currentDate;
  _displayCalcEl;
  _displayTimeEl;
  _displayDateEl;
  constructor() {
    this._locale = "pt-PT";
    this._currentDate = new Date();
    this.buttons =  new ButtonsControler();
    /**
     * Capturando os dados da tag, usando o ID;
     */
    this._displayCalcEl = document.querySelector("#display");
    this._displayDateEl = document.querySelector("#data");
    this._displayTimeEl = document.querySelector("#hora");

    this.initialize();
    this.buttons.initButtonEvents();//buscantos todos o buttons
  }

  initialize() {
    this.setDateTime();
    /**
     * Usando o SetInterval() para ficar atualizando o segundo na tela do display
     */
    setInterval(() => {
      this.setDateTime();
    }, 1000);
  }
  

  /**
   * Setando o Date e Time com estas função
   */
  setDateTime() {
    this.displayDateEl = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }
  /**
   * Pegando e Mandando dados para HTML usando o innerHTML
   */
  get displayTime() {
    return this._displayTimeEl.innerHTML;
  }
  set displayTime(value) {
    this._displayTimeEl.innerHTML = value;
  }

  get displayDateEl() {
    return this._displayDateEl.innerHTML;
  }
  set displayDateEl(value) {
    return (this._displayDateEl.innerHTML = value);
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }
  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }
  set currentDate(date) {
    this._currentDate = date;
  }
} // end class
