import React from 'react'
import { Link } from 'react-router-dom'
import user from '../../images/user.png'


const ContactDetail = (props) => {
    const {name,email}=props.location.state.contact;//check the console.log(props) in this file
  return (
    <div className='main'>
         <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt="user" />
                </div>   
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>    
            <div className='center-div' style={{marginLeft:"44%"}}>
                <Link to='/'>
                <button className='ui button blue center' style={{padding:"12px",fontSize:"20px"}}>Back to Contact List</button>
                </Link>
             </div>   
    </div>
  )
}

export default ContactDetail
