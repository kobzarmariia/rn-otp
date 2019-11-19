const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = (request, response) => {
  if (!request.body.phone) {
    return response
      .status(422)
      .send({ error: "You must provide a phone number" });
  }

  const phone = String(request.body.phone);

  return admin
    .auth()
    .getUser(phone)
    .then(() => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      return twilio.messages.create(
        {
          body: "Your code is " + code,
          to: phone,
          from: "+14133849941"
        },
        err => {
          if (err) {
            return response.status(422).send(err);
          }
          admin
            .database()
            .ref("users/" + phone)
            .update({ code: code, codeValid: true }, () => {
              response.send({ success: true });
            });
        }
      );
    })
    .catch(err => {
      response.status(422).send({ error: err });
    });
};
