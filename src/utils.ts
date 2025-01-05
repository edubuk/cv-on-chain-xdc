export const convertDateToString = (value: any): string | null => {
  if (value?.$d) {
    const stringDate = value.$d.toString();
    const splitArray = stringDate.split(" ");
    const modifiedDate = splitArray.slice(1, 4);
    const stringDate1 = modifiedDate.join(" ");
    return stringDate1;
  }
  return null;
};
