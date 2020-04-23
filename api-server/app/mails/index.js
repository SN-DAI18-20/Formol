const sendgrid = require('@sendgrid/mail');

const log = require('../server').log;

const appConfig = require('../../config/server');
const templates = require('./templates');

const globalEmail = appConfig.email.globalEmail;
const sendGridApiKey = appConfig.email.apikey;



function fillTemplate(template, data) {
    if(!Object.keys(templates).includes(template)) {
        throw new Error(`Template '${template}' not exists.`);
    }

    let renderedSubject = templates[template].title;
    let renderedTextBody = templates[template].text;
    let renderedHTMLBody = templates[template].body;

    for(key in data) {
        renderedSubject = renderedSubject.replace(`$${key}`, data[key]);
        renderedTextBody = renderedTextBody.replace(`$${key}`, data[key]);

        if(renderedHTMLBody != null) {
            renderedHTMLBody = renderedHTMLBody.replace(`$${key}`, data[key]);
        }
    }

    return {
        subject: renderedSubject,
        text: renderedTextBody,
        html: renderedHTMLBody,
    };
}

async function sendMail(to, template, data) {
    sendgrid.setApiKey(sendGridApiKey);

    try {
        const renderedTemplate = fillTemplate(template, data);

        await sendgrid.send({
            to: to,
            from: globalEmail,
            subject: renderedTemplate.subject,
            text: renderedTemplate.text,
            html: renderedTemplate.html,
        });
    } catch (err) {
        log.error(`Unable to send mail to '${to}'. Traceback:`, err);
        return Promise.reject();
    }
}

module.exports = {
    fillTemplate,
    sendMail,
};
