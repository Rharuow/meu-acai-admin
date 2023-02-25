export const splitString = (name: string, n: number): string => {
  if (name.split(" ").length > n)
    return name
      .split(" ")
      .map((word, index, self) => {
        if (word === "de" || word === "da" || word === "do")
          return `${word} ${self[index + 1]}`;
        return self[index - 1] === "de" ||
          self[index - 1] === "da" ||
          self[index - 1] === "do"
          ? null
          : word;
      })
      .filter((word, index) => index < n)
      .join(" ");
  return name;
};
