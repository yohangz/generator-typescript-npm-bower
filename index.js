'use strict';

module.exports = {
  app: require.resolve('./generators/app'),
  bowerConfig: require.resolve('./generators/bower-conf'),
  editorConfig: require.resolve('./generators/editor-conf'),
  git: require.resolve('./generators/git'),
  karmaConfig: require.resolve('./generators/karma-conf'),
  lint: require.resolve('./generators/lint'),
  npmConfig: require.resolve('./generators/npm-conf'),
  typescriptConfig: require.resolve('./generators/typescript-conf')
};
