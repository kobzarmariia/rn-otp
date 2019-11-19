const admin = require("firebase-admin");

module.exports = function(request, response) {
  //Verify the user provided a phone
  if (!request.body.phone) {
    return response.status(422).sent({ error: "Bad Input" });
  }
  //Format the phone number
  const phone = String(request.body.phone);

  //Create a new user account using that phone number
  return admin
    .auth()
    .createUser({ uid: phone })
    .then(user => response.send(user))
    .catch(err => response.status(422).send({ error: err }));
  //Respond to the user request
};
