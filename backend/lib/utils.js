import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevents client-side JS from reading the cookie: XSS protection or cross-site scripting
    secure: process.env.NODE_ENV === "production", // Set secure flag in production
    sameSite: "strict", // CSRF protection
  });

  return token;
};

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     httpOnly: true,
//     sercure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   return token;
// };
