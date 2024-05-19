interface FormValidation {
    value: string;
    regex: RegExp;
    errorMessage: string;
  }
  
  export const inputValidations: Record<string, FormValidation> = {
    url: {
      value: '',
      regex: /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi,
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
  