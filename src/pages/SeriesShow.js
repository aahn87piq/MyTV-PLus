import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ContentLoader from "../common/ContentLoader";
import { useCookies } from "react-cookie";
export default function SeriesShow() {
  const [cookies] = useCookies(["DevID", "IP", "userID"]);
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [series, setSeries] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [episods, setEpisods] = useState([]);
  const [isfav, Setfav] = useState(false);
  const [seryear, SetYear] = useState();
  const [seractors, SetActors] = useState();
  const [serdirector, SetDirector] = useState();
  const [serDesc, SetDesc] = useState();
  const [seasimg, SetSeasIMG] = useState();
  const RedBTN = useRef(null);
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 8 || keyCode === 461) {
        RedBTN.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
    fetch("https://tvapi.mytv-plus.com/Series.php?type=view&TVS=" + id)
      .then((res) => res.json())
      .then((result) => {
        setSeries(result);
        console.log(result);
        result.map((item) => {
          SetYear(item.year);
          SetActors(item.actors);
          SetDirector(item.director);
          SetDesc(item.description);
          SetSeasIMG(item.fsimg);
          fetch("https://tvapi.mytv-plus.com/Episodes.php?TVS=" + item.fs)
            .then((res) => res.json())
            .then((result) => {
              setIsLoaded(true);
              setEpisods(result);
            });
        });
      });
    fetch("https://tvapi.mytv-plus.com/Seasons.php?TVS=" + id)
      .then((res) => res.json())
      .then((result) => {
        setSeasons(result);
      });
    fetch(
      "https://tvapi.mytv-plus.com/FavMan.php?fav=series&action=check&item=" +
        id +
        "&user=" +
        cookies.userID
    )
      .then((res) => res.json())
      .then((result) => {
        result.map((item) => {
          if (item.resp === 1) {
            Setfav(true);
          } else {
            Setfav(false);
          }
        });
      });
  }, []);
  const GetEpisode = (item, item2) => {
    setIsLoaded(false);
    SetSeasIMG(item2);
    fetch("https://tvapi.mytv-plus.com/Episodes.php?TVS=" + item)
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setEpisods(result);
      });
    fetch("https://tvapi.mytv-plus.com/Seasons.php?current=1&TVS=" + item)
      .then((res) => res.json())
      .then((result) => {
        result.map((item) => {
          SetYear(item.year);
          SetActors(item.actors);
          SetDirector(item.director);
          SetDesc(item.description);
        });
      });
  };
  const ChangeFav = (status) => {
    if (status) {
      fetch(
        "https://tvapi.mytv-plus.com/FavMan.php?fav=series&action=add&item=" +
          id +
          "&user=" +
          cookies.userID
      )
        .then((res) => res.json())
        .then((result) => {
          result.map((item) => {
            if (item.resp) {
              Setfav(true);
            } else {
              Setfav(false);
            }
          });
        });
    } else {
      fetch(
        "https://tvapi.mytv-plus.com/FavMan.php?fav=series&action=remove&item=" +
          id +
          "&user=" +
          cookies.userID
      )
        .then((res) => res.json())
        .then((result) => {
          result.map((item) => {
            if (item.resp) {
              Setfav(false);
            } else {
              Setfav(true);
            }
          });
        });
    }
  };
  const isFavset = () => {
    if (isfav) {
      return (
        <button
          autoFocus
          className="btn bg-transparent addtofavbtn text-white hvr-pulse float-right"
          onClick={() => ChangeFav(false)}
        >
          <i className="fas fa-heart fa-2x" />
          <span className="ml-3">Remove From Favorites</span>
        </button>
      );
    } else {
      return (
        <button
          autoFocus
          className="btn bg-transparent addtofavbtn text-mainpink hvr-pulse float-right"
          onClick={() => ChangeFav(true)}
        >
          <i className="fas fa-heart fa-2x" />
          <span className="ml-3">Add To Favorites</span>
        </button>
      );
    }
  };
  return (
    <>
      {series.map((item) => (
        <>
          <a ref={RedBTN} className="d-none" href="/app/series"></a>
          <div className="ContentHeader">
            <div className="container-fluid">
              <div className="row">
                <div className="col-9">
                  <h2 className="text-white mt-2">{item.name}</h2>
                </div>
                <div className="col-3">{isFavset()}</div>
              </div>
            </div>
          </div>
          <div className="ContentData">
            <div className="container-fluid">
              <div className="row">
                <div className="col-2 pr-5">
                  <img
                    className="img-fluid rounded"
                    src={"https://www.appmytv.com/image/" + item.logo}
                    alt={item.name}
                  />
                </div>
                <div className="col-10">
                  <div className="row">
                    <div className="col-12 text-white" id="mdesc">
                      {serDesc}
                    </div>
                    <div className="col-3 mt-2 text-warning">Year</div>
                    <div className="col-9 mt-2 text-white" id="myear">
                      {seryear}
                    </div>
                    <div className="col-3 mt-2 text-warning">Actors</div>
                    <div className="col-9 mt-2 text-white" id="mactors">
                      {seractors}
                    </div>
                    <div className="col-3 mt-2 text-warning">Director</div>
                    <div className="col-9 mt-2 text-white" id="mdirec">
                      {serdirector}
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-12">
                      <div className="card bg-dark border border-white rounded-pill py-3 px-4">
                        <div className="row">
                          <div className="col-10 py-2 text-white">
                            <StarRatings
                              rating={item.rating}
                              starRatedColor="#ffc107"
                              isSelectable={false}
                              numberOfStars={10}
                              name="rating"
                              starDimension="30px"
                              starSpacing="20px"
                            />
                          </div>
                          <div className="col-2">
                            <h5 className="rounded-pill text-warning border border-warning text-center mt-1 py-1">
                              {item.rating}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-3">
              <div className="row">
                <div className="col-2 h5 text-white">Seasons</div>
                <div className="col-10 h5 text-white">Episodes</div>
              </div>
              <div className="row mt-2">
                <div className="col-2 SeasLister pt-1">
                  {seasons.map((item) => (
                    <button
                      key={item.index}
                      className="bg-transparent container-fluid mb-2 py-1 seasonlink hvr-grow"
                      onClick={() => GetEpisode(item.id, item.logo)}
                    >
                      <div className="row">
                        <div className="col-4">
                          <img
                            className="img-fluid rounded"
                            src={"https://www.appmytv.com/image/" + item.logo}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-8 h4 mt-4">{item.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="col-10 EpsLister">
                  <div className="row">
                    {isLoaded ? (
                      episods.map((item) => (
                        <div key={item.index} className="col-2 p-2">
                          <a
                            href={
                              "/player/series/" +
                              item.id +
                              "/" +
                              item.seriesSeasonsId +
                              "/" +
                              id
                            }
                            className="rounded episodelink  hvr-grow"
                          >
                            <img
                              className="img-fluid rounded"
                              src={"https://www.appmytv.com/image/" + seasimg}
                              alt={item.name}
                            />
                            <span className="rounded">{item.name}</span>
                          </a>
                        </div>
                      ))
                    ) : (
                      <ContentLoader />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
