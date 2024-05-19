interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || regex.test(email)) {
    return { isValid: true, errorMessage: '' };
  } else {
    return { isValid: false, errorMessage: 'Enter the correct email address' };
  }
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, errorMessage: "The name cannot be empty" };
  } else if (name.length > 30) {
    return { isValid: false, errorMessage: "The maximum name length is 30 characters" };
  } else {
    return { isValid: true, errorMessage: "" };
  }
};

export const validateAge = (birthDate: string): ValidationResult => {
  const [year, month, day] = birthDate.split('-').map(Number);
  const birth = new Date(year, month - 1, day); // Місяці в JavaScript рахуються від 0
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const isBirthdayPassedThisYear = today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

  if (age > 18 || (age === 18 && isBirthdayPassedThisYear)) {
    return { isValid: true, errorMessage: "" };
  } else {
    return { isValid: false, errorMessage: "You must be at least 18 years old" };
  }
};