import Toastify from 'toastify-js';

export function showNotification(message: string, theme = 'dark') {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'bottom',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
