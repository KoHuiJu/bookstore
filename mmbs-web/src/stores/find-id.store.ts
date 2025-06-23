import {create} from 'zustand';
interface UserIdStore{
    userFindId: string;
    setFindId:(userFindId: string) => void;
}
const useStore = create<UserIdStore>((set)=>({
    userFindId: '',
    setFindId:(userFindId: string)=>{
        set((state)=>({...state ,userFindId}));
    },
}));
export default useStore;