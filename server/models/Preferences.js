const mongoose = require('mongoose');
const { Theme, TimeZone } = require('../helpers/enums.js');

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
  timezone: {
    type: String,
    enum: Object.values(TimeZone),
    default: TimeZone.none,
  },
  // devices: [{ // for the future
  //   tag: String,
  //   device: Object, // fingerprint object
  // }]
});

exports.PreferencesModel = mongoose.model('Preferences', preferencesSchema);
