import { createContext, useState } from "react";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
const [favourites, setFavourites] = useState([]);

const toggleFavourite = (id) => {
setFavourites((prev) =>
    prev.includes(id)
    ? prev.filter((favId) => favId !== id)
    : [...prev, id]
);
};

return (
<FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
    {children}
</FavouritesContext.Provider>
);
}
