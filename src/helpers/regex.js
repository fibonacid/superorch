export const EMAIL_REGEX = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

//Minimum 8 characters, at least one letter and one number:
export const PASSWORD_REGEX = RegExp(/^[a-zA-Z0-9!\-_@#$%^&*]{4,}$/i);