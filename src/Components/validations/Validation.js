export const alphabetOnly = /^[a-zA-Z ]*$/;
export const emailregex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;
export const numberOnly = /^[0-9\b]+$/;
export const mobileNumber = /^[0-9]{10}$/;
export const positiveNumber =
  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
export const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/;
export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
