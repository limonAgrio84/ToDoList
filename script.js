console.log("hello world");

const $list = document.getElementById("toDo-container");
const $toDoInput = document.getElementById("input");
const $colorStyle = document.getElementById("colorfull");
const $blackStyle = document.getElementById("blackStyle");
const $whiteStyle = document.getElementById("whiteStyle");
let themesAmount = 3;
let contadorDivs = 0;


function getText() {
  let text = $toDoInput.value.trim()
  return text
}

function changeStyle(idNuevoEstilo) {
  // Desactiva todas las hojas de estilo
  document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link) {
    link.disabled = true;
  });
  //activar estilo
  let newStyle = document.getElementById(idNuevoEstilo);
  newStyle.disabled = false;
}

function createD() {
  let allContainer = document.createElement("div");
  let pContainer = document.createElement("div");
  contadorDivs++;
  let allDivId = "theContainer" + contadorDivs;
  let divId = "serie" + contadorDivs;
  allContainer.id = allDivId;
  pContainer.id = divId;
  allContainer.className = "allContainer";
  pContainer.className = "textContainer";
  $list.appendChild(allContainer);
  allContainer.appendChild(pContainer);


}

function createP(paragraph) {
  let newParagraph = document.createElement("p");
  newParagraph.textContent = paragraph;
  newParagraph.className = "text";
  let divId = "serie" + contadorDivs;
  let pDiv = document.getElementById(divId);
  pDiv.appendChild(newParagraph);

}

function deletInput() {
  $toDoInput.value = "";
}

function creatCheckBox() {
  let actualId = "theContainer" + contadorDivs;
  let allContainer = document.getElementById(actualId);
  let newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";
  newCheckBox.id = "checkbox" + contadorDivs;
  newCheckBox.className = "check-box";
  allContainer.appendChild(newCheckBox);
  return newCheckBox.id;
}


function creatDeleteButton(task, checkBox) {
  let actualId = "theContainer" + contadorDivs;
  let allContainer = document.getElementById(actualId);
  let $task = document.getElementById(task);
  let $checkBox = document.getElementById(checkBox);
  let newButton = document.createElement("button");
  newButton.id = "button" + contadorDivs;
  newButton.className = "delete-button";
  newButton.textContent = "Delete"
  newButton.addEventListener("click", function() {
    newButton.remove();
    $task.remove();
    $checkBox.remove();
  })
  allContainer.appendChild(newButton);

}
function clearAll() {
  for (let i = 1; i <= contadorDivs; i++) {
    console.log("el numero de divs es ", i);
    let allDivId = "theContainer" + i;
    let $allDiv = document.getElementById(allDivId);
    $allDiv.remove();
  }
  contadorDivs = 0;
}

function detectInput() {
  let text = getText()
  if (event.key === "Enter") {
    console.log("se presiono enter");
    if (text === "clear++" || text === "--clear") {
      console.log("funciona");
      clearAll();
      deletInput();
    }
    else if (text === "payaso++" || text === "--payaso") {
      window.alert("screamer de payaso 🗿")
      deletInput();
    }
    else if (text === "black++" || text === "--black") {
      changeStyle("blackStyle");
      deletInput();
    }
    else if (text === "colorfull++" || text === "--colorfull") {
      changeStyle("colorfull");
      deletInput();
    }
    else if (text === "white++" || text === "white++") {
      changeStyle("whiteStyle");
      deletInput();
    }
    else if (text === "documentation++" || text === "--documentation" || text === "man++" || text === "--man") {
      window.open("documentation/index.html", "_blank");
      deletInput();
    }

    else {
      createD();
      createP(text);
      creatCheckBox();
      let paragraphId = "serie" + contadorDivs;
      let checkBoxId = "checkbox" + contadorDivs;
      creatDeleteButton(paragraphId, checkBoxId);
      deletInput();
    }
  }
}

$toDoInput.addEventListener("keypress", detectInput)
