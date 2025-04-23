// This script uses jQuery UI Datepicker to dynamically update available time slots based on the selected therapist,
// and jQuery Validation to validate the booking form and display a success message upon submission.


document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const therapistSelect = document.getElementById("therapist");
    const form = document.getElementById("booking-form");
    const successMessage = document.getElementById("success-message");

    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today); // Disable past dates

    // Define therapists' available time slots
    const therapistSchedules = {
        "dr_emily": ["09:00 AM - 10:30 AM", "02:00 PM - 03:30 PM"],
        "james_oconnor": ["10:00 AM - 11:30 AM", "04:00 PM - 05:30 PM"],
        "dr_sophia": ["11:00 AM - 12:30 PM", "06:00 PM - 07:30 PM"]
    };

    // Initialize jQuery UI datepicker with custom format and logic
    $("#date").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0,
        onSelect: function () {
            const therapist = $("#therapist").val();
            if (therapist) {
                const availableTimes = therapistSchedules[therapist];
                $("#time").empty(); // Clear old options
                $("#time").append('<option value="" disabled selected>Choose a time slot</option>');
                availableTimes.forEach(time => {
                    $("#time").append(`<option value="${time}">${time}</option>`);
                });
                $("#time").prop("disabled", false); // Enable time selection
            }
        }
    });

    // If therapist is changed after date is selected, re-trigger date logic
    $("#therapist").on("change", function () {
        if ($("#date").val()) {
            $("#date").datepicker("setDate", $("#date").val()); // Re-trigger onSelect
        }
    });

    // Vanilla JS fallback: update time slots on date change
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

    // Trigger time update if therapist is changed after date is already picked
    therapistSelect.addEventListener("change", function () {
        if (dateInput.value !== "") {
            dateInput.dispatchEvent(new Event("change"));
        }
    });

    // Fallback form submission handling (in case jQuery validation fails)
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.style.display = "none";
        successMessage.classList.remove("hidden");
    });
});

// jQuery form validation and submission success handler
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
