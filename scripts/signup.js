/**
 * This function is the inital function, when sign_up.html is loading and executes the init()-function and furher necessary sign-up-functions
 */
async function initSignUp() {
    await init();
    clearSignUpForm();
}

/**
 * This function clears the input values of the sign-up-form and unchecks the checkbox
 */
function clearSignUpForm() {
    document.getElementById("name").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmed").value = "";
    document.getElementById("checkboxSignUp").checked = false;
}

/**
 * This function reads out the input-values of the sign-up form.
 * If the user checked the checkbox and assigned a confirmed password, a name and a mail-address the data is added to firebase.
 */
async function addUser() {
    let userName = validateNameInput("name");
    let userMail = validateMailInput("mail");
    let userPassword = checkPasswordConfirmed();
    let checkbox = document.getElementById("checkboxSignUp");
    if (userPassword !== undefined) {
        if (checkbox.checked) {
            if (userName !== "" && userMail !== "") {
                await postData("/users/", {
                    "name": userName,
                    "mail": userMail,
                    "password": userPassword
                });
                await addUserToContacts(userName, userMail);
                signUpSuccessfully();
            } else {
                signUpUnsuccessfully();
            }
        } else {
            logInRequirementsUnfullfilled("Checkbox");
        }
    }
}

/**
 * This function is part of the addUser()-function and reads out the input-values of the password- and confirm-password-inputs.
 * If they are the same, the password is returned
 */
function checkPasswordConfirmed() {
    let password = document.getElementById("password").value;
    if (password == "") {
        logInRequirementsUnfullfilled("Password");
    } else {
        let confirmed = document.getElementById("confirmed").value;
        if (password === confirmed) {
            return password;
        } else {
            logInRequirementsUnfullfilled("Confirm");
        }
    }
}

/**
 * This function checks which signup-requirements are unfullfilled and gives the user feedback accordingly (alerts and marked inputs)
 * 
 * @param {string} requirement - the unfullfilled requirement (Checkbox, Password, Confirm)
 */
function logInRequirementsUnfullfilled(requirement) {
    document.getElementById("alert"+requirement+"SignUp").classList.remove("invisible");
    setTimeout(function () {
        document.getElementById("alert"+requirement+"SignUp").classList.add("invisible");
    }, 2400);
}

/**
 * This function reads out the data of the add-contact-form and sends it to firebase
 */
async function addUserToContacts(userName, userMail) {
    let indexContact = contacts.length + 1;
    let contactColor = await assignRandomColor(indexContact);
    postData("/contacts/", {
        "name": userName,
        "mail": userMail,
        "phone": "",
        "color": contactColor
    });
}

/**
 * This function executes the necessary functions for a successfull sign-up
 */
function signUpSuccessfully () {
    successfullMsg("userSuccesfullyCreated");
    clearSignUpForm();
    setTimeout(function () {
        redirectionToLogIn();
    }, 1800);
}

/**
 * This function redirects the user to the log-in-page
 */
function redirectionToLogIn() {
    window.location.href = "../index.html";
}

/**
 * This function executes the necessary functions for a unsuccessfull sign-up
 */
function signUpUnsuccessfully() {
    checkFilledInput('name');
    checkFilledInput('mail');
    checkFilledInput('password');
    checkFilledInput('confirmed');
}