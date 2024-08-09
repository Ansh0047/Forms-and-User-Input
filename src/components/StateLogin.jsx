import { useState } from "react";

// handling user inputs using the useState
export default function StateLogin() {
  // const [enteredEmail,setEnteredEmail] = useState('');
  // const [enterdPassword,setEnteredPassword] = useState('');

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault(); // to prevent the browsers default submission
    console.log("Submit button clicked");
    console.log(enteredValues);
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
        </div>

        <div className="control no-margin">
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
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
