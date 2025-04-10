const contEl = document.querySelector(".child")
const inpEl = document.getElementById("inpbox")
const ulEl = document.querySelector(".list")

let list = JSON.parse(localStorage.getItem("list"));

if(list){
    list.forEach((task) => {
        toDoList(task);
    });
}

inpEl.addEventListener("keypress",(event)=>{
if(event.key=="Enter"){
    event.preventDefault();
toDoList();
}
})

function toDoList(task){

    let newTask = inpEl.value;
    if(task){
        newTask = task.name;
    }
    if (!newTask.trim()) return; 

    const liEl = document.createElement("li");
    if(task && task.checked){
        liEl.classList.add("checked");
    }

    liEl.innerText = newTask;
    ulEl.appendChild(liEl);
    inpEl.value = ""
    
    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fas fa-check-square">`;
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `
    <i class="fas fa-trash"></i>`;
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click",()=>{
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click",()=>{
        liEl.remove();
        updateLocalStorage();
    })

    updateLocalStorage();

}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach((liEl)=>{
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        })
    })
    localStorage.setItem("list",JSON.stringify(list))
}