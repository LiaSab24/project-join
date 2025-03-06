/**
 * This function is the inital function, when login.html is loading and executes the init()-function and furher necessary login-functions
 */
async function initLogIn() {
    await init();
    clearLogInForm();
    document.getElementById("alert").classList.add("d-none")
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
        if (checkUserExists()) {
            redirectionToSummary(currentUserId)
        }
    } else {
        document.getElementById("alert").classList.remove("d-none");
        checkFilledInput('mail');
        checkFilledInput('password');
    }
}

function checkUserExists() {
    
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