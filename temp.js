const editModal=document.querySelector("#edit-Modal");
const openBtn=document.querySelector("#openBtn");
const closeBtn=document.querySelector(".close");



openBtn.addEventListener("click",function()
{
   console.log("clicked")
   editModal.style.display="block"
})


closeBtn.addEventListener("click",function()
{
    editModal.style.visibility="hidden";
})