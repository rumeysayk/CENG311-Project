// jQuery-based script that uses jQuery UI Datepicker to highlight holidays, dynamically loads time slots and locations,
// and validates form fields before showing a success message.

$(function () {
    const $date = $("#date");
    const $time = $("#time");
    const $city = $("#city");
    const $location = $("#location");
    const $form = $("#booking-form");
    const $successMessage = $("#success-message");

    // Time slots available by day of the week
    const timeSlots = {
        "Monday": ["09:00 AM - 11:00 AM", "01:00 PM - 03:00 PM"],
        "Tuesday": ["10:00 AM - 12:00 PM", "02:00 PM - 04:00 PM"],
        "Wednesday": ["08:30 AM - 10:30 AM", "03:00 PM - 05:00 PM"],
        "Thursday": ["09:00 AM - 11:00 AM", "04:00 PM - 06:00 PM"],
        "Friday": ["10:30 AM - 12:30 PM", "05:00 PM - 07:00 PM"]
    };

    // Locations available based on selected city
    const locationsByCity = {
        "istanbul": ["Taksim Center", "Kadıköy Therapy Hub", "Besiktas Mental Health"],
        "ankara": ["Kızılay Counseling", "Çankaya Wellness Center"],
        "izmir": ["Alsancak Therapy House", "Bornova Healing Center"]
    };

    // List of public holidays (used for special styling in datepicker)
    const holidays = ["2025-04-23", "2025-05-01", "2025-05-19", "2025-07-20"];

    // Initialize the jQuery UI Datepicker with holiday highlighting
    $date.datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0, // Disable past dates
        beforeShowDay: function (date) {
            const formatted = $.datepicker.formatDate("yy-mm-dd", date);
            if (holidays.includes(formatted)) {
                return [true, "holiday", "Holiday"];
            }
            return [true, "", ""];
        },
        onSelect: function (selectedDateStr) {
            const selectedDate = new Date(selectedDateStr);
            const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

            // Load time slots based on the selected day
            if (timeSlots[dayName]) {
                $time.empty().append('<option disabled selected>Choose a time slot</option>');
                timeSlots[dayName].forEach(time => {
                    $time.append(`<option value="${time}">${time}</option>`);
                });
                $time.prop("disabled", false);
            } else {
                $time.html('<option value="" disabled selected>No available slots</option>');
                $time.prop("disabled", true);
            }
        }
    });

    // Load location options based on selected city
    $city.on("change", function () {
        const selectedCity = $(this).val();
        if (locationsByCity[selectedCity]) {
            $location.empty().append('<option disabled selected>Choose a location</option>');
            locationsByCity[selectedCity].forEach(loc => {
                $location.append(`<option value="${loc}">${loc}</option>`);
            });
            $location.prop("disabled", false);
        } else {
            $location.html('<option value="" disabled selected>No available locations</option>');
            $location.prop("disabled", true);
        }
    });

    // Show success message and hide form on manual submit
    $form.on("submit", function (e) {
        e.preventDefault();
        $form.hide();
        $successMessage.removeClass("hidden");
    });

    // jQuery Validation for form fields
    $form.validate({
        ignore: [], // Ensures hidden fields are not ignored if needed
        rules: {
            name: "required",
            surname: "required",
            email: {
                required: true,
                email: true
            },
            phone: "required",
            city: "required",
            location: "required",
            "therapy-type": "required",
            "group-type": "required",
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
            city: "Please select a city",
            location: "Please choose a location",
            "therapy-type": "Please select a therapy type",
            "group-type": "Please select a group type",
            date: "Please pick a date",
            time: "Please select a time slot"
        },
        submitHandler: function () {
            $form.hide();
            $successMessage.removeClass("hidden");
        }
    });
});

/*
var cities = [
    "Ankara",
    "İstanbul",
    "İzmir"
];
// Autocomplete match by first letter
$("#city").autocomplete({
    source: function (request, response) {
        var results = $.grep(cities, function (city) {
            return city.toLowerCase().indexOf(request.term.toLowerCase()) === 0;
        });
        response(results);
    },
    minLength: 1
});
*/
