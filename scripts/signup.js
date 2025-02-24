async function initSignUp() {
    await init();
    clearSignUpForm();
}

function clearSignUpForm() {
    document.getElementById("name").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmed").value = "";
    document.getElementById("checkboxSignUp").checked = false;
}

async function addUser() {
    let userName = document.getElementById("name").value;
    let userMail = document.getElementById("mail").value;
    let userPassword = checkPasswordConfirmed();
    if (userPassword !== undefined) {
        let checkbox = document.getElementById("checkboxSignUp");
        if (checkbox.checked && userName !== "" && userMail !== "" ) {
            await postData("/users/", {
                "name": userName,
                "mail": userMail,
                "password": userPassword
            });
            signUpSuccesfully();
            clearSignUpForm();
        }
    }
}

function checkPasswordConfirmed() {
    let password = document.getElementById("password").value;
    let confirmed = document.getElementById("confirmed").value;
    if (password === confirmed) {
        return password;
    }
}

function signUpSuccesfully() {
    let signUpMsg = document.getElementById("msgSignUp");
        signUpMsg.classList.remove("d-none");
    setTimeout(function () {
        signUpMsg.classList.add("d-none");
        redirectionToLogIn();
    }, 2400);
}

function redirectionToLogIn() {
    window.location.href = "login.html";
}