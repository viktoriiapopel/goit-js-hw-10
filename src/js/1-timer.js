import flatpickr from "flatpickr";

// Імпорт стилів (щоб вигляд календаря був нормальний)
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};


flatpickr("#datetime-picker", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});
