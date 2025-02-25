/**
 * This function is the inital function, when summary.html is loading and executes the init()-function and furher necessary summary-functions
 */
async function initSummary() {
    await init();
    showTasksNumbers();
    greetingDaytime();
    showUserName()
}

function showTasksNumbers() {
    //...
}

/**
 * This function uses the daytime-hours-number to choose the appropriate greeting according to the time of the day and displays it
 */
function greetingDaytime() {
    const greetingContentRef = document.getElementById("greetingDaytime");
    let daytime = new Date().getHours();
    let greeting = (daytime >= 3 && daytime <= 12)? "Good morning,":
                   ((daytime >= 13 && daytime <= 18)? "Good afternoon," : "Good evening,");
    greetingContentRef.innerHTML = greeting;
}

/**
 * This function displays the name of the current user and redirects to the guestGreeting()-function if the user used the guest-login
 */
function showUserName() {
    let userNameContentRef = document.getElementById("userName");
    userNameContentRef.innerHTML = "";
    userNameContentRef.innerHTML = users[currentUser].name;
    if (userNameContentRef.innerHTML == " ") {
        guestGreeting();
    }
}

/**
 * This function removes the comma from the the current Greeting
 */
function guestGreeting() {
    const greetingContentRef = document.getElementById("greetingDaytime");
    let originallyGreeting = greetingContentRef.innerHTML;
    let newGreeting = originallyGreeting.slice(0, originallyGreeting.length - 1);
    greetingContentRef.innerHTML = newGreeting;
}

/**
 * This function redirects the user to the board-page
 */
function redirectionToBoard() {
    window.location.href = "board.html";
}