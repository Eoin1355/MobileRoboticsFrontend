import { Button, Form, Row, Col } from "react-bootstrap";

function TeamInput({ onTeamId }: { onTeamId: (teamId: string) => void }) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onTeamId(e.target.elements.teamID.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row
        style={{
          display: "flex",
          width: "75%",
          margin: "auto",
          marginTop: "40px",
        }}
      >
        <Col>
          <Form.Control
            type="text"
            placeholder="Enter Team ID"
            name="teamID" // Add name attribute for easier access in handleSubmit
            className="mr-sm-2"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Set</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TeamInput;
