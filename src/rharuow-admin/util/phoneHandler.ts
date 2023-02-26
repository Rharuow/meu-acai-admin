export const phoneFormatter = (phone: string) => {
  const prefixPhone = phone
    .split(" ")[1]
    .split("")
    .filter((l, index) => index > 1);

  return prefixPhone.concat(phone.split(" ")[2]).join("");
};
