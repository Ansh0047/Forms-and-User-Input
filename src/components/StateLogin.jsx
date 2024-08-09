import { useState } from "react";
import Input from "./Input";
import { hasMinLength, isNotEmpty, isEmail } from "../util/validation.js";

// handling user inputs using the useState
export default function StateLogin() {
  // const [enteredEmail,setEnteredEmail] = useState('');
  // const [enterdPassword,setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // to keep track if input loses the focus
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // for validating an email
  // const emailIsInVaild = didEdit.email && !enteredValues.email.includes("@");
  // const passwordIsInVaild = didEdit.password && enteredValues.password.trim().length < 6;

  // same above logic but by outsourcing the code
  const emailIsInVaild =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  
  const passwordIsInVaild = didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault(); // to prevent the browsers default submission
    console.log("Submit button clicked");
    console.log(enteredValues);

    // resetting the form manually
    setEnteredValues({
      email: "",
      password: "",
    });

    // and to keep the input filled check that these are not blurred
    setDidEdit({
      email: false,
      password: false,
    });
  }

  /*
  instead of these separate handle change we now can use the generic handleChange
  function handleEmailChange(event) {
    setEnteredEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value);
  }
  */

  // to set the values changed by the user by passing the identifier i.e. (email,password)
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    // resettig the edit state, when there is any keystoke by the user
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  // to change the state and keep track which field loses focus
  function handleInputBlur(identifier) {
    // this will be fired when input  loses its focus
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
          error={emailIsInVaild && "Please enter a valid email!"}
        />

        {/* outsourcing this code to get the reuseable component */}
        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInVaild && <p>Please enter a valid email adress.</p>}
          </div>
        </div> */}
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          onBlur={() => handleInputBlur("password")}
          value={enteredValues.password}
          error={passwordIsInVaild && "Please enter a valid password!"}
        />
        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div> */}
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
