import { useState } from "react";

// custom hook as it starts with use
export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  // to keep track if input loses the focus
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  // to set the values changed by the user by passing the identifier i.e. (email,password)
  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    // resettig the edit state, when there is any keystoke by the user
    setDidEdit(false);
  }

  // to change the state and keep track which field loses focus
  function handleInputBlur() {
    // this will be fired when input  loses its focus
    setDidEdit(true);
  }

  // exposing these custom hooks value
  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
