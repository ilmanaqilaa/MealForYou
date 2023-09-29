class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const footer = document.createElement('footer');
        footer.innerHTML = `
            <style>
                footer {
                    background-color: #C63D2F;
                    padding: 10px;
                    text-align: center;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }

                p {
                    font-family: 'FRESH FOOD', sans-serif;
                    font-size: x-large;
                    color: white;
                }
            </style>
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} Ilman. All Rights Reserved.</p>
            </div>
        `;

        this.appendChild(footer);
    }
}

customElements.define('app-footer', Footer);
