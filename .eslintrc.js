module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['google', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['prettier', 'simple-import-sort'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};
