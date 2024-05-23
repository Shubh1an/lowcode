import React, { useEffect, useState } from 'react';
const Validation = ({ regex, defaultValue }) => {
  const [regexpermision, setregexpermiossion] = useState({});

  const testLetterRegex = (value) => {
    console.log('regexpermision', regexpermision);
    return (
      <></>
      // <div>{regexerr}</div>
    );
  };

  const alphabetOnly = /^[a-zA-Z ]*$/;
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;
  const numberOnly = /^[0-9\b]+$/;
  const mobileNumber = /^[0-9]{10}$/;
  const positiveNumber =
    /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

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
