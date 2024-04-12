const $spanName = document.getElementById("user-name");

const storedName = localStorage.getItem("name");
if(storedName){
  $spanName.textContent = ` ${storedName},`;
} else{
  setUser()
}

function setUser() {
  const userName = prompt("write your username :3");
  console.log($spanName);
  if (!userName){
      setUser();
  }else {
      localStorage.setItem("name", userName);
      console.log("Username:", userName); // Verifica si userName se está estableciendo correctamente
      $spanName.textContent = userName;
    }
  }




