document.addEventListener("DOMContentLoaded", function() {
  console.log("hello world");
const $title = document.getElementById("title");
const $list = document.getElementById("toDo-container");
const $toDoInput = document.getElementById("input");
const $colorStyle = document.getElementById("colorfull");
const $blackStyle = document.getElementById("blackStyle");
const $whiteStyle = document.getElementById("whiteStyle");
let textAmount = parseInt(localStorage.getItem('textAmount')) || 0;
let themesAmount = 3;
let contadorDivs = 0;
let eventListenerAdded = false;



function getText() {
  let text = $toDoInput.value.trim()
  return text
}

function addUser(){
  if (localStorage.getItem("name")){
    let username = localStorage.getItem("name");
    $title.textContent = "Hi, "+username;
    localStorage.setItem("isActive","1");
  } else{
    let username = prompt("write your name");
    localStorage.setItem("name",username);
    let userName = localStorage.getItem("name");
    $title.textContent = "Hi, "+userName;
    localStorage.setItem("isActive","1");
  }
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
  textAmount++
  let textValue = "text"+textAmount
  localStorage.setItem(textValue,paragraph)
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


function creatDeleteButton(task, checkBox, textValue) {
  let actualId = "theContainer" + contadorDivs;
  let allContainer = document.getElementById(actualId);
  let $task = document.getElementById(task);
  let $checkBox = document.getElementById(checkBox);
  let newButton = document.createElement("button");
  newButton.id = "button" + contadorDivs;
  newButton.className = "delete-button";
  newButton.textContent = "Delete"
  newButton.addEventListener("click", function() {
    allContainer.remove();
    localStorage.removeItem(textValue);
  })
  allContainer.appendChild(newButton);

}
function clearAll() {
  let keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("text")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
  let containers = document.querySelectorAll(".allContainer");
  containers.forEach(container => {
    container.remove();
  });
  contadorDivs = 0;
  textAmount = null;
}

function initSesion() {
  for (let i = 0; i < 150; i++) {
    let textKey = "text" + i;
    let text = localStorage.getItem(textKey);
    if (text !== null) {
      if (document.getElementById("theContainer" + i) === null) {
        createD();
        createP(text);
        creatCheckBox();
        let paragraphId = "serie" + contadorDivs;
        let checkBoxId = "checkbox" + contadorDivs;
        creatDeleteButton(paragraphId, checkBoxId, textKey);
      }
    }
  }

  let eventListenerAdded = false;
  if (!eventListenerAdded) {
    $toDoInput.addEventListener("keypress", detectInput);
    eventListenerAdded = true;
  }
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
    else if (text === "user++" || text === "--user"){
      if(localStorage.getItem("isActive")==="0"){
        addUser();
        deletInput();
      }else{
        $title.textContent = "ToDo List";
        deletInput();
        localStorage.setItem("isActive","0");
  
      }
      
    }
    else if (text === "math++" || text == "--math"){
      window.open("https://lemoncalculator.netlify.app/", "_blank");
    }

    else {
      createD();
      createP(text);
      creatCheckBox();
      let paragraphId = "serie" + contadorDivs;
      let checkBoxId = "checkbox" + contadorDivs;
      let textValue = "text"+textAmount;
      creatDeleteButton(paragraphId, checkBoxId,textValue);
      deletInput();
    }
  }
}
if(localStorage.getItem("isActive")==="1") {
  addUser();
}
else{
  console.log("no esta activo")
}
$toDoInput.addEventListener("keypress", detectInput)
initSesion()
});

