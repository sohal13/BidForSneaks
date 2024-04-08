import { useContext , createContext , useState } from "react";

export const CartContext = createContext();

export const userCart = ()=>{
    return useContext(CartContext)
}

export const CartContextProvider = ({children})=>{
    const [cart, setuserCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem("BidForSneaksCart"));
        return storedCart || [];
      });
    return (<
        CartContext.Provider value={{cart , setuserCart}}>
    {children}
    </CartContext.Provider>
)
}