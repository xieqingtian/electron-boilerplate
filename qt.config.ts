// eslint-disable-next-line spaced-comment
/// <reference path="../qingtian-cli/typings/global.d.ts" />

const projectConfig: NodeJS.Global['projectConfig'] = {
    electron: {},
    sassResources: ['src/renderer/sass/vars.scss', 'src/renderer/sass/mixins.scss'],
};

module.exports = projectConfig;
