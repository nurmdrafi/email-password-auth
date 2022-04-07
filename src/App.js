import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);

function App() {
  const handleEmailBlur = (e) => {
    console.log(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    console.log(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div>
        <h2 className="mb-3 text-black text-opacity-50">Please Register</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onBlur={handleEmailBlur}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onBlur={handlePasswordBlur}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
