// This script dynamically updates available time slots based on the selected therapist 
// and shows a success message when the booking form is submitted.

document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const therapistSelect = document.getElementById("therapist");
    const form = document.getElementById("booking-form");
    const successMessage = document.getElementById("success-message");

    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    const therapistSchedules = {
        "dr_emily": ["09:00 AM - 10:30 AM", "02:00 PM - 03:30 PM"],
        "james_oconnor": ["10:00 AM - 11:30 AM", "04:00 PM - 05:30 PM"],
        "dr_sophia": ["11:00 AM - 12:30 PM", "06:00 PM - 07:30 PM"]
    };

    therapistSelect.addEventListener("change", function () {
        const selectedTherapist = therapistSelect.value;

        if (therapistSchedules[selectedTherapist]) {
            timeSelect.innerHTML = "";
            therapistSchedules[selectedTherapist].forEach(time => {
                const option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
            timeSelect.disabled = false;
        } else {
            timeSelect.innerHTML = `<option value="" disabled selected>No available slots</option>`;
            timeSelect.disabled = true;
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        form.style.display = "none";
        successMessage.classList.remove("hidden");
    });
});
