const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const user = localStorage.setItem('user', '12900788');

const session_id = localStorage.setItem('session_id', 'a8c76aa9652dfc913622347e6879d68bd7a45991');
