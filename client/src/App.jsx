import './App.css'
import getUsers from './querries/GET/getUsers'
import createUser from './querries/POST/createUser'
import editUser from './querries/PUT/editUser'
import deleteUser from './querries/DELETE/deleteUser'

import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [getId, setGetId] = useState("")
  const [createData, setCreateData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    age: "",
    country: ""
  })
  const [updateData, setUpdateData] = useState({
    id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    age: "",
    country: ""
  })
  const [deleteId, setDeleteId] = useState("")

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(err => console.error(err))
  }, [])


  const handleGetSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUsers(getId);
      console.log("User found:", user);
    } catch (err) {
      console.error(err);
    }
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(createData);
      console.log("User created:", newUser);
      setUsers([...users, newUser]);
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await editUser(updateData);
      console.log("User updated:", updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    } catch (err) {
      console.error(err);
    }
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(deleteId);
      console.log("User deleted");
      setUsers(users.filter(u => u.id !== deleteId));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>JUST TESTING CRUDS</div>


      <form onSubmit={handleGetSubmit}>
        <div>Получение</div>
        <input 
          type='text' 
          name='id' 
          placeholder='введите id пользователя'
          value={getId}
          onChange={(e) => setGetId(e.target.value)}
        />
        <button type='submit'>Найти</button>
      </form>


      <form onSubmit={handleCreateSubmit}>
        <div>Создание</div>
        {Object.keys(createData).map((field) => (
          <input
            key={field}
            type='text'
            name={field}
            placeholder={`введите ${field}`}
            value={createData[field]}
            onChange={(e) => setCreateData({ ...createData, [field]: e.target.value })}
          />
        ))}
        <button type='submit'>Создать</button>
      </form>


      <form onSubmit={handleUpdateSubmit}>
        <div>Редактирование (укажи id в объекте)</div>
        {Object.keys(updateData).map((field) => (
          <input
            key={field}
            type='text'
            name={field}
            placeholder={`введите ${field}`}
            value={updateData[field]}
            onChange={(e) => setUpdateData({ ...updateData, [field]: e.target.value })}
          />
        ))}
        <button type='submit'>Изменить</button>
      </form>


      <form onSubmit={handleDeleteSubmit}>
        <div>Удаление</div>
        <input
          type='text'
          name='id'
          placeholder='введите id пользователя'
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button type='submit'>Удалить</button>
      </form>


      <div className='flex_container'>
        {users.map((user, index) => (
          <div key={index}>
            <div>user id: {user?.id}</div>
            <div>username: {user?.username}</div>
            <div>email: {user?.email}</div>
            <div>full name: {user?.profile?.first_name + " " + user?.profile?.last_name}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
