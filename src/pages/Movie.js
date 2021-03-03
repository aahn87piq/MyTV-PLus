import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useCookies } from "react-cookie";
import RelatedMovies from "../blocks/RelatedMovies";
export default function Movie() {
  const [cookies] = useCookies(["DevID", "IP", "userID"]);
  const { id } = useParams();
  const PA = useRef(null);
  const PE = useRef(null);
  const PT = useRef(null);
  const RedBTN = useRef(null);
  const [movie, setMovie] = useState([]);
  const [isfav, Setfav] = useState();
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 120 || keyCode === 406) {
        PA.current.click();
      } else if (keyCode === 121 || keyCode === 404) {
        PE.current.click();
      } else if (keyCode === 119 || keyCode === 405) {
        PT.current.click();
      } else if (keyCode === 8 || keyCode === 461) {
        RedBTN.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
    fetch("https://tvapi.mytv-plus.com/Movies.php?type=view&MV=" + id)
      .then((res) => res.json())
      .then((result) => {
        setMovie(result);
      });
    fetch(
      "https://tvapi.mytv-plus.com/FavMan.php?fav=movies&action=check&item=" +
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
  const ChangeFav = (status) => {
    if (status) {
      fetch(
        "https://tvapi.mytv-plus.com/FavMan.php?fav=movies&action=add&item=" +
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
        "https://tvapi.mytv-plus.com/FavMan.php?fav=movies&action=remove&item=" +
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
      {movie.map((item) => (
        <>
          <a ref={RedBTN} className="d-none" href="/app/movies"></a>
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
          <div className="ContentDataChannels">
            <div className="container-fluid">
              <div className="row">
                <div className="col-2 py-4">
                  <img
                    className="img-fluid rounded"
                    src={"https://www.appmytv.com/image/" + item.logo}
                    alt={item.name}
                  />
                </div>
                <div className="col-10 pl-5 pr-4">
                  <div className="row mt-5">
                    <div className="col-3 text-warning">Category</div>
                    <div className="col-9 text-white" id="mcats">
                      {item.CATNAME}
                    </div>
                    <div className="col-3 mt-1 text-warning">Year</div>
                    <div className="col-9 mt-1 text-white" id="myear">
                      {item.year}
                    </div>
                    <div className="col-3 mt-1 text-warning">Duration</div>
                    <div className="col-9 mt-1 text-white" id="mdur">
                      {item.duration} minutes
                    </div>
                    <div className="col-3 mt-1 text-warning">Actors</div>
                    <div className="col-9 mt-1 text-white" id="mactors">
                      {item.actors}
                    </div>
                    <div className="col-3 mt-1 text-warning">Writer</div>
                    <div className="col-9 mt-1 text-white" id="mwrite">
                      {item.writers}
                    </div>
                    <div className="col-3 mt-1 text-warning">Director</div>
                    <div className="col-9 mt-1 text-white" id="mdirec">
                      {item.director}
                    </div>
                    <div
                      className="col-12 mt-2 px-4 py-1 text-white small"
                      id="mdesc"
                    >
                      {item.description}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <div className="card bg-dark border border-white rounded-pill py-3 px-4">
                        <div className="row">
                          <div className="col-10 py-1 text-white">
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
                  <div className="row mt-3">
                    <div className="col-4">
                      <a
                        ref={PT}
                        className="btn btn-white-2 btn-block rounded-pill"
                        href={"/player/movie/trailer/" + item.id}
                        id="traileropen"
                      >
                        <i className="fas fa-circle float-left ml-1 mt-1 text-warning" />
                        Trailer
                        <i className="fas fa-video float-right mt-1" />
                      </a>
                    </div>
                    <div className="col-4">
                      <a
                        ref={PA}
                        className="btn btn-white-2 btn-block rounded-pill"
                        href={"/player/movie/arabic/" + item.id}
                        id="arabicsub"
                      >
                        <i className="fas fa-circle float-left ml-1 mt-1 text-success" />
                        Enblish Subtitles
                        <i className="fas fa-play-circle float-right mt-1" />
                      </a>
                    </div>
                    <div className="col-4">
                      <a
                        ref={PE}
                        className="btn btn-white-2 btn-block rounded-pill"
                        href={"/player/movie/english/" + item.id}
                        id="englishsub"
                      >
                        <i className="fas fa-circle float-left ml-1 mt-1 text-primary" />
                        Arabic Subtitles
                        <i className="fas fa-play-circle float-right mt-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <RelatedMovies tag={item.tag1} />
                <RelatedMovies tag={item.tag2} />
                <RelatedMovies tag={item.tag3} />
                <RelatedMovies tag={item.tag4} />
                <RelatedMovies tag={item.tag5} />
                <RelatedMovies tag={item.tag6} />
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
