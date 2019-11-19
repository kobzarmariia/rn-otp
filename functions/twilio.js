const twilio = require("twilio");

const accountSid = "ACdfb9885a4db3feaf841f6194d206afaa";
const authToken = "e857e6110220362c3970324b6b9bf8c0";

module.exports = new twilio.Twilio(accountSid, authToken);
