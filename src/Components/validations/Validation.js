import React, { useEffect, useState } from 'react';
const Validation = ({ regex, defaultValue }) => {
  const [regexpermision, setregexpermiossion] = useState({});

  const testLetterRegex = (value) => {
    return (
      <></>
      // <div>{regexerr}</div>
    );
  };

  useEffect(() => {
    switch (regex) {
      case 'alphabetOnly':
        setregexpermiossion(alphabetOnly);
      case 'emailregex':
        setregexpermiossion(emailregex);
      case 'passwordRegex':
        setregexpermiossion(passwordRegex);
      case 'numberOnly':
        setregexpermiossion(numberOnly);
      case 'mobileNumber':
        setregexpermiossion(mobileNumber);
      case 'positiveNumber':
        setregexpermiossion(positiveNumber);
      case 'imageRegex':
        setregexpermiossion(imageRegex);
    }
  }, [regexpermision]);

  return testLetterRegex(defaultValue);
};
export default Validation();

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
