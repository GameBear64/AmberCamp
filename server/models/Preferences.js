const mongoose = require('mongoose');
const { Theme } = require('../helpers/enums.js');

const preferencesSchema = new mongoose.Schema({
  theme: {
    type: String,
    enum: Object.values(Theme),
    default: Theme.Light,
  },
  accent: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: '',
  },

  // devices: [{ // for the future
  //   tag: String,
  //   device: Object, // fingerprint object
  // }]
});

exports.PreferencesModel = mongoose.model('Preferences', preferencesSchema);
