import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const startBt = document.querySelector('[data-start]');
startBt.disabled = true;

const dateInput = document.querySelector('#datetime-picker');


const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');



let userSelectedDate = null;


const options = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const today = new Date();
        const selectedDate = selectedDates[0];
        today.setHours(0, 0, 0, 0);
        if (selectedDate <= today) {
            iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
      timeout: 3000,
    });
            startBt.disabled = true;
            userSelectedDate = null;
        }
        else {
            userSelectedDate = selectedDate;
            startBt.disabled = false;
        }
  },
};

flatpickr("#datetime-picker", options);

const timer = {
    intervalId: null,
    initTime: null,

    start() {
        this.initTime = userSelectedDate.getTime();

        if (this.intervalId) return;
      startBt.disabled = true;
      dateInput.disabled = true;
        this.tick();
        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);
    },

    tick() {
        const currentTime = Date.now();
        const ms = this.initTime - currentTime;
        
        if (ms <= 0) {
    clearInterval(this.intervalId);
    this.intervalId = null;

      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';


    iziToast.info({
  title: 'Повідомлення',
  message: '⏰ Час вийшов!',
  position: 'topRight',
  timeout: 3000,
    });
          startBt.disabled = false; 
          dateInput.disabled = false;

    return;

    
  }
   const timeObject = convertMs(ms);
   daysEl.textContent = addLeadingZero(timeObject.days);
   hoursEl.textContent = addLeadingZero(timeObject.hours);
   minutesEl.textContent = addLeadingZero(timeObject.minutes);
   secondsEl.textContent = addLeadingZero(timeObject.seconds);
    }
}

startBt.addEventListener('click', () => {
    timer.start();
} )

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


// function time2Str({ days, hours, minutes, seconds }) {
//   return `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
// }


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}