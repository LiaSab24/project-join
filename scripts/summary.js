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
    const greetingContentRef = document.getElementById("greetingDaytime");
    let daytime = new Date().getHours();
    let greeting = (daytime >= 3 && daytime <= 12)? "Good morning,":
                   ((daytime >= 13 && daytime <= 18)? "Good afternoon," : "Good evening,");
    greetingContentRef.innerHTML = greeting;
}

function showUserName() {
    let userNameContentRef = document.getElementById("userName");
    userNameContentRef.innerHTML = "";
    userNameContentRef.innerHTML = users[0].name;
    if (userNameContentRef.innerHTML == " ") {
        const greetingContentRef = document.getElementById("greetingDaytime");
        let originallyGreeting = greetingContentRef.innerHTML;
        let newGreeting = originallyGreeting.slice(0, originallyGreeting.length - 1);
        greetingContentRef.innerHTML = newGreeting;
    }
}

function redirectionToBoard() {
    window.location.href = "board.html";
}