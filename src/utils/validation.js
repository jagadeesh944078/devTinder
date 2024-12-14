const validator = require("validator");

const validationSignup = (req) => {
  const { firstName, lastName, emailId, passWord } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name not exist");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(passWord)) {
    throw new Error("Please enter the strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = {
  validationSignup,
  validateEditProfileData,
};
