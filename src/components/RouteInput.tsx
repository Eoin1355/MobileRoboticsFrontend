import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";

function RouteInput({ teamId }: { teamId: string }) {
  const handleRoutePost = (e: any) => {
    e.preventDefault();
    console.log(e);
    const routeString = e.target.RouteInput.value;
    const data: any = {
      teamId: teamId,
      route: routeString,
    };
    postRoute(data);
  };

  const handleRouteReset = (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = {
      teamId: teamId,
    };
    resetRoute(data);
  };

  const postRoute = async (data: string) => {
    try {
      await Axios.post("http://3.254.68.200:8000/api/postRoute", data);
    } catch (error) {
      console.error("Error posting route:", error);
    }
  };

  const resetRoute = async (data: string) => {
    try {
      await Axios.post("http://3.254.68.200:8000/api/resetRoute", data);
    } catch (error) {
      console.error("Error posting route:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleRoutePost}>
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
              placeholder="Specify route (comma seperated)"
              className=" mr-sm-2"
              name="RouteInput"
              pattern="^[0-5](,[0-5])+$"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Set</Button>
          </Col>
          <Col xs="auto">
            <Button type="submit" onClick={handleRouteReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RouteInput;
