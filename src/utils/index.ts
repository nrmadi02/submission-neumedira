export const LetterCapitalize = (text: string) => {
  const arr: string[] = text.split(" ");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != undefined) {
      arr[i] = (arr[i] || "").charAt(0).toUpperCase() + (arr[i] || "").slice(1);
    }
  }

  return arr.join(" ")
};
