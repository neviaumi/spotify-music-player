module.exports = {
  extends: ['@busybox'],
  rules: {
    'new-cap': 'off',
    // TODO: move to busybox
    'react/react-in-jsx-scope': 'off',
  },
};
