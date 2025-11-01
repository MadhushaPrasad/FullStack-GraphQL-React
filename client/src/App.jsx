import { useMutation, useQuery } from '@apollo/client/react'
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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
      age
      isMarried
    }
  }
`

function App() {
  const [userID, setUserID] = useState('')
  const [newUser, setNewUser] = useState({})

  const { data: getAllUsersData, error: getAllUsersError, loading: getAllUsersLoading } = useQuery(GET_ALL_USERS)
  const { data: getUserByID, error: getUserErrorByID, loading: getUserLoading } = useQuery(GET_USER_BY_ID, { variables: { id: userID } })

  const [createUser] = useMutation(CREATE_USER)

  const handleUserCreate = async () => {
    console.log(newUser)
    createUser({ variables: { name: newUser.name, age: Number(newUser.age), isMarried: Boolean(newUser.isMarried) } })
  }

  if (getAllUsersLoading) return <p>Data Loading ....</p>
  if (getAllUsersError) return <p>Error: {getAllUsersError.message}</p>

  return (
    <div className="flex flex-col items-center justify-content-center w-full h-full">
      <div className="flex flex-col gap-3 text-left">
        <h1 className="my-10 text-2xl">Create Users Form</h1>
        <input
          type="text"
          name="name"
          className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900"
          id="name"
          placeholder="Enter name"
          onChange={(e) => {
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }}
        />
        <input
          type="text"
          name="age"
          className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900"
          id="age"
          placeholder="Enter age"
          onChange={(e) => {
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }}
        />
        <div className="flex gap-3">
          <label htmlFor="married">
            Married
          </label>
          <label className="mx-5" htmlFor="married">
            Yes
          </label>
          <input
            type="radio"
            name="married"
            id="married"
            value={true}
            placeholder="Are you married?"
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, isMarried: e.target.value }))
            }}
          />
          <label className="mx-5" htmlFor="married">
            No
          </label>
          <input
            type="radio"
            name="married"
            id="married"
            value={false}
            placeholder="Are you married?"
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, isMarried: e.target.value }))
            }}
          />
        </div>
        <button
          className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 m-5 me-2 mb-2 px-5 py-2.5 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 font-medium text-white text-sm cursor-pointer"
          onClick={() => {
            handleUserCreate()
          }}
        >
          Submit
        </button>
      </div>
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
      <div className="flex flex-warp gap-10 my-10">
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
