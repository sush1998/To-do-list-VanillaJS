const addBtn=document.querySelector("#add");
const input=document.querySelector("#list-input")
const displayTable=document.querySelector("#list-table")
const deleteBtn=document.querySelector(".delete-btn")
const filterBtn=document.querySelector("#filter");
const priority=document.querySelector("#priority");
const count=document.querySelector("#count")

const list=[];

function addToList(taskName,prio)
{
    //console.log("clicked");
    let newtask={
        title:taskName,
        completed:false,
        priority:prio,
        id:Date.now()
    }
    list.unshift(newtask)
    input.value="";
    input.focus()
    displayList(list);
}

function getCountofTask_Yet_toComplete(list)
{
    let number= list.reduce((acc,item)=>item.completed==false?acc+1:acc,0)
    count.innerHTML=number
    
}

function filterTask(filterType)
{   
    // let filteredList=list.filter(item=>item.completed===true);
    // console.log(filteredList)
    // displayList(filteredList);
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
    }
    else
    {
        list[indexInList].completed=false;
    }
    
    getCountofTask_Yet_toComplete(list);
    //console.log(list)
 
}

function displayList(listToDisplay)
{
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

    // return `<li class="task-item" id="${itemToRender.id}>
    //     <div class="details">
    //     <p >${itemToRender.title}</p>
    //     <p>Date</p>
    //     </div>
    //     <div class="task-buttons">
    //     <button class="delete-btn" id="${itemToRender.id}" onclick=deleteItem(${itemToRender.id})>X</button>
    //     ${checkbox}
    //     </div>
    // </li>`

    return `<li class="task-item" >
                <div class="details">
                    <p>${itemToRender.title}</p>
                    <p id="date">Date</p>
                </div>
                <div class="task-buttons">
                    ${checkbox}
                    <button class="delete-btn" id="${itemToRender.id}" onclick=deleteItem(${itemToRender.id})>X</button>
                </div>
            </li>`
}

addBtn.addEventListener("click",()=>{addToList(input.value,priority.value)})
filterBtn.addEventListener("change",function(){
    filterTask(this.value)
   // getCountofTask_Yet_toComplete(list)
})