import PrivateComponent from "components/PrivateComponent";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { editUser } from "utils/api";
import { getUsers } from "utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers(
        (reply) => {
          console.log("users", reply.data);
          setUsers(reply.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div>admin users</div>
      <PrivateComponent rolList={["admin"]}>
        <button className="bg-red-400">ola</button>
      </PrivateComponent>
      <table className="table">
        <tbody>
          {users.map((user) => {
            return (
              <tr key={nanoid()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <UserRols user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const UserRols = ({ user }) => {
  const [rol, setRol] = useState(user.rol);

  useEffect(() => {
    const edittUser = async () => {
      await editUser(
        user._id,
        { rol },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.rol !== rol) {
      edittUser();
    }
  }, [rol, user]);

  return (
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
      <option value="admin">Admin</option>
      <option value="seller">Seller</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};

export default Users;
