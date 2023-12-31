import AddTeamForm from "../components/AddTeamForm";
import LoginForm from "../components/LoginForm";
import TeamTable from "../components/TeamTable";

function AdminPage({ authenticated }: { authenticated: boolean }) {
  return (
    <div>
      {authenticated ? (
        <>
          <AddTeamForm />
          <TeamTable />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default AdminPage;
