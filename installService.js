var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'CookClassmaker',
    description: 'Running Node JS as a backgoud service.',
    script: process.env.NODE_JS_WORK_DIR + 'app.js',
    env: {
        name: "NODE_ENV",
        value: "production"
    }
});

console.log(svc.script);

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled', function () {
    console.log('This service is already installed.');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start', function () {
    console.log(svc.name + ' started!');
});

// Install the script as a service.
svc.install();