// import { User } from "firebase/auth";
// import { Component } from "react";
// import { getUserFromLocalStorage, onAuthStateChange } from "../../controllers/firebase/auth";
// import { FirebaseLocalUserType } from "../../types/auth.type";
// import { AuthContext } from "./context";
// import { AuthContextProp, AuthContextState } from "./types";

// class AuthContextProvider extends Component<AuthContextProp, AuthContextState>{

//     constructor(props: AuthContextProp) {
//         super(props);
//         state = {

//         }
//     }
//     componentDidMount() {
//         if (!state.user) {
//             onAuthStateChange(this)
//             // load local user whiles auth state change is working

//             let localUser = getUserFromLocalStorage();
//             if (localUser)
//                 loadUserToState(localUser)
//         }
//     }

//     loadUserToState = (user?: User | FirebaseLocalUserType) => {
//         setState(prev => ({ ...state, user }))
//     }

//     setAuthErrorToState = (authError: string) => {
//         setState(prev => ({ ...state, authError }))
//     }

//     isUserLoggedIn = () => {
//         return state.user !== undefined
//     }

//     render() {
//         return (<AuthContext.Provider value={{
//             loadUserToState: loadUserToState,
//             authError: state.authError,
//             setAuthErrorToState: setAuthErrorToState,
//             user: state.user,
//             isUserLoggedIn: isUserLoggedIn,
//         }}>
//             {props.children}
//         </AuthContext.Provider>)
//     }
// }
// const AuthContextConsumer = AuthContext.Consumer;

// export { AuthContextProvider, AuthContextConsumer };


import { User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage, onAuthStateChange } from "../../controllers/firebase/auth";
import { FirebaseLocalUserType } from "../../types/auth.type";
import { AuthContext } from "./context";
import { AuthContextProp, AuthContextState } from "./types";

function AuthContextProvider(props: AuthContextProp) {
    const navigate = useNavigate();

    const [state, setState] = useState<AuthContextState>({

    })

    useEffect(() => {
        if (!state.user) {
            onAuthStateChange(loadUserToState, navigate)
            // load local user whiles auth state change is working

            let localUser = getUserFromLocalStorage();
            if (localUser)
                loadUserToState(localUser)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.user])

    function loadUserToState(user?: User | FirebaseLocalUserType) {
        setState(prev => ({ ...state, user }))
    }

    function setAuthErrorToState(authError: string) {
        setState(prev => ({ ...state, authError }))
    }

    function isUserLoggedIn() {
        return state.user !== undefined
    }


    return (<AuthContext.Provider value={useMemo(() => (
        {
            loadUserToState: loadUserToState,
            authError: state.authError,
            setAuthErrorToState: setAuthErrorToState,
            user: state.user,
            isUserLoggedIn: isUserLoggedIn,
            role:"USER"
            // "ADMIN"
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [state.authError, state.user])}>

        {props.children}
    </AuthContext.Provider>)

}
const AuthContextConsumer = AuthContext.Consumer;

export { AuthContextProvider, AuthContextConsumer };
