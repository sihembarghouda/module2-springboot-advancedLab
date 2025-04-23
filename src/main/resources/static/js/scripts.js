// Custom JavaScript for Student Portal

document.addEventListener("DOMContentLoaded", function () {
    // Auto-hide alerts after 5 seconds
    setTimeout(function () {
        const alerts = document.querySelectorAll(".alert");
        alerts.forEach(function (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        });
    }, 5000);

    // Confirm delete actions
    const deleteLinks = document.querySelectorAll('a[href*="/delete/"]');
    deleteLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (!confirm("Are you sure you want to delete this item?")) {
                event.preventDefault();
            }
        });
    });
    // Mode sombre
    document.addEventListener("DOMContentLoaded", function () {
        const darkModeToggle = document.getElementById("darkModeToggle");
        const body = document.body;

        // Vérifier si le mode sombre était activé précédemment
        const isDarkMode = localStorage.getItem("darkMode") === "true";

        // Appliquer le mode sombre si nécessaire
        if (isDarkMode) {
            body.classList.add("dark-mode");
            updateDarkModeIcon(true);
        }

        // Basculer le mode sombre au clic
        darkModeToggle.addEventListener("click", function () {
            const isDarkModeActive = body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", isDarkModeActive);
            updateDarkModeIcon(isDarkModeActive);
        });

        // Mettre à jour l'icône du bouton
        function updateDarkModeIcon(isDarkMode) {
            const icon = darkModeToggle.querySelector("i");
            if (isDarkMode) {
                icon.classList.remove("bi-moon");
                icon.classList.add("bi-sun");
                darkModeToggle.querySelector("i").nextSibling.textContent = " Mode clair";
            } else {
                icon.classList.remove("bi-sun");
                icon.classList.add("bi-moon");
                darkModeToggle.querySelector("i").nextSibling.textContent = " Mode sombre";
            }
        }
    });
    // Validation des formulaires
    document.addEventListener("DOMContentLoaded", function () {
        const studentForm = document.getElementById("studentForm");

        if (studentForm) {
            studentForm.addEventListener("submit", function (event) {
                let valid = true;

                // Valider le nom
                const nameInput = document.getElementById("name");
                if (nameInput.value.trim().length < 2 || nameInput.value.trim().length > 50) {
                    showError(nameInput, "Le nom doit comprendre entre 2 et 50 caractères");
                    valid = false;
                } else {
                    clearError(nameInput);
                }

                // Valider l'âge
                const ageInput = document.getElementById("age");
                const age = parseInt(ageInput.value);
                if (isNaN(age) || age < 16) {
                    showError(ageInput, "L'âge doit être d'au moins 16 ans");
                    valid = false;
                } else {
                    clearError(ageInput);
                }

                // Valider l'email
                const emailInput = document.getElementById("email");
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(emailInput.value)) {
                    showError(emailInput, "Veuillez entrer une adresse email valide");
                    valid = false;
                } else {
                    clearError(emailInput);
                }

                // Valider la filière
                const courseInput = document.getElementById("course");
                if (courseInput.value.trim() === "") {
                    showError(courseInput, "Veuillez sélectionner une filière");
                    valid = false;
                } else {
                    clearError(courseInput);
                }

                // Valider l'ID étudiant
                const studentIdInput = document.getElementById("studentId");
                const studentIdRegex = /^[A-Z0-9]{8}$/;
                if (!studentIdRegex.test(studentIdInput.value)) {
                    showError(studentIdInput, "L'ID étudiant doit comporter 8 caractères (lettres majuscules et chiffres uniquement)");
                    valid = false;
                } else {
                    clearError(studentIdInput);
                }

                if (!valid) {
                    event.preventDefault();
                }
            });
        }

        // Fonctions auxiliaires pour afficher/supprimer les erreurs
        function showError(input, message) {
            const formGroup = input.closest(".mb-3");
            let errorDiv = formGroup.querySelector(".invalid-feedback");

            if (!errorDiv) {
                errorDiv = document.createElement("div");
                errorDiv.className = "invalid-feedback";
                formGroup.appendChild(errorDiv);
            }

            errorDiv.textContent = message;
            errorDiv.style.display = "block";
            input.classList.add("is-invalid");
        }

        function clearError(input) {
            const formGroup = input.closest(".mb-3");
            const errorDiv = formGroup.querySelector(".invalid-feedback");

            if (errorDiv) {
                errorDiv.textContent = "";
                errorDiv.style.display = "none";
            }

            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });
});