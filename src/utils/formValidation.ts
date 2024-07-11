interface FormValidation {
    value: string;
    regex: RegExp;
    errorMessage: string;
  }
  
  export const inputValidations: Record<string, FormValidation> = {
    url: {
      value: '',
     regex: /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/,
      errorMessage: 'Invalid URL format',
    },
    price: {
      value: '',
      regex: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Invalid price format',
    },
    count: {
      value: '',
      regex: /^[1-9]\d*$/,
      errorMessage: 'Count must be a positive number',
    },
    size: {
      value: '',
      regex: /^[\p{L}\s]+$/u,
      errorMessage: 'Invalid size format',
    },
    color: {
      value: '',
      regex: /^[\p{L}\s]+$/u,
      errorMessage: 'Invalid color format',
    },
    description: {
      value: '',
      regex: /.*/,
      errorMessage: '', 
    },
  };
  
  export const validateInput = (name: string, value: string): string => {
    const validation = inputValidations[name];
    if (!validation) return ''; 
  
    if (validation.regex.test(value)) {
      return ''; 
    } else {
      return validation.errorMessage; 
    }
  };
  