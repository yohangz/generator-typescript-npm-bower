'use strict';

module.exports = {
  app: require.resolve('./generators/app'),
  bowerConfig: require.resolve('./generators/bower-config'),
  editorConfig: require.resolve('./generators/editorconfig'),
  git: require.resolve('./generators/git'),
  lint: require.resolve('./generators/lint'),
  npmConfig: require.resolve('./generators/npm-config'),
  typescriptConfig: require.resolve('./generators/typescript-config')
};
