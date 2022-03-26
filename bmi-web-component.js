const bmiTemplate = document.createElement('template');

const makeTemplate = (name, score, width) => {
    bmiTemplate.innerHTML = `
    <style>
    .bmi-wrapper {
        margin: 60px;
        width: ${width || 'initial'};
        min-width: 300px;
    }
    h3, h2 {
      text-align: center;
    }
    h2 {
        color: steelblue;
    }
    .arrow-down {
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 20px solid steelblue;
      margin-left: calc(${+score / 1.2}% - 10px);
    }
    .range-item {
        transition: .2s;
        background-color: lightgray;
        height: 16px;
        float: left;
        box-sizing: border-box;
    }
    .range-item:hover {
        opacity: .9;
    }
    .range-item p {
        color: steelblue;
        margin-top: 20px;
        text-align: center;
    }
    .range-item.active {
        background-color: seagreen;
    }
    .underweight-range {
        border-radius: 8px 0 0 8px;
        border-right: 2px solid white;
        width: 25%;
    }
    .underweight-range.active {
        background-color: darkred;
    }
    .normal-range {
        width: 50%;
    }
    .overweight-range {
        border-radius: 0 8px 8px 0;
        border-left: 2px solid white;
        width: 25%;
    }
    .overweight-range.active {
        background-color: darkred;
    }
    </style>
    <div class="bmi-wrapper">
    ${name ? `<h3>${name}'s BMI</h3>` : ''}
    ${score ? `<h2>${score}</h2>` : ''}
    <div class="range-wrapper">
        <div class="arrow-down" ></div>
        <div class="range">
            <div class="range-item underweight-range ${score < 30 ? 'active' : ''}" >
                <p>Underweight</p>
            </div>
            <div class="range-item normal-range ${score >= 30 && score <= 90 ? 'active' : ''}" >
                <p>Normal</p>
            </div>
            <div class="range-item overweight-range ${score > 90 ? 'active' : ''}" >
                <p>Overweight</p>
            </div>
        </div>
        
    </div>
    </div>
`
}

class BMI extends HTMLElement {
    static get tag() {
        return "bmi-score";
    }

    constructor() {
        super();
        const name = (this.getAttribute('name'));
        let score = (this.getAttribute('score')) || 0;
        const width = (this.getAttribute('width'));

        if (score < 0) score = 0;
        if (score > 120) score = 120;

        this.attachShadow({ mode: "open" });
        makeTemplate(name, score, width)
        this.shadowRoot.appendChild(bmiTemplate.content.cloneNode(true));
    }

}

window.customElements.define(BMI.tag, BMI);
