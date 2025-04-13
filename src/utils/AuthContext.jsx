import PropTypes from 'prop-types';
import {  useContext, createContext, useEffect, useState } from "react";
import { account } from '../appwrite/config.js';
import { ID } from 'appwrite';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    AuthProvider.propTypes = {
        children: PropTypes.any
    };

    const[loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    useEffect(() => {
        checkUserStatus()
        //setLoading(false)
    },[])

    const loginUser = async(userInfo) => {
        setLoading(true)
        try {
            let response = await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            )
            setUser(response)

            let accountDetails = await account.get()

            console.log('accountDetails',accountDetails)
            setUser(accountDetails)

        } catch(error) {
            console.error(error)
        }
        setLoading(false)

    }

    const logoutUser = () => {
        account.deleteSession('current')
        setUser(null)
    }

    const registerUser = async(userInfo) => {
        setLoading(true)

        try {
            let response = await account.create(
                    ID.unique(),
                    userInfo.email,
                    userInfo.password1,
                    userInfo.name
            )
            await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password1
            )
            setUser(response)

            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch(error) {
            console.error(error)
        }
        setLoading(false)
    }

    const checkUserStatus = async() => {

        try {
            let accountDetails = await account.get()
            setUser(accountDetails)

        } catch(error) {
            console.error(error)
        }

        setLoading(false)
   }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            { loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>

    );
}
 
export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext;