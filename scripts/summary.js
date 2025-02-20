async function initSummary() {
    await init();
    showTasksNumbers();
    greetingDaytime();
    showUserName()
}

function showTasksNumbers() {
    //shows tasksnumbers
}

function greetingDaytime() {

}

function showUserName() {
    console.log(users)
    let userNameContentRef = document.getElementById("userName");
    userNameContentRef.innerHTML = "";
    userNameContentRef.innerHTML = users[0].name;
    if (userNameContentRef.innerHTML == " ") {
        const greetingContentRef = document.getElementById("greetingDaytime");
        let originallyGreeting = greetingContentRef.innerHTML;
        console.log(originallyGreeting);
        let newGreeting = originallyGreeting.slice(0, originallyGreeting.length-1);
        console.log(newGreeting);
        greetingContentRef.innerHTML = newGreeting;
    }
}