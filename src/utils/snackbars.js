import Snackbar from 'awesome-snackbar';

const snackMessageTemplate = (message, icon) =>
  `
    <div style="display: flex; justify-content: space-between; gap: 1em; margin: 0.2em 0; align-items: center;">
      <span class="material-symbols-rounded">${icon}</span>
      <p>${message}</p>
    </div>
  `;

const snackPulseTemplate = (from, to) =>
  `
  <style>
    @keyframes pulse {
      0% {
        border-color: ${from};
      }
      50% {
        border-color: ${to};
      }
      100% {
        border-color: ${from};
      }
    }
  </style>
`;

const snackDefaultSettings = (color, { double, animated } = {}) => ({
  position: 'bottom-center',
  // timeout: 0, // Dev debug tools
  // actionText: 'Hide',
  style: {
    container: [
      ['border-left', `5px solid ${color}`],
      double ? ['border-right', `5px solid ${color}`] : [],
      animated ? ['animation', 'pulse 2s infinite'] : [],
    ],
    message: [['line-height', '1em']],
  },
});

export const fatalErrorSnackBar = (message) => {
  new Snackbar(
    snackPulseTemplate('#ffd400', '#DC343B') + snackMessageTemplate(message, 'gpp_bad'),
    snackDefaultSettings('#DC343B', { double: true, animated: true })
  );
};

export const errorSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'error'), snackDefaultSettings('#DC343B'));
};

export const impossibleSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'flag'), snackDefaultSettings('#775496'));
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
