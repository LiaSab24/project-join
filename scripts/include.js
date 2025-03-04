// include.js
function includeHTML() {
  return new Promise(async (resolve) => {
    const elements = document.querySelectorAll("[w3-include-html]");

    const fetchAndInclude = async (element) => {
      const file = element.getAttribute("w3-include-html");
      if (!file) return;

      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error("Page not found.");
        }
        element.innerHTML = await response.text();
      } catch (error) {
        element.innerHTML = error.message;
      } finally {
        element.removeAttribute("w3-include-html");
      }
    };

    await Promise.all([...elements].map(fetchAndInclude));
    resolve(); // Promise wird aufgelöst, wenn die Einbindung abgeschlossen ist
  });
}