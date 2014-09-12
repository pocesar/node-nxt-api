import NXT = require('../nxt-api');

// start your NRS client first

var API = new NXT.API('http://127.0.0.1:6876');

API.getNextBlockGenerators().then((answer: Object) => {
    console.log(answer);
});

API.rsConvert({account: 'x'}).then((answer: Object) => {
    // should error
}, (error: NXT.IError) => {
    console.log(error);
});
