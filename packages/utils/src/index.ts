export const getInitials = (name: string) => {
  // Split the full name into words
  const words = name.split(" ");

  // If there's only one word, take the first letter
  if (words.length === 1) {
    return words[0]?.[0]?.toUpperCase() ?? "";
  }

  // Otherwise, take the first letter of each word
  const initials = words.map((word) => word[0]?.toUpperCase()).join("");

  return initials.slice(0, 2);
};
