let userMailIndex = [];
let userPasswordIndex = [];

/**
 * This function is the inital function, when login.html is loading and executes the init()-function and furher necessary login-functions
 */
async function initLogIn() {
    await init();
    clearLogInForm();
    document.getElementById("alert").classList.add("d-none");
}

/**
 * This function clears the input-values of the login-form
 */
function clearLogInForm() {
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";
}

function LogIn() {
    let userMail = document.getElementById("mail").value;
    let userPassword = document.getElementById("password").value;
    if (userMail !== "" && userPassword !== "") {
        let currentUserId = checkUserDataExists();
        if (currentUserId !== -1) {
            console.log(currentUserId);
            redirectionToSummary(currentUserId)
        } else {
            document.getElementById("alert").classList.remove("d-none");
        }
    } else {
        document.getElementById("alert").classList.remove("d-none");
        checkFilledInput('mail');
        checkFilledInput('password');
    }
    longestArr = []
}

function checkUserDataExists() {
    userMailIndex = [];
    userPasswordIndex = [];
    let userMail = document.getElementById("mail").value;
    let userPassword = document.getElementById("password").value;
    for (let indexUser = 0; indexUser < users.length - 1; indexUser++) {
        let mail = users[indexUser].mail;
        if (mail === userMail) {
            userMailIndex.push(indexUser)
        }
    }
    //console.log(userMailIndex)
    for (let indexUser = 0; indexUser < users.length - 1; indexUser++) {
        let password = users[indexUser].password;
        if (password === userPassword) {
            userPasswordIndex.push(indexUser)
        }
    }
    //console.log(userPasswordIndex)
    return compareMailPassword();
}

function compareMailPassword() {
    for (let i = 0; i < userMailIndex.length; i++) {
        for (let j = 0; j < userPasswordIndex.length; j++) {
            if (userMailIndex[i] == userPasswordIndex[j]) {
                return userMailIndex[i];
            }
        }
    }
return -1

    // if (userMailIndex.length >= userPasswordIndex.length) {
    //     for (let i = 0; i < userMailIndex.length; i++) {

    //     }
    // } else {
    //     for (let i = 0; i < userPasswordIndex.length; i++) {

    //     }
    // }

    // console.log(new Set (userMailIndex));
    // console.log(userPasswordIndex);

    // userMailIndex.forEach((element) => if (element = userPasswordIndex) {

    // })

    let
}

/**
 * This function redirects the user to the summary (Login succesfull)
 * 
 * @param {number} currentUserId - the id of the logged in user
 */
function redirectionToSummary(currentUserId) {
    currentUser = currentUserId;
    window.location.href = "summary.html";
}