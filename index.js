'use strict';

module.exports = {
  app: require.resolve('./generators/app'),
  editorconfig: require.resolve('./generators/editorconfig'),
  git: require.resolve('./generators/git'),
  lint: require.resolve('./generators/lint')
};
