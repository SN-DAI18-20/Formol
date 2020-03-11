const appConfig = require('../../config/server');
const globalEmail = appConfig.email.globalEmail;
const sendGridApiKey = appConfig.email.apikey;

await function fillTemplate(template, data) {

}

await function sendMail(to, template, data) {

}

module.exports = {
    fillTemplate,
    sendMail
}