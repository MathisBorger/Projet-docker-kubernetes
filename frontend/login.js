function login() {
    const name = document.getElementById("username").value;
    const password = btoa(document.getElementById("password").value);

    console.log(name, password)
    fetch("/login?name=" + name + "&password=" + password)
        .then(response => {
            return response.json();
          })
        .then((data) => {
            console.log(data);
            if (data.id) {
                window.location.href = "index.html?id=" + data.id;
            } else {
                console.error("Utilisateur non trouvé");
            }
        })
        .catch(console.error);
}