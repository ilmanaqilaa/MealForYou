class AppBar extends HTMLElement {
    constructor() {
      super();
      this.shadowDOM = this.attachShadow({mode: 'open'});
    }
   
    connectedCallback() {
      this.render();
  }

  set clickEvent(event) {
      this._clickEvent = event;
      this.render();
  }
  
  _handleInput = (event) => {
    this._clickEvent(event.target.value);
  }

  get value() {
      return this.shadowDOM.querySelector('#searchElement').value;
  }

    render() {
      this.shadowDOM.innerHTML = `
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :host {
        display: flex;
        width: 100%;
        background-color: #C63D2F;
        color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        align-items: center;
        justify-content: space-between;
      }

      .search{
        margin-right: 10px;
      }

      input {
        border-radius: 5px;
        border: none;
        height: 30px;
        margin: 6px;
        padding: 5px;
      }

      h2 {
        padding: 16px;
        font-family: 'FRESH FOOD', sans-serif;
      }

      @media screen and (max-width: 550px) {
        h2{
          font-size: large;
        }

        .search

        input{
          width: 125px;
        }
      }
    </style>
    
    <h2>Meal For You</h2>
    <div class="search">
    <input placeholder="Search meal" id="searchElement" type="search">
    </div> 
    `

// Pada render() di app-bar.js
    this.shadowDOM.querySelector('#searchElement').addEventListener('input', this._handleInput);
  }
  }
   
  customElements.define('app-bar', AppBar);
  