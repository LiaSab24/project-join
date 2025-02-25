/**
 * This function is the inital function, when login.html is loading and executes the init()-function and furher necessary login-functions
 */
async function initLogIn() {
    await init();
    clearLogInForm();
}

/**
 * This function clears the input-values of the login-form
 */
function clearLogInForm() {
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";
}

function LogIn() {
    //check if username fits to password
    //"redirectionToSummary()" if true, msg if not
    //currentUser gets ID of logged in user
}

/**
 * This function redirects the user to the summary (Login succesfull)
 */
function redirectionToSummary() {
    window.location.href = "summary.html";
}