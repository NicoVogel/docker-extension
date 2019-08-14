module.exports = {
    "parser": '@typescript-eslint/parser',
    "plugins": ['@typescript-eslint'],
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ['plugin:@typescript-eslint/recommended'],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};