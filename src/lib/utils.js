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

export const getInitials = (firstValue, secondValue) => {
  const firstInitial = firstValue.slice(0, 1);
  const secondInitial = secondValue.slice(0, 1);
  return `${firstInitial} ${secondInitial}`;
};

export const formatNaira = (amount) => {
  const number = Number(amount);
  if (isNaN(number)) return amount;
  return `₦${number.toLocaleString('en-US')}`;
};

export const categories = {
  "Goods": ["Books", "Clothing", "Jewellery", "Snacks"],
  "Services": ["Furniture", "Electronics"],
}

export const calculateDaysRemaining = (createdAtStr, durationDays) => {
    const createdDate = new Date(createdAtStr);
    
    // 1. Calculate the expiration timestamp (Created Date + Duration in Days)
    const expirationDate = new Date(createdDate.getTime());
    expirationDate.setDate(expirationDate.getDate() + Number(durationDays));
    
    // 2. Get the current time right now
    const now = new Date();
    
    // 3. Find the difference in milliseconds
    const differenceInMs = expirationDate - now;
    
    // 4. Convert milliseconds to full days (rounded down)
    const daysRemaining = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    
    // 5. Return 0 if expired, otherwise return the days remaining
    return daysRemaining < 0 ? 0 : daysRemaining;
};

