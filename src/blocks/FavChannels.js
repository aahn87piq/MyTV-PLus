import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DataLoader from "../common/DataLoader";
import ChannelBlock from "./ChannelBlock";
export default function FavChannels() {
  const [cookies, setCookie] = useCookies(["DevID", "IP", "userID"]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      "https://tvapi.mytv-plus.com/Favorites.php?fav=channels&user=" +
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
        <div className="ContentDataChannels">
          <div className="container-fluid mt-3">
            <div className="row">
              {items.map((item) => (
                <ChannelBlock key={item.index} data={item} />
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
