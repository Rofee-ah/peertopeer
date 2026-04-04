import validator from "validator";

export const validateText = (text, fieldName) => {
  if (validator.isEmpty(text.toString())) {
    return `${fieldName || ""} is required`;
  }
  return null;
};

export const validateEmail = (text, fieldName) => {
  if (validator.isEmpty(text.toString())) {
    return `${fieldName || ""} is required`;
  }
  if (!text.includes("@stu.ui.edu.ng") && !text.includes("@dlc.ui.edu.ng")) {
    console.log(text);
    return "Email must include @dlc.ui.edu.ng or @stu.ui.edu.ng";
  }
  return null;
};

export const validatePassword = (text, fieldName) => {
  if (!validator.isLength(text, { min: 8 })) {
    return `${fieldName} is invalid`;
  }
  return null;
};

export const validateConfirmPassword = (
  password,
  confirmPassword,
  fieldName,
) => {
  if (!password && !confirmPassword) return `${fieldName} is invalid`;
  if (password !== confirmPassword) {
    return `${fieldName} does not match`;
  }
  return null;
};
