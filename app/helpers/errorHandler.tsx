export const ErrorHandler = (error: any): string => {
  if (error instanceof Error) {
    return error.message; // Return the error message
  } else if (typeof error === "string") {
    return error; // Return the error string
  } else {
    return "An unknown error occurred"; // Fallback message for other types of errors
  }
};
