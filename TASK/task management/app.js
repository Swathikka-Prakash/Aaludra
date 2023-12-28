let button = document.getElementById('add')
let todolist = document.getElementById('todolist')
let input = document.getElementById('input');

let lists = [];
window.onload = ()=>{
    lists = JSON.parse(localStorage.getItem(lists)) || []
    lists.forEach(list=>addlist(list))
}

button.addEventListener('click',()=>{
    lists.push(input.value)
    console.log(lists)
    addlist(input.value)
    input.value=''
})

function addlist(list){
    let para = document.createElement('p');
    para.innerText = list;
    todolist.appendChild(para)
    localStorage.setItem('lists',JSON.stringify(lists))
    para.addEventListener('click',()=>{
        para.style.textDecoration = 'line-through'
        remove(list)
    })
    para.addEventListener('dblclick',()=>{
        todolist.removeChild(para)
        remove(list)
    })
}

function remove(list){
    let index = lists.indexOf(list)
    if(index>-1){
        lists.splice(index,1);
    }
    localStorage.setItem('lists',JSON.stringify(lists))
}