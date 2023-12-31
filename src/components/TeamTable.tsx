import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function TeamTable() {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.254.68.200:8000/api/getTeams");
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (key: any) => {
    try {
      // Make HTTP DELETE call using the key
      const response = await fetch(
        `http://3.254.68.200:8000/api/deleteTeam/${key}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Check if the delete request was successful (status code 200-299)
      if (response.ok) {
        // Remove the deleted item from the state
        setData((prevData) => prevData.filter((item) => item["id"] !== key));
      } else {
        console.error("Error deleting item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    window.location.reload();
  };

  return (
    <div style={{ margin: "40px" }}>
      <h1 style={{ textAlign: "center" }}>Teams</h1>
      <Table
        striped
        bordered
        hover
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <thead>
          <tr>
            <th></th>
            <th>Team Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item["teamId"]}>
              <td>{index + 1}</td>
              <td>{item["teamId"]}</td>
              <td>
                <button onClick={() => handleDelete(item["teamId"])}>
                  Delete
                </button>
              </td>
              {/* Add more table cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TeamTable;
