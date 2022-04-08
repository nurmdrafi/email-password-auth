import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password should contain minimum eight characters, at least one letter, one number and one special character"
      );
      return;
    }

    setValidated(true);
    setError("");
    const auth = getAuth();

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div>
        <h2 className="mb-3 text-black text-opacity-50">
          Please {registered ? "Login" : "Register"}!!!
        </h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onBlur={handleEmailBlur}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onBlur={handlePasswordBlur}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <p className="text-danger">{error}</p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegisteredChange}
              type="checkbox"
              label="Already Registered?"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
