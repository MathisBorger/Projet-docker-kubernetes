document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll("li");

    items.forEach(item => {
        const closeBtn = document.createElement("span");
        closeBtn.className = "close";
        closeBtn.textContent = "\u00D7";
        item.appendChild(closeBtn);
    });

    const closeButtons = document.getElementsByClassName("close");

    Array.from(closeButtons).forEach(button => {
        button.onclick = function () {
            const item = this.parentElement;
            item.style.display = "none";
        };
    });

    const list = document.querySelector("ul");

    list.addEventListener("click", event => {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    });
});

function newElement() {
    const ul = document.querySelector("ul");
    const input = document.getElementById("input");
    const text = input.value.trim();

    input.value = "";

    if (!text) return;

    const template = document.querySelector("#task-template");
    const clone = document.importNode(template.content, true);

    const title = clone.querySelector(".element_title");
    title.innerText = text;

    const closeBtn = clone.querySelector(".close");
    closeBtn.addEventListener("click", event => {
        const task = event.target.closest(".task");
        if (task) task.remove();
    });

    ul.appendChild(clone);
}
