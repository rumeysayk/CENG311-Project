document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const therapistSelect = document.getElementById("therapist");
    const form = document.getElementById("booking-form");
    const successMessage = document.getElementById("success-message");

    // 📌 Geçmiş tarihler seçilemez
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    // 📌 Her terapistin uygun olduğu saatler
    const therapistSchedules = {
        "dr_emily": ["09:00 AM - 10:30 AM", "02:00 PM - 03:30 PM"],
        "james_oconnor": ["10:00 AM - 11:30 AM", "04:00 PM - 05:30 PM"],
        "dr_sophia": ["11:00 AM - 12:30 PM", "06:00 PM - 07:30 PM"]
    };

    // 📌 Terapist seçildiğinde uygun saatleri listele
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

    // 📌 Form Gönderildiğinde Başarı Mesajı Göster
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        form.style.display = "none";
        successMessage.classList.remove("hidden");
    });
});
