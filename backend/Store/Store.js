const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const user = localStorage.setItem('user', '12900788');

const session_id = localStorage.setItem('session_id', '0b10b0a04cd1c9ac1b331ee625f208e1bcfcec90');
