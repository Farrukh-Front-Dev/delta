/**
 * Sanitize string input to prevent XSS attacks
 * Removes potentially dangerous characters and HTML tags
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
};

/**
 * Sanitize email input
 * @param email - Email to sanitize
 * @returns Sanitized email in lowercase
 */
export const sanitizeEmail = (email: string): string => {
  return sanitizeString(email).toLowerCase();
};

/**
 * Sanitize object by sanitizing all string values
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]) as any;
    }
  }

  return sanitized;
};
