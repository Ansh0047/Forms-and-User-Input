import Input from "./Input";
import { hasMinLength, isNotEmpty, isEmail } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

// handling user inputs using the useState
export default function StateLogin() {
  // const [enteredEmail,setEnteredEmail] = useState('');
  // const [enterdPassword,setEnteredPassword] = useState('');

  /*
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // to keep track if input loses the focus
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  */

  // outsourced the above hooks to custom hooks and it will return an object which we can destructure it
  // custom hook for email
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  // custom hook for password
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  // for validating an email
  // const emailIsInVaild = didEdit.email && !enteredValues.email.includes("@");
  // const passwordIsInVaild = didEdit.password && enteredValues.password.trim().length < 6;

  /*
  // same above logic but by outsourcing the code
  const emailIsInVaild =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);

  const passwordIsInVaild =
    didEdit.password && !hasMinLength(enteredValues.password, 6);
  */

  function handleSubmit(event) {
    event.preventDefault(); // to prevent the browsers default submission
    console.log("Submit button clicked");

    if(emailHasError || passwordHasError){
      return;
    }
    console.log(emailValue, passwordValue);

    
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

  /*
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

  */
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email!"}
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
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password!"}
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
