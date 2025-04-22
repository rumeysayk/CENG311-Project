// This script dynamically updates available time slots based on the selected therapist 
// and shows a success message when the booking form is submitted with jQuery Validation.

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

    dateInput.addEventListener("change", function () {
        const selectedTherapist = therapistSelect.value;
        const selectedDate = dateInput.value;

        if (selectedTherapist && selectedDate) {
            const availableTimes = therapistSchedules[selectedTherapist];
            if (availableTimes) {
                timeSelect.innerHTML = "";
                availableTimes.forEach(time => {
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
        }
    });

    // If the user changes the therapy or changes the date, it will run again.
    therapistSelect.addEventListener("change", function () {
        if (dateInput.value !== "") {
            dateInput.dispatchEvent(new Event("change"));
        }
    });

    // Normal JS backup when form is submitted (if jQuery does not work)
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.style.display = "none";
        successMessage.classList.remove("hidden");
    });
});

$(document).ready(function () {
    $("#booking-form").validate({
        rules: {
            name: "required",
            surname: "required",
            email: {
                required: true,
                email: true
            },
            phone: "required",
            city: "required",
            therapist: "required",
            date: "required",
            time: "required"
        },
        messages: {
            name: "Please enter your name",
            surname: "Please enter your surname",
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            phone: "Please enter your phone number",
            city: "Please select your city",
            therapist: "Please choose your therapist",
            date: "Please select a date",
            time: "Please select a time slot"
        },
        submitHandler: function (form) {
            $("#booking-form").hide();
            $("#success-message").removeClass("hidden");
        }
    });
});
