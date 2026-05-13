// DARK MODE
const darkBtn = document.getElementById("darkBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}


// CONTACT FORM
const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill all fields");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            const result = await response.text();

            alert(result);

            form.reset();

            getData();

        } catch (error) {

            console.log(error);

        }

    });

}


// GET DATA
async function getData() {

    try {

        const response = await fetch("http://localhost:5000/contact");

        const data = await response.json();

        const output = document.getElementById("output");

        output.innerHTML = "";

        data.forEach((item) => {

            output.innerHTML += `
                <div class="message-card">
                    <h3>${item.name}</h3>
                    <p>${item.email}</p>
                    <p>${item.message}</p>
                    <hr>
                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

getData();