function login() {
    const name = document.getElementById("username").value.trim();
    const password = btoa(document.getElementById("password").value.trim());

    fetch("/login?name=" + name + "&password=" + password)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.id) {
            } else {
                console.error("Utilisateur non trouvé");
            }
        })
        .catch(console.error);
}