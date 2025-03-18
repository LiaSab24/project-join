let userMailIndex = [];
let userPasswordIndex = [];

/**
 * This function is the inital function, when login.html is loading and executes the init()-function and furher necessary login-functions
 */
async function initLogIn() {
    await init();
    loggedInUser = "";
    clearLogInForm();
    document.getElementById("alert").classList.add("d-none");
    currentUser = -1;
}

/**
 * This function clears the input-values of the login-form 
 */
function clearLogInForm() {
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";
}

/**
 * This function reads out the mail and password and if they are filled in correctly and fit to a user, the user is able to log in
 */
async function LogIn() {
    let userMail = validateMailInput("mail");
    let userPassword = document.getElementById("password").value;
    if (userMail !== "" && userPassword !== "") {
        loggedInUser = checkUserDataExists();
        if (loggedInUser !== -1) {
            await putData("/currentUser/userId", loggedInUser);
            redirectionToSummary()
        } else {
            document.getElementById("alert").classList.remove("d-none");
        }
    } else {
        document.getElementById("alert").classList.remove("d-none"); 
        checkFilledInput('mail');
        checkFilledInput('password');
    }
}  

/**
 * This function fills the two defined arrays with the index of each user, who uses the given input (mail and password)
 */
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
    for (let indexUser = 0; indexUser < users.length - 1; indexUser++) {
        let password = users[indexUser].password;
        if (password === userPassword) {
            userPasswordIndex.push(indexUser)
        }
    }
    return compareMailPassword();
}

/**
 * This function is part of the checkUserDataExists()-function and checks, if a user exists, who has the given mailaddress and the given password assigned
 */
function compareMailPassword() {
    for (let i = 0; i < userMailIndex.length; i++) {
        for (let j = 0; j < userPasswordIndex.length; j++) {
            if (userMailIndex[i] == userPasswordIndex[j]) {
                return userMailIndex[i];
            }
        }
    }
return -1
}

/**
 * This function gives the currentUser the id of the guest, so the users doesn't need to sign up to use Join
 * 
 * @param {number} loggedInUser - the id of the logged in user
 */
async function guestLogin() {
    loggedInUser = users.length-1;
    await putData("/currentUser/userId", loggedInUser);
    redirectionToSummary(loggedInUser);
}

/**
 * This function redirects the user to the summary (Login succesfull)
 */
function redirectionToSummary() {
    window.location.href = "./html/summary.html";
}