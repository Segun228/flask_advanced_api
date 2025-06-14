import './App.css'
import getUsers from './querries/GET/getUsers'
import createUser from './querries/POST/createUser'
import editUser from './querries/PUT/editUser'
import deleteUser from './querries/DELETE/deleteUser'

import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [foundUser, setFoundUser] = useState(null)
  const [getId, setGetId] = useState("")
  const [createData, setCreateData] = useState({
    email: "", username: "", first_name: "", last_name: "", age: "", country: ""
  })
  const [updateData, setUpdateData] = useState({
    id: "", email: "", username: "", first_name: "", last_name: "", age: "", country: ""
  })
  const [deleteId, setDeleteId] = useState("")

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGetSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUsers(getId);
      setFoundUser(user);
      console.log("User found:", user);
      setGetId("")
    } catch (err) {
      console.error(err);
    }
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(createData);
      console.log("User created");
      await fetchUsers();
      setCreateData({ email: "", username: "", first_name: "", last_name: "", age: "", country: "" })
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(updateData);
      console.log("User updated");
      await fetchUsers();
      setUpdateData({ id: "", email: "", username: "", first_name: "", last_name: "", age: "", country: "" })
    } catch (err) {
      console.error(err);
    }
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(deleteId);
      console.log("User deleted");
      await fetchUsers();
      setDeleteId("")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h1 className="title">JUST TESTING CRUDS</h1>

      <div className="form-section">
        <form onSubmit={handleGetSubmit} className="form">
          <h2>Получение</h2>
          <input 
            type='text' 
            name='id' 
            placeholder='Введите id пользователя'
            value={getId}
            onChange={(e) => setGetId(e.target.value)}
          />
          <button type='submit'>Найти</button>
        </form>

        {foundUser &&
          <div className="user-card">
              <div><b>user id:</b> {foundUser?.id}</div>
              <div><b>username:</b> {foundUser?.username}</div>
              <div><b>email:</b> {foundUser?.email}</div>
              <div><b>full name:</b> {foundUser?.first_name + " " + foundUser?.last_name}</div>
          </div>
        }
      </div>

      <div className="form-section">
        <form onSubmit={handleCreateSubmit} className="form">
          <h2>Создание</h2>
          {Object.keys(createData).map((field) => (
            <input
              key={field}
              type='text'
              name={field}
              placeholder={`Введите ${field}`}
              value={createData[field]}
              onChange={(e) => setCreateData({ ...createData, [field]: e.target.value })}
            />
          ))}
          <button type='submit'>Создать</button>
        </form>
      </div>

      <div className="form-section">
        <form onSubmit={handleUpdateSubmit} className="form">
          <h2>Редактирование</h2>
          {Object.keys(updateData).map((field) => (
            <input
              key={field}
              type='text'
              name={field}
              placeholder={`Введите ${field}`}
              value={updateData[field]}
              onChange={(e) => setUpdateData({ ...updateData, [field]: e.target.value })}
            />
          ))}
          <button type='submit'>Изменить</button>
        </form>
      </div>

      <div className="form-section">
        <form onSubmit={handleDeleteSubmit} className="form">
          <h2>Удаление</h2>
          <input
            type='text'
            name='id'
            placeholder='Введите id пользователя'
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button type='submit'>Удалить</button>
        </form>
      </div>

      <div className='users-list'>
        <h2>Список пользователей</h2>
        <div className='flex-container'>
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <div><b>user id:</b> {user?.id}</div>
              <div><b>username:</b> {user?.username}</div>
              <div><b>email:</b> {user?.email}</div>
              <div><b>full name:</b> {user?.first_name + " " + user?.last_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;