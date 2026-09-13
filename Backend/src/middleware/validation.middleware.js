import { body, validationResult } from "express-validator";

export async function validateResult(req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  next();
}

export const validateUser = [
  body("username")
    .isString()
    .withMessage("Username must be String")
    .isLength({ min: 3, max: 30 }),

  body("email").isString().withMessage("Email must be String"),

  body("password")
    .isString()
    .withMessage("Password must be atleast 6 Character Long"),
];
