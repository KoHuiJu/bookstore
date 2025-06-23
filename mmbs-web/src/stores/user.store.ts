import {create} from 'zustand';
interface UserStore{
    user:any;
    setUser:(user: any) => void;
    remobeUser:()=>void;
}
const useStore = create<UserStore>((set)=>({
    user: null,
    setUser:(user:any)=>{
        set((state)=>({...StaticRange,user}));
    },
    remobeUser:() =>{
        set((state)=>({...state, user:null}));
    }
}));
export default useStore;