import Snackbar from 'awesome-snackbar';

const snackMessageTemplate = (message, icon) =>
  `
    <div style="display: flex; justify-content: space-between; gap: 1em; margin: 0.2em 0; align-items: center;">
      <span class="material-symbols-outlined">${icon}</span>
      <p>${message}</p>
    </div>
  `;

const snackDefaultSettings = (color) => ({
  position: 'bottom-center',

  style: {
    container: [['border-left', `5px solid ${color}`]],
    message: [['line-height', '1em']],
  },
});

export const errorSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'error'), snackDefaultSettings('#DC343B'));
};

export const warningSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'warning'), snackDefaultSettings('#ffd400'));
};

export const infoSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'info'), snackDefaultSettings('#007cb7'));
};

export const successSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'check_circle'), snackDefaultSettings('#39a845'));
};
