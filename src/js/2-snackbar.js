
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();


  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

 
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });


  promise
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled after ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected after ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });


  form.reset();
});

