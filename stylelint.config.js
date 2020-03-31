module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/stylelint')],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
            },
        ],
    },
};
