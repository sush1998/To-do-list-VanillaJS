const addBtn=document.querySelector("#add");
const input=document.querySelector("#list-input")
const displayTable=document.querySelector("#list-table")
const deleteBtn=document.querySelector(".delete-btn")
const filterBtn=document.querySelector("#filter");
const sortBtn=document.querySelector("#sort");
const priority=document.querySelector("#priority");
const count=document.querySelector("#count")
const displayData=document.querySelector(".display-data")
const clearModal=document.querySelector("#clear-Modal");
const openBtn=document.querySelector("#openBtn");
const closeBtn=document.querySelector(".close");
const modalYes=document.querySelector("#modalYesBtn")
const modalNo=document.querySelector("#modalNoBtn");
const startBtn=document.querySelector("#start-btn")
const home=document.querySelector(".home")
const app=document.querySelector(".app-content")
const addtextError=document.querySelector("#addTask-Error")


const list=[];

function addToList(taskName,prio)
{
    if(input.value=="")
    {
        addtextError.innerHTML="Please enter Task";
        addtextError.focus()
    }
    else{
        addtextError.innerHTML=""
        const date=new Date();
        const options={year:'numeric',month:'long',day:'numeric'};
    //console.log("clicked");
        let newtask=
        {
        title:taskName,
        completed:false,
        priority:prio,
        id:Date.now(),
        date:date.toLocaleString('en-US',options)
        }
        list.unshift(newtask)
        input.value="";
        priority.value=0;
        input.focus()
        displayList(list);
    }
    
}

function getCountofTask_Yet_toComplete(list)
{
    let number= list.reduce((acc,item)=>item.completed==false?acc+1:acc,0)
    count.innerHTML=number;

    if(number==0)
    {
        showEditModal()
    }
    
}

function filterTask(filterType)
{   

    console.log(filterType);
    switch(filterType)
    {
        case "completed":
            let completedTask=list.filter(item=>item.completed===true);
            displayList(completedTask)
            break;
        case "in-progress":
            let inProgressTask=list.filter(item=>item.completed===false);
            displayList(inProgressTask)
            break;
        case "all":
            //let allTask=list.filter(item=>item.completed===false);
            displayList(list)
            break;
        default:
            displayList(list)
    }

}

function sortTask(sortType)
{
    sortType=="high"?displayList(list.sort((task,task2)=>task.priority-task2.priority)):displayList(list.sort((task,task2)=>task2.priority-task.priority))
}


function deleteItem(itemToDelete)
{
    console.log("delete clicked")
    console.log(itemToDelete);
    let i=list.filter(item=>item.id!=itemToDelete)
    console.log(i);
    list.length=0;
    list.push(...i)
    displayList(list)

}

function changeCheck(itemToChange)
{
    console.log("change  clicked");
    
    let indexInList=list.findIndex(item=>item.id==itemToChange);
    if(list[indexInList].completed==false)
    {
        list[indexInList].completed=true;
        document.getElementById(`li-${itemToChange}`).classList.add("checked")
    }
    else
    {
        list[indexInList].completed=false;
        document.getElementById(`li-${itemToChange}`).classList.remove("checked")
    }
    
    getCountofTask_Yet_toComplete(list);
    //console.log(list)
 
}

function showEditModal()
{
    clearModal.style.display="block";
    


}




function displayList(listToDisplay)
{
    if(list.length>0)
    {
        displayData.classList.remove("hidden");
        
    }
    else{
        displayData.classList.add("hidden");
    }


    let tableList=listToDisplay.map(task=>renderListItem(task))
    console.table(tableList)
    displayTable.innerHTML=tableList.join("")
    getCountofTask_Yet_toComplete(list)

    
}


function renderListItem(itemToRender)
{
    let checkbox=`<input type="checkbox" id="${itemToRender.id}" onclick=changeCheck(${itemToRender.id})>`
    if(itemToRender.completed==true)
    {
        checkbox=`<input type="checkbox" id="${itemToRender.id}" onclick=changeCheck(${itemToRender.id}) checked>`
    }
    
    let className="low"
    let classChecked=""
    let prio=itemToRender.priority;
    


    switch(prio)
    {
        case '1':
            className="high"
            break;
        case '2':
            className="medium"
            break;

    }

    if(itemToRender.completed===true)
    {
        classChecked="checked";
    }
    else{
        classChecked="not-checked"
    }
    
    return `<li class="task-item ${className} ${classChecked}" id="li-${itemToRender.id}">
                <div class="details">
                    <p class="task-title">${itemToRender.title}</p>
                    <p class="task-date">${itemToRender.date}</p>
                </div>
                <div class="task-buttons">
                    ${checkbox}
                    <i class="material-icons delete-btn" id="${itemToRender.id}" onclick=deleteItem(${itemToRender.id})>delete</i>
                </div>
            </li>`
}

addBtn.addEventListener("click",()=>{addToList(input.value,priority.value)})

filterBtn.addEventListener("change",function(){
    filterTask(this.value)  
})

sortBtn.addEventListener('change',function()
{
    sortTask(this.value)
})

closeBtn.addEventListener("click",function()
{
    editModal.style.display="none"
})

modalYes.addEventListener("click",function()
{
    console.log("yes clicked")
    list.length=0;
    displayList(list)
    clearModal.style.display="none";
})

modalNo.addEventListener("click",function()
{
    clearModal.style.display="none";
})

closeBtn.addEventListener("click",function()
{
    clearModal.style.display="none"
})

startBtn.addEventListener("click",function()
{
    home.style.display="none"
    app.style.display="block"
})