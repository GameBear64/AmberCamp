export const SettingsLinks = Object.freeze({
  general: 'General',
  preferences: 'Preferences',
  security: 'Security',
  dangerzone: 'Danger Zone',
});

export const SettingsLinkIcons = Object.freeze({
  [SettingsLinks.dangerzone]: 'warning',
  [SettingsLinks.security]: 'lock',
  [SettingsLinks.preferences]: 'palette',
  [SettingsLinks.general]: 'person',
});
