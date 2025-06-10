document.addEventListener('DOMContentLoaded', async () => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')

    await fetch("/users/" + id + "/tasks")
    .then(response => {
        return response.json();
      })
    .then((data) => {
        data.forEach((task) => {
            createTask(task.id, task.description, task.status)
        });
    })
    .catch(console.error);

    const closeButtons = document.getElementsByClassName("close");

    Array.from(closeButtons).forEach(button => {
        button.onclick = function () {
            onDeleteClick(button.dataset.taskId);
        };
    });

    const checkButtons = document.getElementsByClassName("checkbox");
    Array.from(checkButtons).forEach(button => {
        button.onclick = function () {
            const status = button.classList.contains("checked") ? "completed" : "to complete";
            onValidateClick(button.dataset.taskId, status);
        };
    });
    const list = document.querySelector("ul");

    list.addEventListener("click", event => {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    });
});

function onAddClick() {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    const description = document.getElementById("input").value;

    fetch("/users/" + id + "/tasks/create?description=" + description, {
        method: "POST",})
        .then((response) => response.json())
        .then((data) => {
            window.location.reload();
        })
        .catch(console.error);
}

function onDeleteClick(taskId) {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
        fetch(`/users/${id}/tasks/${taskId}/delete`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
            .catch(console.error);
}

function onValidateClick(id_task, status) {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    fetch(`/users/${id}/tasks/${id_task}/status/`, {
        method: 'PATCH'
    })
        .then(response => response.json())
        .then(data => {
            //window.location.reload();
        })
        .catch(console.error);
}

function createTask(id, description, status) {
    const ul = document.querySelector("ul");

    let text

    if (id) {
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
    closeBtn.dataset.taskId = id;

    const checkBtn = clone.querySelector(".checkbox");
    checkBtn.dataset.taskId = id;   
    if(status === "completed") {
        checkBtn.classList.add("checked");
        checkBtn.closest('label').querySelector('.hidden_real_check').checked = true;

    }

    ul.appendChild(clone);
}

