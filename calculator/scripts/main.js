const $circleButtons = document.querySelectorAll(".circle");
const $result = document.getElementById("result");
const $rectangleButtons = document.querySelectorAll(".rectangle");

let numbers = [];


function showNumbers(button){
    let falseSpace = document.createElement("span");
    falseSpace.className = "space";
    
     if ($result.textContent === "result" || $result.textContent === "0"){
        numbers.push(button.textContent)
        $result.textContent = button.textContent;
        console.log(numbers)
     }
    else if (button.textContent === "=") {
        let expression = numbers.join("");
        console.log(expression)
        let result = eval(expression);
        $result.textContent = result;
        console.log(result);
        numbers = [result.toString()]
        
          }
          

    
    else if (button.textContent === "+" || button.textContent === "-"  || button.textContent ==="*" || button.textContent === "/" ) {
        
        numbers.push(" ");
        numbers.push(button.textContent);
        numbers. push(" ");
        console.log(button.textContent);
        $result.textContent += button.textContent;

    }
    else if (button.textContent === "AC"){
        numbers = [];
       $result.textContent = "0"
    }
     else {
        numbers.push(button.textContent)
        $result.textContent += button.textContent;
        console.log(numbers)
    }
}

$circleButtons.forEach((button) => button.addEventListener("click", () => showNumbers(button)));