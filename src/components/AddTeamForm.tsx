import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function AddTeamForm() {
  const [TeamIDInput, setTeamIDInput] = useState("");
  const accessToken = localStorage.getItem("access_token");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://3.254.68.200:8000/api/postTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({ teamId: TeamIDInput }).toString(),
    });
    window.location.reload();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        width: "40%",
        margin: "auto",
        marginTop: "10%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Add Team</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Team ID</Form.Label>
        <FloatingLabel controlId="floatingUsername" label="Team ID">
          <Form.Control
            type="string"
            placeholder="Enter Team ID"
            value={TeamIDInput}
            onChange={(e) => setTeamIDInput(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddTeamForm;
