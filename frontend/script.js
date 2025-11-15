document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("color", document.getElementById("color").value);
    formData.append("Gender", document.getElementById("Gender").value);
    formData.append("photo", document.getElementById("photo").files[0]);

    const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (res.ok) {
        alert("Registration successful!");
        document.getElementById("registerForm").reset();  // clear form
    } else {
        alert("Error: " + data.message);
    }
});
