import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { useState } from 'react'

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      age
      id
      isMarried
      name
    }
  }
`

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      age
      id
      isMarried
      name
    }
  }
`

function App() {
  const [userID, setUserID] = useState('')
  const { data: getAllUsersData, error: getAllUsersError, loading: getAllUsersLoading } = useQuery(GET_ALL_USERS)
  const { data: getUserByID, error: getUserErrorByID, loading: getUserLoading } = useQuery(GET_USER_BY_ID, { variables: { id: userID } })

  if (getAllUsersLoading) return <p>Data Loading ....</p>
  if (getAllUsersError) return <p>Error: {getAllUsersError.message}</p>

  return (
    <div className="flex flex-col items-center justify-content-center w-full h-full">
      <h1 className="my-10 text-2xl">Users</h1>
      <input
        className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-1/4 text-gray-900"
        type="text"
        name="userID"
        id="userID"
        placeholder="Enter user id"
        onChange={(e) => {
          setUserID(e.target.value)
        }}
      />
      <div>
        <h1 className="my-10 text-2xl text-center">Chosen user</h1>
        {getUserByID && getUserByID.getUserById ? (
          <div key={getUserByID.getUserById.id} className="block bg-white hover:bg-gray-100 shadow-sm p-6 border border-gray-200 rounded-lg max-w-sm">
            <p>Id: {getUserByID.getUserById.id}</p>
            <p>Name: {getUserByID.getUserById.name}</p>
            <p>Age: {getUserByID.getUserById.age}</p>
            <p>User is married: {getUserByID.getUserById.isMarried ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p className="text-gray-500">No user selected or user not found.</p>
        )}
      </div>
      <div className="flex flex-row gap-10 my-10">
        {getAllUsersData.getAllUsers.map((user) => {
          return (
            <div key={user.id} className="block bg-white hover:bg-gray-100 shadow-sm p-6 border border-gray-200 rounded-lg max-w-sm">
              <p>Id: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Agw: {user.age}</p>
              <p>User is married: {user.isMarried ? 'Yes' : 'No'}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
