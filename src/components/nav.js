import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import {useLocation} from 'react-router-dom'


const Nav = () => {
    let location = useLocation()
    let path = location.pathname

    const logOutRefresh = () => window.location.reload()

    const {user} = useContext(UserContext)
    return (
        <div className="nav">
            {user && 
            <NavLink to="/" exact> Uncompleted Orders </NavLink>
            }
            {user && 
             <NavLink to="/completed" exact> Completed Orders</NavLink>
            }
            {user && 
            <NavLink  to="/dashboard" exact>Dashboard</NavLink>
            }
            {!user && path !=='/login' &&
            <NavLink className='login-btn-link' to="/login" exact><button className='login-btn'>Login</button></NavLink>
            }
            {user &&
            <button className='logout-btn' onClick={logOutRefresh}>Log out</button>}
        </div>
    )
}

export default Nav
