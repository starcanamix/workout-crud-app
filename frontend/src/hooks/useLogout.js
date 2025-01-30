import useAuthContext from "./useAuthContext";

const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = async () => {
        try {
            dispatch({type: "LOGOUT"});
            localStorage.removeItem("user");
        }
        catch(err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return {logout};
}

export default useLogout;