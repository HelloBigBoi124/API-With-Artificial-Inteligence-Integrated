//Div IDs
const buttonContainer2 = document.getElementById("button-container2");
const boxList = document.getElementById("box-list");
const insertContainer = document.getElementById("insert-container");
const deleteContainer = document.getElementById("delete-container");
const changeContainer1 = document.getElementById("change-container1");
const changeContainer2 = document.getElementById("change-container2");

//Button IDs
const showListButton = document.getElementById("show-button");
const hideListButton = document.getElementById("hide-button");
const insertButton = document.getElementById("insert-button");
const deleteButton = document.getElementById("delete-button");
const changeButton = document.getElementById("change-button");
const insertFriendButton = document.getElementById("send-button");
const deleteFriendButton = document.getElementById("delete-friend-button");
const changeFriendButton = document.getElementById("change-friend-button");
const saveChangeButton = document.getElementById("save-button")


//Access and save JSON File in variable
let friendsObj;
fetch('friends.json')
    .then(response => response.text())
    .then(text => {
        friendsObj = JSON.parse(text)
    })
    .catch(erro => {
        console.log('Erro ao carregar JSON externo:', erro);
    })

//Show List Button Function
let isShowListToggled = false;
showListButton.addEventListener("click", updateList = () => {
    if (!isShowListToggled) {
        showListButton.value = "Update List"
    } else {
        showListButton.value = "Show List"
    }
    buttonContainer2.style.display = "flex"
    boxList.innerHTML = "";
       
    friendsObj.forEach(friend => {
        const p = document.createElement('p');
        p.innerText = `ID: ${friend.id+1}\nName: ${friend.name}\nAge: ${friend.age}\nCollege: ${friend.college}\nCourse: ${friend.course}`
        boxList.appendChild(p);
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
        changeButton.style.display = "none";
        insertContainer.style.display = "flex";
    } else {
        isInsertToggled = false
        insertButton.value = "Insert into List";
        deleteButton.style.display = "block";
        changeButton.style.display = "block";
        insertContainer.style.display = "none";
    }
})

const getElementVal = (id) => {
    return document.getElementById(id).value;
};

//Insert Friend Into List Button Function
let friendCounter = 4
insertFriendButton.addEventListener("click", (e) => {
    e.preventDefault();

    var nameContent = getElementVal('name-id');
    var ageContent = getElementVal('age-id');
    var collegeContent = getElementVal('college-id');
    var courseContent = getElementVal('course-id');

    if (nameContent === '' || ageContent === '' || collegeContent === '' || courseContent === '') {
        alert('Fill all spaces first!')
    } else if (friendsObj.length >= 30){
        alert('Your Friend List is Full! Delete a Friend to Add Another One.(Max: 30 Friends)')
    } else {
        friendCounter++
        saveFriendInfo(friendCounter, nameContent, ageContent, collegeContent, courseContent);
        updateList();
        console.log(friendsObj)
        alert('New Friend Added to List!')
    }
});

const saveFriendInfo = (friendCounter, nameContent, ageContent, collegeContent, courseContent) => {
    var savedFriendInfo = {

        id: friendCounter,
        name: nameContent,
        age: parseInt(ageContent),
        college: collegeContent,
        course: courseContent

    }

    friendsObj.push(savedFriendInfo)

}

//Delete From List Button Function
let isDeleteToggled = false
deleteButton.addEventListener("click", () => {

    if (!isDeleteToggled) {

        isDeleteToggled = true
        deleteButton.value = "Close Delete"
        insertButton.style.display = "none";
        changeButton.style.display = "none";
        deleteContainer.style.display = "flex";

    } else {

        isDeleteToggled = false
        deleteButton.value = "Delete From List";
        insertButton.style.display = "block";
        changeButton.style.display = "block";
        deleteContainer.style.display = "none";

    }
})

deleteFriendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const rawId = parseInt(getElementVal('friend-id'));
    const idContent = rawId - 1;

    if (isNaN(idContent) || idContent < 0 || idContent >= friendsObj.length) {
        alert('Insert a valid ID from an existing friend!')
    }

    if (confirm(`Confirm Deletion from List? Friend you're deleting: "${friendsObj[idContent].name}"`)) {

            friendsObj.splice(idContent, 1)

            for (let i = idContent; i < friendsObj.length; i++ ) {
                friendsObj[i].id -= 1;    
            }

        updateList();
        alert('Friend Deleted from Friend List Succesfully!')

    }
})

//Change Info of Friend Functions
var nameChangeContent = document.getElementById('name-change-id');
var ageChangeContent = document.getElementById('age-change-id');
var collegeChangeContent = document.getElementById('college-change-id');
var courseChangeContent = document.getElementById('course-change-id');

let isChangeToggled = false
changeButton.addEventListener("click", () => {

    if (!isChangeToggled) {

        isChangeToggled = true
        changeButton.value = "Close Change"
        insertButton.style.display = "none";
        deleteButton.style.display = "none";
        changeContainer1.style.display = "flex";

    } else {

        isChangeToggled = false
        changeButton.value = "Change Friend Info";
        insertButton.style.display = "block";
        deleteButton.style.display = "block";
        changeContainer1.style.display = "none";

    }
})


let isChangeFriendToggled = false;
let savedId = null;

changeFriendButton.addEventListener("click", (e) => {
    e.preventDefault();
    const rawId = parseInt(getElementVal('friend-change-id'));
    const idContent = rawId - 1;
    savedId = idContent;

    if (isNaN(idContent) || idContent < 0 || idContent >= friendsObj.length) {

            alert('Insert a valid ID from an existing friend!')
            return

        } else {
            if (!isChangeFriendToggled) {

                isChangeFriendToggled = true
                changeButton.style.display = "none"
                changeContainer1.style.display = "none";
                changeContainer2.style.display = "flex";
                nameChangeContent.value = friendsObj[idContent].name;
                ageChangeContent.value = friendsObj[idContent].age;
                collegeChangeContent.value = friendsObj[idContent].college;
                courseChangeContent.value = friendsObj[idContent].course;  

            } else {

                isChangeFriendToggled = false
                changeButton.style.display = "block"
                changeContainer1.style.display = "flex";
                changeContainer2.style.display = "none";

            }
        }
})

saveChangeButton.addEventListener("click", saveChange = () => {
        if (nameChangeContent.value === '' || ageChangeContent.value === '' || collegeChangeContent.value === '' || courseChangeContent.value === '') {

            alert('Fill all spaces first!')

        } else {

            try {

                friendsObj[savedId].name = nameChangeContent.value;
                friendsObj[savedId].age = parseInt(ageChangeContent.value);
                friendsObj[savedId].college = collegeChangeContent.value;
                friendsObj[savedId].course = courseChangeContent.value;
                alert("The informations we're changed succesfully!")
                updateList();
                isChangeFriendToggled = false
                changeButton.style.display = "block"
                changeContainer1.style.display = "flex";
                changeContainer2.style.display = "none";
                isChangeToggled = false
                changeButton.value = "Change Friend Info";
                insertButton.style.display = "block";
                deleteButton.style.display = "block";
                changeContainer1.style.display = "none";

            } catch(erro) {

                console.error("Fail saving changes: ", erro);
                alert('Fail when saving changes, check console for error log.') 

            }
        }
})