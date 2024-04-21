import { useState } from "react";
import { demo } from "../utilities/helpers";
// import { saveData } from './saveData'; // A function to save the hashed result (to be implemented separately)

const RegistrationView = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salt, setSalt] = useState("");
  const [combinedPassword, setCombinedPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [message, setMessage] = useState("");

  const generateRandomSalt = () => {
    const action = "generateSalt";
    demo({ action: action }, (data) => {
      setSalt(data.message);
    });
  };

  const combinePasswordWithSalt = () => {
    setCombinedPassword(password + salt);
  };

  const hashPasswordWithSalt = () => {
    const action = "generateHash";
    demo({ action: action, combinedString: combinedPassword }, (data) => {
      setHashedPassword(data.message);
    });
  };

  const saveHashedResult = () => {
    const action = "save";
    const userData = {
      name,
      email,
      salt,
      password: hashedPassword,
    };

    demo({ action: action, userData: userData }, (data) => {
      setMessage(data.message);
    });
  };

  return (
    <div>
      <h1>Authentication System Visualization</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button onClick={generateRandomSalt} style={{ marginRight: "10px" }}>
          Generate Random Salt
        </button>
        <button
          onClick={combinePasswordWithSalt}
          style={{ marginRight: "10px" }}
        >
          Combine Password and Salt
        </button>
        <button onClick={hashPasswordWithSalt} style={{ marginRight: "10px" }}>
          Hash Password with Salt
        </button>
        <button onClick={saveHashedResult}>Save User</button>
      </div>
      <div>
        {salt && <p>Salt: {salt}</p>}
        {combinedPassword && <p>Combined string: {combinedPassword}</p>}
        {hashedPassword && <p>Hashed password: {hashedPassword}</p>}
        {message && (
          <pre>
            {` User Saved:\n Name: ${message.name}\nEmail: ${message.email}\n Salt: ${message.salt}\nPassword: ${message.password}`}
          </pre>
        )}
      </div>
    </div>
  );
};

export default RegistrationView;
