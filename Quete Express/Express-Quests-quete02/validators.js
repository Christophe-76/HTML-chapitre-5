// Validation nécessaire pour valider les données
// avec les requêtes POST et PUT
// On utilise des middlewares

// VALIDATION MANUELLE //
// const validateMovie = (req, res, next) => {
//     const { title, director, year, color, duration } = req.body;
//     const errors = [];

//     if (title == null) {
//       errors.push({ field: "title", message: "This field is required" });
//     } else if (title.length >= 255) {
//         errors.push({ field: "title", message: "Shouldcontain less than 255 characters" });
//     }
//     if (director == null) {
//       errors.push({ field: "director", message: "This field is required" });
//     }
//     if (year == null) {
//       errors.push({ field: "year", message: "This field is required" });
//     }
//     if (color == null) {
//       errors.push({ field: "color", message: "This field is required" });
//     }
//     if (duration == null) {
//       errors.push({ field: "duration", message: "This field is required" });
//     }
//     if (errors.length) {
//       res.status(422).json({ validationErrors: errors });
//     } else {
//       next();
//     }
// };

// VALIDATION MANUELLE //
// const validateUser = (req, res, next) => {
//     const { email } = req.body;
//     const errors = [];
//     const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

//     if (firstname == null) {
//         errors.push({ field: "firstname", message:"This field is required" });
//     }
//     if (lastname == null) {
//         errors.push({ field: "lastname", message:"This field is required" });
//     }
//     if (!emailRegex.test(email)) {
//       errors.push({ field: "email", message: "Invalid email" });
//     }
//     if (city == null) {
//         errors.push({ field: "city", message:"This field is required" });
//     }
//     if (language == null) {
//         errors.push({ field: "language", message:"This field is required" });
//     }
//     if (errors.length) {
//         res.status(422).json({ validationErrors: errors });
//       } else {
//         next();
//     }
// };
// module.exports = {
//     validateMovie,
// };

// VALIDATION PAR MODULE TIERS "express-validator" //
// const { body, validationResult } = require('express-validator');

// const validateUser = [
//   body("email").isEmail(),
//   body("firstname").isLength({ max: 255 }),
//   body("lastname").isLength({ max: 255 }),
//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(422).json({ validationErrors: errors.array() });
//     } else {
//       next();
//     }
//   },
// ];