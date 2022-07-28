import Axios from "axios";
import Cookie from "js-cookie";
import { 
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAIL,
} from "../constants/userConstants";
import { supabase } from "../utils/supabase";

const getUser = ( userId ) => async (dispatch, getState) => {
    const { userSignin: { userSignin } } = getState();
    dispatch({ type: USER_GET_REQUEST, payload: userId });
    try{
        const { data, userError } = await supabase 
            .from("user")
            .select("*")
            .match({ id: userId });
        if(userError){
            dispatch({ type: USER_GET_FAIL, payload: userError });
        }
        dispatch({ type: USER_GET_SUCCESS, payload: data[0]});
    }catch(error){
        dispatch({ type: USER_GET_FAIL, payload: error });
    }
};

const update = ({ userId, name, email }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email }});
    try {
        const { data, error } = await supabase 
            .from("user")
            .update({ email: email, name: name })
            .match({ id: userId });

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data[0] });
        Cookie.set('userInfo', JSON.stringify(data[0]));
    }catch(error){
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
};

const signIn = (email, password) => async (dispatch) => {
    const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
    });

    const data = { user: user, session: session };
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
}

const getUserInfo = () => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNIN_REQUEST });

        const userInfo = supabase.auth.user();

        if(!userInfo){
            dispatch({ type: USER_SIGNIN_FAIL, payload: "Sign in failed..." });
        }
        Cookie.set('userInfo', JSON.stringify(supabase.auth.user()));
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
    }catch(error){
        console.log(error);
        dispatch({ type: USER_SIGNIN_FAIL, payload: error });
    }
};

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password }});
    try{
        const { data } = await Axios.post("/api/users/register", { name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    }catch(error){
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
    }
}

const login = (redirect) => async (dispatch) => {
    try{
        dispatch({ type: USER_SIGNIN_REQUEST });
        if(redirect == "shopping"){
            const { user, session, error } = await supabase.auth.signIn({
                provider: "google",
            }, {
                redirectTo: 'http://localhost:3000/shipping',
            });
        }else{
            const { user, session, error } = await supabase.auth.signIn({
                provider: "google",
            }, {
                redirectTo: 'http://localhost:3000?redirect=auth_success',
            });
        }
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
    }catch(error){
        dispatch({ type: USER_SIGNIN_FAIL, userError: error });
    }

};

const logout = () => async (dispatch) => {
    try {
        await supabase.auth.signOut();
        setUser(null);
        dispatch({ type: USER_LOGOUT });
    }catch(error){
        dispatch({ type: USER_LOGOUT_FAIL, payload: error.message });
    }
  
}

export { signIn, register, login, logout, update, getUser, getUserInfo };