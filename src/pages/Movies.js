import { useEffect, useRef, useState } from "react";
import DataLoader from "../common/DataLoader";
import MovieBlock from "../blocks/MovieBlock";
export default function Movies() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [MPP, SetMPP] = useState(12);
  const [curpage, SetCurpage] = useState(1);
  const [packs, setPacks] = useState([]);
  const [cats, setCats] = useState([]);
  const [years, setYears] = useState([]);
  const [ages, setages] = useState([]);
  const [pack, setPack] = useState("ALL");
  const [cat, setCat] = useState("ALL");
  const [year, setYear] = useState("ALL");
  const [Age, setAge] = useState("ALL");
  const [rating, setRating] = useState(0);
  const [loadFilter, SetLoadFilter] = useState(false);
  const FILTERB = useRef(null);
  const DOFILTERBTN = useRef(null);
  const RedBTN = useRef(null);
  const ratings = [
    { r: "1" },
    { r: "2" },
    { r: "3" },
    { r: "4" },
    { r: "5" },
    { r: "6" },
    { r: "7" },
    { r: "8" },
    { r: "9" },
    { r: "10" },
  ];
  const LoadMore = (param) => {
    SetCurpage(param);
    FILTERB.current.focus();
  };
  const ClearFilter = () => {
    setPack("ALL");
    setCat("ALL");
    setYear("ALL");
    setAge("ALL");
    setRating(0);
    SetLoadFilter(false);
    setIsLoaded(false);
    fetch(
      "https://tvapi.mytv-plus.com/Movies.php?type=filter&pack=ALL&cat=ALL&rating=0&year=ALL&age=ALL"
    )
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      });
  };
  const DoFilter = () => {
    SetLoadFilter(false);
    setIsLoaded(false);
    fetch(
      "https://tvapi.mytv-plus.com/Movies.php?type=filter&pack=" +
        pack +
        "&cat=" +
        cat +
        "&rating=" +
        rating +
        "&year=" +
        year +
        "&age=" +
        Age
    )
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      });
  };
  const SetCurrentYear = (event, item) => {
    const ischecked = event.target.checked;
    const checkval = event.target.getAttribute("data-year");
    if (ischecked) {
      setYear(year + "-" + checkval);
    } else {
      setYear(year.replace(checkval, ""));
    }
  };
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 120 || keyCode === 406) {
        FILTERB.current.click();
      } else if (keyCode === 121 || keyCode === 404) {
        DOFILTERBTN.current.click();
      } else if (keyCode === 8 || keyCode === 461) {
        if (loadFilter) {
          SetLoadFilter(!loadFilter);
        } else {
          RedBTN.current.click();
        }
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
    fetch("https://tvapi.mytv-plus.com/MovieCats.php")
      .then((res) => res.json())
      .then((result) => {
        setCats(result);
      });
    fetch("https://tvapi.mytv-plus.com/MovieAges.php")
      .then((res) => res.json())
      .then((result) => {
        setages(result);
      });
    fetch("https://tvapi.mytv-plus.com/MoviePacks.php")
      .then((res) => res.json())
      .then((result) => {
        setPacks(result);
      });
    fetch("https://tvapi.mytv-plus.com/MovieYears.php")
      .then((res) => res.json())
      .then((result) => {
        setYears(result);
      });
    fetch("https://tvapi.mytv-plus.com/Movies.php")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      });
  }, []);
  return (
    <>
      {isLoaded ? (
        loadFilter ? (
          <>
            <div className="ContentHeader">
              <button
                ref={RedBTN}
                className="d-none"
                onClick={() => SetLoadFilter(!loadFilter)}
              ></button>
              <div className="container-fluid">
                <div className="row my-2">
                  <div className="col px-1">
                    <h4 className="text-white font-weight-bold mt-2">
                      <i className="fas fa-sliders-h mr-4" />
                      Filter Movies
                    </h4>
                  </div>
                  <div className="col btn-col px-1">
                    <button
                      autoFocus
                      ref={DOFILTERBTN}
                      className="btn btn-white-2 rounded-pill btn-block"
                      onClick={() => DoFilter()}
                    >
                      <i className="fas fa-filter float-left ml-1 mt-1" />
                      Submit Filter
                      <i className="fas fa-circle float-right ml-1 mt-1 text-success" />
                    </button>
                  </div>
                  <div className="col btn-col px-1">
                    <button
                      ref={FILTERB}
                      className="btn btn-white-2 rounded-pill btn-block"
                      onClick={() => ClearFilter()}
                    >
                      <i className="far fa-times-circle float-left ml-1 mt-1" />
                      Clear Filter
                      <i className="fas fa-circle float-right ml-1 mt-1 text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ContentDataChannels">
              <div className="container-fluid">
                <div className="row my-1 py-2 border-bottom">
                  <div className="col-2 text-white">
                    <h5>
                      <i className="fas fa-user-tie mr-2" /> PG Rating
                    </h5>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-3 p-1">
                        <button
                          className={
                            Age === "ALL"
                              ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                              : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                          }
                          onClick={() => setAge("ALL")}
                        >
                          All Ages
                        </button>
                      </div>
                      {ages.map((item) => (
                        <div key={item.index} className="col-3 p-1">
                          <button
                            className={
                              Age === item.age
                                ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                                : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                            }
                            onClick={() => setAge(item.age)}
                          >
                            {item.age}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row my-1 py-2 border-bottom">
                  <div className="col-2 text-white">
                    <h5 className="mt-2">
                      <i className="fas fa-star-half-alt mr-2" /> Rating
                    </h5>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      {ratings.map((item) => (
                        <div key={item.r} className="col px-1">
                          <button
                            onClick={() => setRating(item.r)}
                            data-index={item.r}
                            className="btn btn-block bg-transparent rating"
                          >
                            {parseInt(item.r) <= parseInt(rating) ? (
                              <i className="fas fa-star fa-2x text-warning"></i>
                            ) : (
                              <i className="far fa-star fa-2x"></i>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row my-1 py-2 border-bottom">
                  <div className="col-2 text-white">
                    <h5>
                      <i className="fas fa-box-open mr-2" /> Packages
                    </h5>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-3 p-1">
                        <button
                          className={
                            pack === "ALL"
                              ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                              : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                          }
                          onClick={() => setPack("ALL")}
                        >
                          All Packages
                        </button>
                      </div>
                      {packs.map((item) => (
                        <div key={item.index} className="col-3 p-1">
                          <button
                            className={
                              pack === item.id
                                ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                                : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                            }
                            onClick={() => setPack(item.id)}
                          >
                            {item.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row my-1 py-2 border-bottom">
                  <div className="col-2 text-white">
                    <h5>
                      <i className="fas fa-window-restore  mr-2" /> Categories
                    </h5>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-3 p-1">
                        <button
                          className={
                            cat === "ALL"
                              ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                              : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                          }
                          onClick={() => setCat("ALL")}
                        >
                          All Packages
                        </button>
                      </div>
                      {cats.map((item) => (
                        <div key={item.index} className="col-3 p-1">
                          <button
                            className={
                              cat === item.name
                                ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                                : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                            }
                            onClick={() => setCat(item.name)}
                          >
                            {item.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row my-1 py-2">
                  <div className="col-2 text-white">
                    <h5>
                      <i className="fas fa-calendar-alt mr-2" /> Year
                    </h5>
                  </div>
                  <div className="col-10">
                    <div className="row ks-cboxtags">
                      {years.map((item) => (
                        <div key={item.index} className="col-1 my-1 px-1">
                          <input
                            index={0}
                            type="checkbox"
                            className="ysel"
                            id={item.year}
                            data-year={item.year}
                            onChange={(event) => SetCurrentYear(event)}
                          />
                          <label htmlFor={item.year}>{item.year}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="ContentHeader">
              <a ref={RedBTN} className="hidden" href="/app/exit"></a>
              <div className="container-fluid">
                <div className="row my-2">
                  <div className="col">
                    <h4 className="text-white font-weight-bold mt-2">
                      <i className="fas fa-film mr-4" />
                      Movies
                    </h4>
                  </div>
                  <div className="col">
                    <div className="row mt-2">
                      <div className="col px-1 py-2 text-right text-white">
                        Show
                      </div>
                      <div className="col px-1">
                        <button
                          className="btn btn-sm btn-white-2 rounded-pill btn-block"
                          onClick={() => SetMPP(12)}
                        >
                          12
                        </button>
                      </div>
                      <div className="col px-1">
                        <button
                          className="btn btn-sm btn-white-2 rounded-pill btn-block"
                          onClick={() => SetMPP(24)}
                        >
                          24
                        </button>
                      </div>
                      <div className="col px-1">
                        <button
                          className="btn btn-sm btn-white-2 rounded-pill btn-block"
                          onClick={() => SetMPP(60)}
                        >
                          60
                        </button>
                      </div>
                      <div className="col px-1 py-2 text-white">movies</div>
                    </div>
                  </div>
                  <div className="col btn-col px-1">
                    <button
                      autoFocus
                      ref={FILTERB}
                      className="btn btn-white-2 rounded-pill btn-block"
                      onClick={() => SetLoadFilter(!loadFilter)}
                    >
                      <i className="fas fa-filter float-left ml-1 mt-1" />
                      Filter
                      <i className="fas fa-circle float-right ml-1 mt-1 text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ContentDataChannels">
              <div className="container-fluid my-4">
                <div className="row">
                  {items.slice(0, curpage * MPP).map((item) => (
                    <MovieBlock key={item.index} data={item} />
                  ))}
                </div>
                <div className="row mt-1">
                  <div className="col-12 px-1">
                    <button
                      className="btn rounded-pill btn-mainpink btn-block"
                      onClick={() => LoadMore(curpage + 1)}
                    >
                      Load More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <DataLoader />
      )}
    </>
  );
}
