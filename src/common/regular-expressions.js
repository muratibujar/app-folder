export const REGEX_FOR_EMAIL = new RegExp(/^([a-zA-Z0-9._-]+[A-Za-z0-9])?@[A-Za-z0-9-]+\.[A-Za-z.]{2,10}$/);
export const REGEX_FOR_URL = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/);
export const REGEX_FOR_DEFAULT = new RegExp(/^[a-zA-Z0-9\-.,;:_&\s]+$/);
export const REGEX_FOR_NAME = new RegExp(/^[a-zA-Z0-9\-.,;:_\s]+$/);
export const REGEX_FOR_CODE = new RegExp(/^[a-zA-Z0-9_-]+$/);
export const REGEX_FOR_PHONE = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
export const REGEX_FOR_NUMBERS_ONLY = new RegExp(/^[0-9]*$/);

