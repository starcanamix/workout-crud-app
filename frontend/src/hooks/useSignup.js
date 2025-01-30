import React, { useEffect, useState } from 'react'
import useAuthContext from './useAuthContext.js';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setLoading(true);

        try {
            const res = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const jsonData = await res.json();
            if(!res.ok) {
                setError(jsonData.error);
                
            }   
            else {
                setError(null);
                dispatch({type: "LOGIN", payload: jsonData})
                localStorage.setItem("user", JSON.stringify(jsonData));
            }

        }
        catch(err) {
            console.log(`Error: ${err.message}`);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) dispatch({type: "LOGIN", payload: user});
    }, []);

    return {signup, loading, error};
}

export default useSignup;