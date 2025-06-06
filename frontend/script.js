document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('username')

    /*fetch("usr/?username=" + id +"/tasks")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.forEach((task)=>{
                createTask(task)
            })

        })
        .catch(console.error)

    //fetch
    //Foreach : createElement*/

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

function createTask(description) {
    const ul = document.querySelector("ul");

    let text

    if(task){
        text = description
    }else {
        const input = document.getElementById("input");
        text = input.value.trim();
        input.value = "";
    }

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

