import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/navbar";

import { dataBaseRealTime } from "../../config/firebase";
import {
  ref,
  set,
  get,
  update,
  remove,
  child,
  query,
  orderByKey,
  DataSnapshot,
} from "firebase/database";

const dataBase = dataBaseRealTime;

export const Home = () => {
  let [userName, setUserName] = useState("");
  let [fullName, setFullName] = useState("");
  let [phone, setPhone] = useState("");
  let [dob, setDob] = useState("");
  const [users, setUsers] = useState<Array<{ userName: string } & any>>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dbRef = ref(dataBaseRealTime, "testepecas");
        const usersQuery = query(dbRef, orderByKey());

        const snapshot = await get(usersQuery);

        const userList: Array<{ userName: string } & any> = [];
        snapshot.forEach((childSnapshot: DataSnapshot) => {
          userList.push({
            userName: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        console.log(userList);

        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []);

  let isNullOrWhiteSpaces = (value: string | null | undefined): boolean => {
    value = value?.toString() || ""; // Use o operador de encadeamento opcional (?) para garantir que 'toString' seja chamado apenas se 'value' não for nulo ou indefinido
    return value == null || value.replaceAll(" ", "").length < 1;
  };

  let InsertData = () => {
    const dbref = ref(dataBase);

    if (
      isNullOrWhiteSpaces(userName) ||
      isNullOrWhiteSpaces(fullName) ||
      isNullOrWhiteSpaces(phone) ||
      isNullOrWhiteSpaces(dob)
    ) {
      alert("fill all the fields");
      return;
    }

    get(child(dbref, "testepecas/" + userName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("the user already exist, try a differente name");
        } else {
          set(ref(dataBase, "testepecas/" + userName), {
            fullName: fullName,
            phoneNumber: phone,
            dateOfBirth: dob,
          })
            .then((snapshot) => {
              alert("testepecas added successfully");
            })
            .catch((error) => {
              console.log(error);
              alert("there was an error adding the testepecas");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("error data retrieval was unsuccessfull");
      });
  };

  let UpdateData = () => {
    const dbref = ref(dataBase);

    if (isNullOrWhiteSpaces(userName)) {
      alert(
        "username is empyt, try to select a user first, with the select button"
      );
      return;
    }

    get(child(dbref, "testepecas/" + userName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(dataBase, "testepecas/" + userName), {
            fullName: fullName,
            phoneNumber: phone,
            dateOfBirth: dob,
          })
            .then(() => {
              alert("testepecas updated successfully");
            })
            .catch((error) => {
              console.log(error);
              alert("there was an error updating the testepecas");
            });
        } else {
          alert("error: the user does exist");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("error data retrieval was unsuccessfull");
      });
  };

  let DeleteData = () => {
    const dbref = ref(dataBase);

    if (isNullOrWhiteSpaces(userName)) {
      alert("username is required to delete a user");
      return;
    }

    get(child(dbref, "testepecas/" + userName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(dataBase, "testepecas/" + userName))
            .then(() => {
              alert("testepecas deleted successfully");
            })
            .catch((error) => {
              console.log(error);
              alert("there was an error deleting the testepecas");
            });
        } else {
          alert("error: the user does exist");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("error data retrieval was unsuccessfull");
      });
  };

  let SelectData = () => {
    const dbref = ref(dataBase);

    if (isNullOrWhiteSpaces(userName)) {
      alert("fill all the fields");
      return;
    }

    get(child(dbref, "testepecas/" + userName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setFullName(snapshot.val().fullName);
          setPhone(snapshot.val().phoneNumber);
          setDob(snapshot.val().dateOfBirth);
        } else {
          alert("no data available");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("error data retrieval was unsuccessfull");
      });
  };

  return (
    <>
      <Navbar />

      {/* <div className="flex flex-col items-center space-y-4">
        <label className="text-xl">Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded-md"
        />
        <label className="text-xl">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 rounded-md"
        />
        <label className="text-xl">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded-md"
        />
        <label className="text-xl">Date Of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border p-2 rounded-md"
        />

        <div className="flex space-x-4">
          <button onClick={InsertData} className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Insert Data
          </button>
          <button onClick={UpdateData} className="bg-green-500 text-white py-2 px-4 rounded-md">
            Update Data
          </button>
          <button onClick={DeleteData} className="bg-red-500 text-white py-2 px-4 rounded-md">
            Delete Data
          </button>
          <button onClick={SelectData} className="bg-purple-500 text-white py-2 px-4 rounded-md">
            Select Data
          </button>
        </div>
      </div>

      <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Users List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.userName}>
                <strong>{user.userName}</strong>
                <p>Full Name: {user.fullName}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <p>Date of Birth: {user.dateOfBirth}</p>
                <hr className="my-2" />
              </li>
            ))}
          </ul>
        </div> */}

      <div className="container mx-auto mt-8 mb-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Site MPL</h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          Esta página foi criada com o intuito de controle de estoque. Para
          utilizá-la, basta criar um cadastro, fazer login na página e
          adicionar, remover ou alterar os produtos contidos na empresa. Isso
          proporciona um melhor controle e rastreabilidade sobre onde os
          produtos podem estar.
        </p>

        <img
          src="milleniumTratado.png"
          alt="Imagem Inicial"
          className="w-full max-h-[600px] max-w-[600px] mt-10 rounded-lg"
        />
      </div>
    </>
  );
};
