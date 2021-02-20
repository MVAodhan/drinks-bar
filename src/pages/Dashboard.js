import React, {useContext} from 'react'
import {UserContext} from '../context/UserContext'


const Dashboard = () => {

    const {user} = useContext(UserContext)

    return (
        <div>
            {user && 
            <h1>Dashboard</h1>
            }       
        </div>
    )
}

export default Dashboard
