class ApiError extends Error {
  constructor(status, message = "something went wrong", errors = [], stack) {
    super(message);

    this.status = status;
    this.message = message;
    this.success = false;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
