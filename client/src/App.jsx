import './App.css'
import getUsers from './querries/GET/getUsers'
import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <div>FULLSTACK GOD DAMN</div>
      <form action="">
        <input type='text' />
        <button>Найти</button>
      </form>
      <div className='flex_container'>
        {
          users.map((user, index) => (
            <div key={index}>
              <div>{user?.username}</div>
              <div>{user?.email}</div>
              <div>{user?.profile?.first_name + " " + user?.profile?.last_name}</div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
