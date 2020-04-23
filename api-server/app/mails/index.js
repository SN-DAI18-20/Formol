const appConfig = require('../../config/server');
const globalEmail = appConfig.email.globalEmail;
const sendGridApiKey = appConfig.email.apikey;

await function fillTemplate(template, data) {

}

await function sendMail(to, template, data) {

    const sgMail = require('@sendgrid/mail');
    sgMail.setApi.apikey(process.env.sendGridApiKey);
    const message = {
        To : 'Test@test.com',
        From : 'Test&test.com',
        Subject : "Test Mail",
        Text : "Test test truc, blabla, Non ?",
        HTML : <strong> Questionnaire en ligne OK. </strong>
    }
    sgMail
        .sendMail(message)
        .then (() => {}, console.error);
        (async() => {
            try{
                await sgMail.sendMail(message);
            }catch (erreur){
                console.error(erreur.toString());
            }
        })
}

module.exports = {
    fillTemplate,
    sendMail
}
