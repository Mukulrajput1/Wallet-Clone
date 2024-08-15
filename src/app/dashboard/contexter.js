'use client'
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const contexter = createContext();

export function ProvideContext({children}) {

  const [expense,setExpense] = useState([])
  const [isActive,setIsActive] = useState(0)
  const [username, setUsername] = useState();
  const [isLoader,setIsLoader] = useState(false)
  const [walletAmount,setWalletAmount] = useState()
  const [isFirstUpdated,setIsFirstUpdated] = useState(false)
  const [isNavbar, setIsNavbar] = useState(false);
  const [password,setPassword] = useState('')
  const [mobile,setMobile] = useState()
  const [showForm, setShowForm] = useState(false)
  const [farmers,setFarmers] = useState([])

  const fetchUser = async ()=>{
    setIsLoader(true)
    try {
      const response = await axios.get(`${process.env.DOMAIN}/api/users/me`)
      const user = response.data
      setUsername(user.data.email)
      setPassword(user.data.password)
      setMobile(user.data.mobile)
      setWalletAmount(user.data.walletAmount)
      setIsFirstUpdated(user.data.firstUpdate)
      setIsLoader(false)
      
    } catch (error) {
      console.log("error",error)
      setIsLoader(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <contexter.Provider value={{ username,setUsername,walletAmount,setWalletAmount,farmers,setFarmers,isFirstUpdated,setIsFirstUpdated,expense,setExpense,isLoader,setIsLoader,isNavbar,setIsNavbar,isActive,setIsActive,password,mobile,showForm,setShowForm}}>
      {children}
    </contexter.Provider>
  );
}

export const useContexter = () =>
{
 return useContext(contexter)
} 