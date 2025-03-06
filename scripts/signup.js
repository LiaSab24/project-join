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
    let userName = document.getElementById("name").value;
    let userMail = document.getElementById("mail").value;
    let userPassword = checkPasswordConfirmed();
    if (userPassword !== undefined) {
        let checkbox = document.getElementById("checkboxSignUp");
        if (checkbox.checked && userName !== "" && userMail !== "") {
            await postData("/users/", {
                "name": userName,
                "mail": userMail,
                "password": userPassword
            });
            await addUserToContacts(userName, userMail);
            signUpSuccesfully();
            clearSignUpForm();
        } else {
            checkFilledInput('name');
            checkFilledInput('mail');
            checkFilledInput('password');
            checkFilledInput('confirmed')
        }
    }
}

/**
 * This function is part of the addUser()-function and reads out the input-values of the password- and confirm-password-inputs.
 * If they are the same, the password is returned
 */
function checkPasswordConfirmed() {
    let password = document.getElementById("password").value;
    let confirmed = document.getElementById("confirmed").value;
    if (password === confirmed) {
        return password;
    }
}

/**
 * This function shows the 'sign-up succesfull'-message after adding the user to the users-array and firebase was succesfull
 */
function signUpSuccesfully() {
    let signUpMsg = document.getElementById("msgSignUp");
    signUpMsg.classList.remove("d-none");
    setTimeout(function () {
        signUpMsg.classList.add("d-none");
        redirectionToLogIn();
    }, 2400);
}

/**
 * This function redirects the user to the log-in-page
 */
function redirectionToLogIn() {
    window.location.href = "login.html";
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