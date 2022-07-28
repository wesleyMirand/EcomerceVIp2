import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";

const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState(supabase.auth.user());
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if(!supabase.auth.user()){
            setUser({ 
                user_metadata: { 
                    name: "Bob"
                }
            })
        }
    }, [supabase.auth.user()]);

    useEffect(() => {
        const getUserProfile = async () => {
            const sessionUser = supabase.auth.user();
            if(sessionUser){
                setUser({
                    ...sessionUser,
                });

                setIsLoading(false);
            }
        };

        getUserProfile();

        supabase.auth.onAuthStateChange(() => {
            getUserProfile();
        });

    }, []);

    useEffect(() => {
        axios.post("/api/set-supabase-cookie", {
            event: user ? "SIGNED_ID" : "SIGNED_OUT",
            session: supabase.auth.session(),
        });
    }, [user]);


    useEffect(() => {
        if(user){
            const subscription = supabase
                .from(`profile:id=eq${user.id}`)
                .on("UPDATE", (payload) => {
                    setUser({ ...user, ...payload.new });
                })
                .subscribe();
            
            return () => {
                supabase.removeSubscription(subscription);
            };
        }
    }, [user]);

    const exposed = {
        user,
        isLoading
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
