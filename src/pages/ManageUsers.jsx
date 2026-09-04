import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/manageusers.css";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  const getUsers = () => {

    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete User

  const deleteUser = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {

        alert("User deleted successfully!");

        getUsers();

      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="manage-users">

      <h1>👥 Manage Users</h1>

      {users.length === 0 ? (

        <p>No users found.</p>

      ) : (

        <div className="users-table">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>
                    {user.name || "N/A"}
                  </td>

                  <td>
                    {user.email || "N/A"}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default ManageUsers;