const bmiTemplate = document.createElement('template');

const makeTemplate = (name = "", score = 0) => {
    bmiTemplate.innerHTML = `
    <style>
    .bmi-wrapper {
        margin: 60px;
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
        background-color: lightgray;
        height: 16px;
        float: left;
        box-sizing: border-box;
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
    .normal-range {
        width: 50%;
    }
    .overweight-range {
        border-radius: 0 8px 8px 0;
        border-left: 2px solid white;
        width: 25%;
    }
    </style>
    <div class="bmi-wrapper">
    <h3>${name}'s BMI</h3>
    <h2>${score}</h2>
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

// bmiTemplate.innerHTML = `
//     <style>
//     .arrow-down {
//       width: 0;
//       height: 0;
//       border-left: 10px solid transparent;
//       border-right: 10px solid transparent;
//       border-top: 20px solid steelblue;
//     }
//     </style>
//     <div class="bmi-wrapper">
//     <h3></h3>
//     <div class="range-wrapper">
//         <div class="arrow-down" />
//         <div class="range">
//             <div class="underweight-range" />
//             <div class="normal-range" />
//             <div class="overweight-range" />
//         </div>
//
//     </div>
//     </div>
// `

class BMI extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        makeTemplate(this.getAttribute('name'), this.getAttribute('score'))
        this.shadowRoot.appendChild(bmiTemplate.content.cloneNode(true));
    }

}

window.customElements.define('bmi-score', BMI);
