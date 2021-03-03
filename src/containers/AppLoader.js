import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import VID from "../assets/vid/loader.mp4";
export default function AppLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["DevID", "IP", "userID"]);
  const [isLoggedIN, SetIsLoogedIn] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 8000);
    fetch("https://tvapi.mytv-plus.com/UserCheck.php?mac=" + cookies.DevID)
      .then((res) => res.json())
      .then((result) => {
        result.map((item) => {
          SetIsLoogedIn(item.userlogged);
          setCookie("userID", item.userid, { path: "/" });
        });
      });
    fetch("https://tvapi.mytv-plus.com/getip.php")
      .then((res) => res.json())
      .then((result) => {
        result.map((item) => {
          setCookie("IP", item.ip, { path: "/" });
        });
      });
  }, []);
  if (!isLoaded) {
    return (
      <div className="preloader">
        <video autoPlay loop muted>
          <source src={VID} type="video/mp4" />
        </video>
      </div>
    );
  } else {
    if (isLoggedIN) {
      return <Redirect to="/app" />;
    } else {
      return <Redirect to="/register" />;
    }
  }
}
