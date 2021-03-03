import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function FavTop() {
  const FavCHN = useRef(null);
  const FavSER = useRef(null);
  const FavMOV = useRef(null);
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { key, keyCode } = event;
      if (keyCode === 120 || keyCode === 404) {
        FavCHN.current.click();
      } else if (keyCode === 121 || keyCode === 406) {
        FavMOV.current.click();
      } else if (keyCode === 119 || keyCode === 405) {
        FavSER.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  return (
    <div className="ContentHeader">
      <div className="container-fluid">
        <div className="row my-2">
          <div className="col">
            <h4 className="text-white font-weight-bold mt-2">
              <i className="fas fa-heart mr-4" />
              Favorites
            </h4>
          </div>
          <div className="col-2 px-1">
            <NavLink
              ref={FavCHN}
              activeClassName="active"
              className="bg-main text-white favbtn"
              to="/app/favorites/channels"
            >
              <div className="w-100">
                <i className="fas fa-tv float-left mr-1 mt-1" />
                <i className="fas fa-circle float-right ml-1 mt-1 text-success"></i>
                Channels
              </div>
            </NavLink>
          </div>
          <div className="col-2 px-1">
            <NavLink
              ref={FavMOV}
              activeClassName="active"
              className="bg-main text-white favbtn"
              to="/app/favorites/movies"
            >
              <div className="w-100">
                <i className="fas fa-film float-left mr-1 mt-1" />
                <i className="fas fa-circle float-right ml-1 mt-1 text-primary"></i>
                Movies
              </div>
            </NavLink>
          </div>
          <div className="col-2 px-1">
            <NavLink
              ref={FavSER}
              activeClassName="active"
              className="bg-main text-white favbtn"
              to="/app/favorites/series"
            >
              <div className="w-100">
                <i className="fas fa-video float-left mr-1 mt-1" />
                <i className="fas fa-circle float-right ml-1 mt-1 text-warning "></i>
                TV Series
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
