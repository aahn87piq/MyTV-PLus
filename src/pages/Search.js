import { useState, useEffect, useRef } from "react";
import VK from "../common/VK";
import MovieSearch from "../blocks/MovieSearch";
import SeriesSearch from "../blocks/SeriesSearch";
import ChannelBlock from "../blocks/ChannelBlock";
export default function Channels() {
  const [currentText, SetCurrentText] = useState("");
  const [searchfor, SetSearchFor] = useState("Channels");
  const [curLang, setCurlang] = useState("EN");
  const [curLayout, setCurLayout] = useState("Letters");
  const [items, setItems] = useState([]);
  const RedBTN = useRef();
  const SBREF = useRef(null);
  const ChangeSearchTyep = (item) => {
    SetSearchFor(item);
    setItems([]);
    SearchForRes(currentText);
  };
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 406) {
        SearchForRes(currentText);
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  const SearchForRes = (item) => {
    if (searchfor === "Channels") {
      fetch("https://tvapi.mytv-plus.com/Channels.php?type=search&q=" + item)
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        });
    } else if (searchfor === "Movies") {
      fetch("https://tvapi.mytv-plus.com/Movies.php?type=search&q=" + item)
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        });
    } else if (searchfor === "TV Series") {
      fetch("https://tvapi.mytv-plus.com/Series.php?type=search&q=" + item)
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        });
    } else {
      fetch(
        "https://tvapi.mytv-plus.com/Channels.php?type=search&q=" + currentText
      )
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
        });
    }
  };
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 8 || keyCode === 461) {
        RedBTN.current.click();
      } else if (keyCode === 120 || keyCode === 404) {
        SBREF.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  const resultView = () => {
    if (searchfor === "Channels") {
      return (
        <div className="channels-results seachres">
          <div className="pt-3 px-2 container seachres">
            <div className="row">
              {items.map((item) => (
                <ChannelBlock key={item.index} data={item} />
              ))}
            </div>
          </div>
        </div>
      );
    } else if (searchfor === "Movies") {
      return (
        <div className="movies-results seachres">
          <div className="pt-3 px-2 container-fluid">
            <div className="row">
              {items.map((item) => (
                <MovieSearch key={item.index} data={item} />
              ))}
            </div>
          </div>
        </div>
      );
    } else if (searchfor === "TV Series") {
      return (
        <div className="series-results seachres">
          <div className="pt-3 px-2 container-fluid">
            <div className="row">
              {items.map((item) => (
                <SeriesSearch key={item.index} data={item} />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="channels-results seachres">
          <div className="pt-3 px-2 container-fluid">
            <div className="row">
              {items.map((item) => (
                <ChannelBlock key={item.index} data={item} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div className="ContentHeader">
        <a ref={RedBTN} className="hidden" href="/app/exit"></a>
        <div className="container-fluid">
          <div className="row my-2">
            <div className="col-7">
              <h4 className="text-white font-weight-bold mt-2">
                <i className="fas fa-search mr-4" />
                Search for {searchfor}
              </h4>
            </div>
            <div className="col px-1">
              <button
                autoFocus
                className="btn btn-catpacklister btn-block rounded-pill"
                onClick={() => ChangeSearchTyep("Channels")}
              >
                <i className="fas fa-tv  float-left mt-1 ml-1" />
                {searchfor === "Channels" ? (
                  <i className="fas fa-check-circle float-right mt-1 mr-1" />
                ) : null}
                Channels
              </button>
            </div>
            <div className="col px-1">
              <button
                className="btn btn-catpacklister btn-block rounded-pill"
                onClick={() => ChangeSearchTyep("Movies")}
              >
                <i className="fas fa-film float-left mt-1 ml-1" />
                {searchfor === "Movies" ? (
                  <i className="fas fa-check-circle float-right mt-1 mr-1" />
                ) : null}
                Movies
              </button>
            </div>
            <div className="col px-1">
              <button
                className="btn btn-catpacklister btn-block rounded-pill"
                onClick={() => ChangeSearchTyep("TV Series")}
              >
                <i className="fas fa-video float-left mt-1 ml-1" />
                {searchfor === "TV Series" ? (
                  <i className="fas fa-check-circle float-right mt-1 mr-1" />
                ) : null}
                TV Series
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ContentDataChannels">
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <div className="searchresults">{resultView()}</div>
            </div>
            <div className="col-5">
              <div className="bg-dark text-white border-bottom border-white py-3 mb-5">
                <i className="fas fa-search mx-4" />
                <span id="data">{currentText}</span>
              </div>
              <VK
                lang={curLang}
                show={curLayout}
                onResultChange={(res) => SetCurrentText(res)}
              />
              <div className="keyboardrow">
                <div className="col-8 px-1">
                  {curLang == "EN" ? (
                    <button
                      className="btn btn-sm btn-keyboard btn-block"
                      type="button"
                      onClick={() => setCurlang("AR")}
                    >
                      <i className="fas fa-globe mx-4"></i>العربية
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-keyboard btn-block"
                      type="button"
                      onClick={() => setCurlang("EN")}
                    >
                      <i className="fas fa-globe mx-4"></i> English
                    </button>
                  )}
                </div>
                <div className="col-4 px-1">
                  {curLayout == "Letters" ? (
                    <button
                      className="btn btn-keyboard btn-sm btn-block"
                      type="button"
                      onClick={() => setCurLayout("Chars")}
                    >
                      123
                    </button>
                  ) : (
                    <button
                      className="btn btn-keyboard btn-sm btn-block"
                      type="button"
                      onClick={() => setCurLayout("Letters")}
                    >
                      ABC
                    </button>
                  )}
                </div>
              </div>
              <div className="keyboardrow mt-4">
                <div className="col-12 px-1">
                  <button
                    ref={SBREF}
                    className="btn btn-keyboard btn-block"
                    onClick={() => SearchForRes(currentText)}
                  >
                    <i className="fas fa-search float-left ml-1 mt-1" />
                    <i className="fas fa-circle float-right ml-1 mt-1 text-primary" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
