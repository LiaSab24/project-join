// Diese Funktion in sidebar.js speichern
document.addEventListener('DOMContentLoaded', function() {
    // Prüfen, ob die Sidebar bereits geladen wurde
    const sidebarCheck = setInterval(() => {
        if (document.querySelectorAll('.menu-link').length > 0) {
            clearInterval(sidebarCheck);
            initializeSidebar();
        }
    }, 100);
});

function initializeSidebar() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(1, menuLinks);                                     // <------------------------1-----------------------
    console.log(2, navLinks);                                    // <----------------------2-------------------------           
    
    
    // 1. Tastaturnavigation hinzufügen
    menuLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            // Enter oder Space drücken aktiviert den Link
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            // Enter oder Space drücken aktiviert den Link
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 2. Aktiven Link markieren - verbesserte Version
    setActiveMenuLink();
}

// ---- setzt aktiven Link mit bgc -------------------------------------------
function setActiveMenuLink() {
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Aktuelle Seiten-URL erhalten
    const currentPath = window.location.pathname;
    const currentHref = window.location.href;
    console.log(3, currentPath);                          // <------------------------3-----------------------
    
    // Alle aktiven Klassen zuerst entfernen
    menuLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    console.log(4, menuLinks);                       // <------------------------------4-----------------
    
    
    // Durch alle Links iterieren und den aktiven finden
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const summaryID = document.getElementById('summary');
        const addTaskID = document.getElementById('add_task');
        console.log(5, linkHref);              // <-----------------------------5-----------------
        console.log(6);              // <-----------------------6------------------------
        // Verschiedene Vergleichsmethoden für robuste Erkennung
        if (
            // Exakter Pfad-Vergleich
            currentPath === linkHref ||  
            // Pfad enthält den Link
            currentPath.includes(linkHref) && linkHref !== './' && linkHref !== '#' ||
            // URL enthält den Link (für vollständige URLs)
            currentHref.includes(linkHref) && linkHref !== './' && linkHref !== '#' ||
            // Startseiten-Spezialfall
            ((currentPath === '/' || currentPath.endsWith('/index.html')) && 
             (linkHref === './index.html' || linkHref === 'index.html' || linkHref === './'))
        ) {
            // Aktiven Status setzen
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            console.log(3);                     // <-----------------------------------------------
        }
    });
}
