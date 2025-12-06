document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    // Create success message popup
    const successPopup = document.createElement("div");
    successPopup.className = "success-popup";
    successPopup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: none;
        z-index: 9999;
    `;
    document.body.appendChild(successPopup);

    // Show popup function
    const showPopup = (message) => {
        successPopup.innerText = message;
        successPopup.style.display = "block";
        setTimeout(() => {
            successPopup.style.display = "none";
        }, 3000);
    };

    const validateField = (input) => {
        if (!input.value.trim()) {
            input.classList.add("error");
            return false;
        } else {
            input.classList.remove("error");
            return true;
        }
    };

    // Validate on typing
    document.querySelectorAll("#contactForm input, #contactForm select, #contactForm textarea")
        .forEach(field => {
            field.addEventListener("input", () => validateField(field));
        });

    // On form submit
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        let isValid = true;
        const allFields = form.querySelectorAll("input, select, textarea");

        allFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showPopup("Please fill all required fields correctly.");
            return;
        }

        // Auto JSON submit to Web3Forms
        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    showPopup("Appointment booked successfully!");
                    form.reset();
                } else {
                    showPopup("Something went wrong, try again.");
                }
            })
            .catch(() => {
                showPopup("Failed to submit. Check your internet.");
            });
    });

});