/**
 * Convert number to string with thousand separators
 * @param num - Number to convert
 * @returns Formatted string with thousand separators
 */
const convertNumbThousand = (num: number | string): string => {
  const number = typeof num === "string" ? parseFloat(num) : num;
  
  if (isNaN(number)) {
    return "0";
  }

  // Format with thousand separators
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default convertNumbThousand;

