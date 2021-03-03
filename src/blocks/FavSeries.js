import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DataLoader from "../common/DataLoader";
import SeriesBlock from "./SeriesBlock";
export default function FavSeries() {
  const [cookies, setCookie] = useCookies(["DevID", "IP", "userID"]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      "https://tvapi.mytv-plus.com/Favorites.php?fav=series&user=" +
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
                <SeriesBlock key={item.index} data={item} />
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
