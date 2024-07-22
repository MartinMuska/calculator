// VARIABLES

let barInput = document.getElementById("bar-input");
let output =  0;
let barOutput = document.createElement("p");

// INPUT-BUTTONS

let buttonConfig = [
    { id: "b1", value: "*" },
    { id: "b2", value: "%" },
    { id: "b3", value: "π" },
    { id: "b4", value: "e" },
    { id: "b5", value: "|0|" },
    { id: "b6", value: "^2" },
    { id: "b7", value: "^3" },
    { id: "b8", value: "^" },
    { id: "b9", value: "√" },
    { id: "b10", value: "∛" },
    { id: "b11", value: "log()" },
    { id: "b12", value: "sin()" },
    { id: "b13", value: "cos()" },
    { id: "b14", value: "°C" },
    { id: "b15", value: "°F" }
  ];

function addButtonClickListeners(config) {
    config.forEach(button => {
      let clickButton = document.getElementById(button.id);
      clickButton.addEventListener("click", function(event) {
        barInput.value += button.value;
        barInput.focus(); 
            // focus() to remove the need to click the field again
        });
    });
}
addButtonClickListeners(buttonConfig);

// OUTPUT-BAR

let unit = ""
barInput.addEventListener("keypress", function(event){
    if (event.key === "Enter") {    
        let input = barInput.value
            .replace(/π/g, "3.141592653589")
            .replace(/%/, "/(100)") 
            .replace(/e/g, "2.71828182846") 
            .replace(/\|(.+?)\|/g, "Math.abs($1)")
            .replace(/\^(\d+)/g, "**$1")
            .replace(/√(\d+)/g, "Math.sqrt($1)")
            .replace(/∛(\d+)/g, "Math.cbrt($1)")
            .replace(/log\(([^)]+)\)/g, "Math.log($1)")
            .replace(/sin\(([^)]+)\)/g, "Math.sin($1)")
            .replace(/cos\(([^)]+)\)/g, "Math.cos($1)")
            .replace(/(\d+)°C/g, "($1 * 9 / 5) + 32")
            .replace(/(\d+)°F/g, "($1 - 32) * 5 / 9")
        try {
            output = eval(input)
                // evaluates the string as js code
            if (barInput.value.includes("°C")) {
                unit = " °F";
            } else if (barInput.value.includes("°F")) {
                unit = " °C";
            } else {
                unit = "";
            }
            output = output.toString() + unit;
            barOutput.textContent = output;
            barOutput.style.fontSize = "15px";
            barOutput.style.color = "red";
            barOutput.style.fontWeight = "bold";
            barOutput.style.margin = "0px";
            barOutput.style.paddingTop = "3px";
            document.getElementById("bar-output").appendChild(barOutput);
        } catch (error) {
            console.error("Error:", error);
            barOutput.textContent = "Invalid input or result";
            barOutput.style.fontSize = "15px";
            barOutput.style.color = "red";
            barOutput.style.fontWeight = "bold";
            barOutput.style.margin = "0px";
            barOutput.style.paddingTop = "3px";
            document.getElementById("bar-output").appendChild(barOutput);
        }
    }
});
   
    
    
    
    
    
    
        



