import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [registered, setRegistered] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [validated, setValidated] = useState(false);

  const handleEmailBlur = (event) => {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    ) {
      setEmail({ value: "", error: "Please provide valid email." });
    } else {
      setEmail({ value: "event.target.value", error: "" });
    }
  };

  const handlePasswordBlur = (event) => {
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        event.target.value
      )
    ) {
      setPassword({ value: "", error: "Please provide a valid password." });
    } else {
      setPassword({ value: "event.target.value", error: "" });
    }
  };
  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (email.value === "") {
      setEmail({ value: "", error: "Email is required" });
    }
    if (password.value === "") {
      setPassword({ value: "", error: "Password is required" });
    }
    setValidated(true);

    if (registered) {
      if (email.value & password.value) {
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
      }
    } else {
      if (email.value & password.value) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setEmail("");
            setPassword("");

            // Email verification
            sendEmailVerification(auth.currentUser).then(() => {
              console.log("Email verification send");
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
            <Form.Text className="text-danger">{email.error}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onBlur={handlePasswordBlur}
            />
            <Form.Text className="text-danger">{password.error}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegisteredChange}
              type="checkbox"
              label="Already Registered?"
            />
          </Form.Group>
          <Button
            onClick={handlePasswordReset}
            variant="link"
            className="p-0 mb-3"
          >
            Forget Password?
          </Button>{" "}
          <br />
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
