import {create} from 'zustand';
interface SelectProductStore{
    selectProduct: any[];
    setSelectProduct:(user: any) => void;
    removeSelectProduct:()=> void;

}
const useStore = create<SelectProductStore>((set) => ({
  selectProduct: [],
  setSelectProduct: (selectProduct: any[]) => {
    set((state) => ({ ...state, selectProduct }));
  },
  removeSelectProduct: () => {
    set((state) => ({ ...state, selectProduct: [] }));
  },
}));
export default useStore;