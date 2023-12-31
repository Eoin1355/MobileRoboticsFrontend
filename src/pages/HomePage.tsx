import RouteInput from "../components/RouteInput";
import TeamInput from "../components/TeamInput";
import Track from "../components/Track";
import { useState } from "react";

function HomePage() {
  const [teamId, setTeamId] = useState("");

  return (
    <div>
      <TeamInput onTeamId={setTeamId} />
      <Track teamId={teamId} onTeamId={setTeamId} />
      <RouteInput teamId={teamId} />
    </div>
  );
}

export default HomePage;
