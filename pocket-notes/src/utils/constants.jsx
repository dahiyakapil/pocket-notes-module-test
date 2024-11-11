export const colors = [
  "rgba(179, 139, 250, 1)",
  "rgba(255, 121, 242, 1)",
  "rgba(67, 230, 252, 1)",
  "rgba(241, 149, 118, 1)",
  "rgba(0, 71, 255, 1)",
  "rgba(102, 145, 255, 1)",
];
export const generateNameInitials = (name) => {
  if (name) {
    const words = name.split(" ");
    let nameInitials = "";

    if (words.length > 2) {
      for (let i = 0; i < 2; i++) {
        nameInitials += words[i][0].toUpperCase();
      }
    } else {
      for (let i = 0; i < words.length; i++) {
        nameInitials += words[i][0].toUpperCase();
      }
    }

    return nameInitials;
  }
};
