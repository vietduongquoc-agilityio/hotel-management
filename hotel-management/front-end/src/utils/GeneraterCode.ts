export const generateCode = () => {
  // Declare a digits variable
  // which stores all digits
  let digits = "0123456789";
  let code = "";
  let len = digits.length;
  for (let i = 0; i < 4; i++) {
    code += digits[Math.floor(Math.random() * len)];
  }

  return code;
};