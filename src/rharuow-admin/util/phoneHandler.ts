export const phoneFormatter = (phone: string) => {
  const prefixPhone = phone
    .split("")
    .filter(
      (l, index) =>
        l !== "(" && l !== ")" && l !== "-" && l !== "+" && index > 4
    )
    .join("");

  console.log(prefixPhone);

  return prefixPhone;
};
