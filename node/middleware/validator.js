import { check, validationResult } from 'express-validator';


function checkValidationResult(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: result.array() });
};

const validateTask = check('name')
  .trim()
  .notEmpty().withMessage('Task is required');

const validateTaskStatus = check('completed')
  .trim()
  .isBoolean()
  .withMessage('Task status must be a boolean value');


  export const validateInput = [
    validateTask,
    validateTaskStatus,
    checkValidationResult
  ]
  export const validateInputPut = [
    validateTask.optional(),
    validateTaskStatus.optional(),
    checkValidationResult
  ]