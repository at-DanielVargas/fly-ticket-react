const aliases = (prefix = `src`) => ({
    '@core': `${prefix}/core/index`,
    '@services': `${prefix}/services/index`,
    '@store': `${prefix}/store/index`,
    '@components': `${prefix}/components/index`,
    '@ui': `${prefix}/components/ui/index`,
    '@screens': `${prefix}/screens/index`,
    '@hooks': `${prefix}/hooks/index`,
    '@env': `${prefix}/config/environment`,
    '@assets': `${prefix}/assets`,
    '@utils': `${prefix}/core/utils/index`
});

module.exports = aliases;
