const path = require(`path`);
const alias = require(`./src/config/aliases`);
const sassResourcesLoader = require('craco-sass-resources-loader');
const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
    Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

module.exports = {
    webpack: {
        alias: resolvedAliases
    },
    plugins: [
        {
            plugin: sassResourcesLoader,
            options: {
                resources: [
                    'src/styles/_variables.scss',
                    'src/styles/utilities/_functions.scss',
                    'src/styles/utilities/_mixins.scss'
                ]
            }
        }
    ]
};
