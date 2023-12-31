import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import TrackSvg from "../assets/track.svg";
// import TrackPng from "../assets/track.png";
import CarImg from "../assets/car.png";
import TargetImg from "../assets/dart.png";

function Track({
  teamId,
  onTeamId,
}: {
  teamId: string;
  onTeamId: (teamId: string) => void;
}) {
  const [route, setRoute] = useState("");
  const [position, setPosition] = useState("1");
  const [destination, setDestination] = useState("0");
  const [positionVisibility, setPositionVisibility] = useState("none");
  const [destinationVisibility, setDestinationVisibility] = useState("none");

  useEffect(() => {
    if (teamId) {
      const ws = new WebSocket(`ws://3.254.68.200:8000/ws/track/${teamId}/`);

      ws.onerror = () => {
        // console.error("Error fetching data:", error);
        setPosition("5");
        setDestination("5");
        setPositionVisibility("none");
        setDestinationVisibility("none");
        onTeamId("");
        setRoute("");
      };

      ws.onopen = () => {
        console.log("Connected to WebSocket");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setRoute(data.route);
        const routeArray: string[] = data.route.split(",").map(Number);
        const index = parseInt(data.index);
        if (index == 0) {
          setDestination(routeArray[index]);
          setPosition(routeArray[0]);
          setPositionVisibility("none");
          setDestinationVisibility("block");
        } else if (routeArray.length > index) {
          setPosition(routeArray[index - 1]);
          setDestination(routeArray[index]);
          setPositionVisibility("block");
          setDestinationVisibility("block");
        } else if (routeArray.length == index) {
          setPosition(routeArray[index - 1]);
          setDestination(routeArray[0]);
          setPositionVisibility("block");
          setDestinationVisibility("none");
        }
        // Process data as needed
        console.log("Received data:", data);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      return () => {
        ws.close();
      };
    }
  }, [teamId]);

  const cords = [
    ["85%", "72%"],
    ["49%", "72%"],
    ["14%", "72%"],
    ["14%", "39%"],
    ["85%", "39%"],
    ["49%", "3%"],
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "60%",
          margin: "auto",
          position: "relative",
        }}
      >
        <Image
          src={TrackSvg}
          fluid
          style={{
            height: "max",
            width: "100%",
            paddingTop: "3%",
            paddingBottom: "3%",
          }}
        />
        <Image
          src={CarImg}
          style={{
            position: "absolute",
            top: cords[parseInt(position)][0],
            left: cords[parseInt(position)][1],
            color: "Orange",
            width: "4%",
            height: "auto",
            transform: "translate(-50%, -50%)",
            display: positionVisibility,
          }}
        />
        <Image
          src={TargetImg}
          style={{
            position: "absolute",
            top: cords[parseInt(destination)][0],
            left: cords[parseInt(destination)][1],
            color: "Orange",
            width: "4%",
            height: "auto",
            transform: "translate(-50%, -50%)",
            display: destinationVisibility,
          }}
        />
      </div>
      <h5 style={{ textAlign: "center" }}>Route: {route}</h5>
    </div>
  );
}

export default Track;
