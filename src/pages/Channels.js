import { useEffect, useState, useRef } from "react";
import DataLoader from "../common/DataLoader";
import ChannelBlock from "../blocks/ChannelBlock";
export default function Channels() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [loadFilter, SetLoadFilter] = useState(false);
  const [packs, setPacks] = useState([]);
  const [cats, setCats] = useState([]);
  const [pack, setPack] = useState("ALL");
  const [cat, setCat] = useState("ALL");
  const FILTERB = useRef();
  const DOFILTERBTN = useRef();
  const RedBTN = useRef();
  const ClearFilter = () => {
    SetLoadFilter(false);
    setIsLoaded(false);
    fetch("https://tvapi.mytv-plus.com/Channels.php?type=filter")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      });
    setPack("ALL");
    setCat("ALL");
  };
  const DoFilter = () => {
    SetLoadFilter(false);
    setIsLoaded(false);
    if (pack === "ALL" && cat === "ALL") {
      fetch("https://tvapi.mytv-plus.com/Channels.php?type=filter")
        .then((res) => res.json())
        .then((result) => {
          setIsLoaded(true);
          setItems(result);
        });
    } else {
      fetch(
        "https://tvapi.mytv-plus.com/Channels.php?type=filter&pack=" +
          pack +
          "&cat=" +
          cat
      )
        .then((res) => res.json())
        .then((result) => {
          setIsLoaded(true);
          setItems(result);
        });
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
    fetch("https://tvapi.mytv-plus.com/Channels.php")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItems(result);
      });
    fetch("https://tvapi.mytv-plus.com/ChannelsCats.php")
      .then((res) => res.json())
      .then((result) => {
        setCats(result);
      });
    fetch("https://tvapi.mytv-plus.com/ChannelsPacks.php")
      .then((res) => res.json())
      .then((result) => {
        setPacks(result);
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
                      Filter Channels
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
                <div className="row my-1 py-2">
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
                              cat === item.id
                                ? "btn mt-1 btn-catpacklister rounded-pill btn-block active"
                                : "btn mt-1 btn-catpacklister rounded-pill btn-block"
                            }
                            onClick={() => setCat(item.id)}
                          >
                            {item.name}
                          </button>
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
                      <i className="fas fa-tv mr-4" />
                      Channels
                    </h4>
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
              <div className="container-fluid mt-3">
                <div className="row">
                  {items.map((item) => (
                    <ChannelBlock key={item.index} data={item} />
                  ))}
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
