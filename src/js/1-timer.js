import flatpickr from "flatpickr";


import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate = null;


flatpickr("#datetime-picker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const today = new Date();
        const selectedDate = selectedDates[0];
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            alert(`"Please choose a date in the future"`);
        }
        else {
            userSelectedDate = selectedDate;
        }
  },
});
