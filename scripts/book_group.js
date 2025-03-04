// This script manages dynamic date, time, and location selection in a booking form and displays a success message upon submission.

document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const citySelect = document.getElementById("city");
    const locationSelect = document.getElementById("location");
    const form = document.getElementById("booking-form");
    const successMessage = document.getElementById("success-message");

    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    const timeSlots = {
        "Monday": ["09:00 AM - 11:00 AM", "01:00 PM - 03:00 PM"],
        "Tuesday": ["10:00 AM - 12:00 PM", "02:00 PM - 04:00 PM"],
        "Wednesday": ["08:30 AM - 10:30 AM", "03:00 PM - 05:00 PM"],
        "Thursday": ["09:00 AM - 11:00 AM", "04:00 PM - 06:00 PM"],
        "Friday": ["10:30 AM - 12:30 PM", "05:00 PM - 07:00 PM"]
    };

    dateInput.addEventListener("change", function () {
        const selectedDate = new Date(dateInput.value);
        const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

        if (timeSlots[dayOfWeek]) {
            timeSelect.innerHTML = ""; 
            timeSlots[dayOfWeek].forEach(time => {
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

    const locationsByCity = {
        "istanbul": ["Taksim Center", "Kadıköy Therapy Hub", "Besiktas Mental Health"],
        "ankara": ["Kızılay Counseling", "Çankaya Wellness Center"],
        "izmir": ["Alsancak Therapy House", "Bornova Healing Center"]
    };

    citySelect.addEventListener("change", function () {
        const selectedCity = citySelect.value;
        
        if (locationsByCity[selectedCity]) {
            locationSelect.innerHTML = ""; 
            locationsByCity[selectedCity].forEach(location => {
                const option = document.createElement("option");
                option.value = location;
                option.textContent = location;
                locationSelect.appendChild(option);
            });

            locationSelect.disabled = false;
        } else {
            locationSelect.innerHTML = `<option value="" disabled selected>No available locations</option>`;
            locationSelect.disabled = true;
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        form.style.display = "none"; 
        successMessage.classList.remove("hidden"); 
    });
});
