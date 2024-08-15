// Set up some imports...
import { useState, useContext, createContext, useEffect } from "react";
// Import the async getCurrentUser() from the appwrite directory
import { getCurrentUser } from "../lib/appwrite";

// NOt your typical context utilization!:
// NOt like this:
// 1. import {createContext} from 'react
// 2. export const MyContext = createContext()
// 3. <MyContext.Provider value={value aka stateful variable name most likely}>
// <ChildComponent><ChildComponent>
// </MyContext.Provider>
// Instead it uses the useContext() hook
// from React

const GlobalContext = createContext();

// Something has to provide this context though! for it to be utilized elsewhere! instead of props drilling
export const useGlobalContext = () => useContext(GlobalContext);

// Typically it is a react component that gets children as a prop and returns a global context with a provider like so...
const GlobalProvider = ({ children }) =>
{
    // Initially Logged in is set to false, user is set to a null Object value, and isLoading is set to true as the screen will be loading
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // There is also a useEffect hook for some side code to perform

    useEffect(() => 
    {
        // In this side code hook we will be calling a special function from our appwrite backend sided code
        // SPECIALFUNCTION BELOW... Creation of this special function is within the appwrite.js file
        // 
        // 
        // This speical get current user is an async function so we can control it timely via .then
        // It collects a response Object from the getCurrentUser() function
        // If the response is there, then isLoggedIn stateful var is set to true as the user is logged into the app
        // Then the user stateful variable is also set to the response Object values
        // Else the logged in is set to false and the user data is cleared via the null!
        // 
        // If an error erupts then it is displayed to the react native console.log(); styling
        // Then no matter what happens, the .finally() clause is used that callsback function to setIsloading to false
        // Because everything has completed and no loading is needed to be done!



        getCurrentUser().then(response =>
        {
            if (response)
            {
                setIsLoggedIn(true);
                setUser(response);
            }
            else
            {
                setIsLoggedIn(false);
                setUser(null);
            }
        }
        ).catch(error =>
        {
            console.log(error);
        }).finally(() =>
        {
            setIsLoading(false);
        });


        // You can return a clean up function as well. For more complex code such as event listeners, subscriptions, etc.             
        // component unmounts , it is removed from the DOM or if no dependencies, you can perform some CLEAN UP CODE.
        // When a For example if we were to add an event listener when the component mounts, we would like to remove it
        // before the component unmounts. If we don't it may lead to some unexpected behavior.
        return () =>
        {
            // Clean up code, before the next re-render or when you unmount the component

        }


    }, [])

    return (
        // Now that we have created some context, let us provide our entire application with a Provider for the Global state of being logged, 
        // user, etc. This will help with exterminating props drilling haha. We will provide the value with info such as isLoggedIn,
        // setIsLoggedIn, user, setUser, etc
        <GlobalContext.Provider
            value=
            {{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,


            }}>
            {/* Children will be wrapped inside it as, so it will be displaying the children, ie the screens properly */}
            {children}
        </GlobalContext.Provider>
    )
}

// Utilization for exportation of the GlobalProvider component
export default GlobalProvider



