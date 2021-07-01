const startBtn=document.querySelector("#start-btn")

const home=document.querySelector(".home")
const app=document.querySelector(".app-content")

startBtn.addEventListener("click",function()
{
    home.style.display="none"
    app.style.display="block"
})