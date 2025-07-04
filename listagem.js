//Div IDs
const buttonContainer2 = document.getElementById("button-container2");
const boxList = document.getElementById("box-list");
const insertContainer = document.getElementById("insert-container");
const deleteContainer = document.getElementById("delete-container");

//Button IDs
const showListButton = document.getElementById("show-button");
const hideListButton = document.getElementById("hide-button");
const insertButton = document.getElementById("insert-button");
const deleteButton = document.getElementById("delete-button");
const insertFriendButton = document.getElementById("send-button");

//TextArea IDs
const tAreaName = document.getElementById("ta-name")
const tAreaAge = document.getElementById("ta-age")
const tAreaCollege = document.getElementById("ta-college")
const tAreaCourse = document.getElementById("ta-course")

let friendsObj;

fetch('friends.json')
    .then(response => response.text())
    .then(text => {
        friendsObj = JSON.parse(text)
        console.log(friendsObj)
    })

//Show List Button Function
let isShowListToggled = false;
showListButton.addEventListener("click", () => {
    if (!isShowListToggled) {
        showListButton.value = "Update List"
    } else {
        showListButton.value = "Show List"
    }
    buttonContainer2.style.display = "flex"
    boxList.innerHTML = "";

    /*fetch('friends.json')
    .then(response => response.text())
    .then(text => {
        const friendsObj = JSON.parse(text)
        console.log(friendsObj)*/
       
    friendsObj.forEach(friend => {
        const p = document.createElement('p');
        p.innerText = `ID: ${friend.id}\nName: ${friend.nome}\nAge: ${friend.idade}\nCollege: ${friend.faculdade}\nCourse: ${friend.curso}`
        boxList.appendChild(p);
    })
    .catch(erro => {
        console.log('Erro ao carregar JSON externo:', erro);
    })
})
            
        

//Hide List Button Function
hideListButton.addEventListener("click", () => {
    boxList.innerHTML = "";
    buttonContainer2.style.display = "none"
    showListButton.value = "Show List"
})

//Insert Into List Button Function
let isInsertToggled = false
    insertButton.addEventListener("click", () => {
    if (!isInsertToggled) {
        isInsertToggled = true
        insertButton.value = "Close Insert"
        deleteButton.style.display = "none";
        insertContainer.style.display = "flex";
    } else {
        isInsertToggled = false
        insertButton.value = "Insert into List";
        deleteButton.style.display = "block";
        insertContainer.style.display = "none";
    }
})

//Insert Friend Into List Button Function
let friendCounter = 4
insertFriendButton.addEventListener("click", (e) => {
    e.preventDefault()

    var nameContent = document.getElementVal('name-id');
    var ageContent = document.getElementVal('age-id');
    var collegeContent = document.getElementVal('college-id');
    var courseContent = document.getElementVal('course-id')

    if (nameContent === '' || ageContent === '' || collegeContent === '' || courseContent === '') {
        alert('Fill all spaces first!')
    }
    
    Object.assign({friendsObj}, newFriend)

    alert('New Friend Added to List!')
});

//Delete From List Button Function
let isDeleteToggled = false
deleteButton.addEventListener("click", () => {
    if (!isDeleteToggled) {
        isDeleteToggled = true
        deleteButton.value = "Close Delete"
        insertButton.style.display = "none";
        deleteContainer.style.display = "flex";
    } else {
        isDeleteToggled = false
        deleteButton.value = "Delete From List";
        insertButton.style.display = "block";
        deleteContainer.style.display = "none";
    }
})
