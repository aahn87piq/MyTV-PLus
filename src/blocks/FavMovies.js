import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DataLoader from "../common/DataLoader";
import MovieBlock from "./MovieBlock";
export default function FavMovies() {
  const [cookies, setCookie] = useCookies(["DevID", "IP", "userID"]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      "https://tvapi.mytv-plus.com/Favorites.php?fav=movies&user=" +
        cookies.userID
    )
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      });
  }, []);
  return (
    <>
      {isLoaded ? (
        <div className="ContentData ContentDataChannels">
          <div className="container-fluid my-4">
            <div className="row">
              {items.map((item) => (
                <MovieBlock key={item.index} data={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
}
