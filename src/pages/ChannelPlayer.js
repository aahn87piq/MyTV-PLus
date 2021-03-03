import { useRef, useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ChannelBlock from "../blocks/ChannelBlock";
import ChannelInfo from "../common/ChannelInfo";
import MovieLoader from "../common/MovieLoader";
export default function ChannelPlayer() {
  const [cookies] = useCookies(["DevID", "IP", "userID"]);
  const [items, setItems] = useState([]);
  const [ShowList, SetShowList] = useState(false);
  const [lister, setlister] = useState([]);
  const [ShowInfo, SetShowinfo] = useState(true);
  const [isloaded, setloaded] = useState(false);
  const [NextCH, SetNEXTCH] = useState();
  const [PrevCH, SetPREVCN] = useState();
  const [isfav, Setfav] = useState();
  const [showfav, Setshowfav] = useState(false);
  const { id } = useParams();
  const playerRef = useRef();
  const RedBTN = useRef();
  const BKKEY = useRef();
  const ChDownKey = useRef();
  const ChupKey = useRef();
  const EnterKey = useRef();
  const blueKey = useRef();
  const yellowKey = useRef();
  const greenKey = useRef();
  const RedKey = useRef();

  useEffect(() => {
    setTimeout(() => {
      Setshowfav(true);
    }, 3000);
    setTimeout(() => {
      SetShowinfo(false);
      Setshowfav(false);
    }, 8000);
    fetch("https://tvapi.mytv-plus.com/Channels.php?type=view&CH=" + id)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        result.map((link) => {
          fetch(
            "https://tvapi.mytv-plus.com/Channels.php?type=nextchn&CC=" +
              link.index
          )
            .then((res) => res.json())
            .then((myitems) => {
              myitems.map((data) => {
                SetNEXTCH(data.nextchn);
                SetPREVCN(data.prev);
              });
            });
        });
      });
    fetch("https://tvapi.mytv-plus.com/Channels.php")
      .then((res) => res.json())
      .then((result) => {
        setlister(result);
      });
    fetch(
      "https://tvapi.mytv-plus.com/FavMan.php?fav=channels&action=check&item=" +
        id +
        "&user=8"
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
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 33 || keyCode === 427) {
        ChupKey.current.click();
      } else if (keyCode === 34 || keyCode === 428) {
        ChDownKey.current.click();
      } else if (keyCode === 8 || keyCode === 461) {
        BKKEY.current.click();
      } else if (keyCode === 13) {
        EnterKey.current.click();
      } else if (keyCode === 120 || keyCode === 406) {
        blueKey.current.click();
      } else if (keyCode === 121 || keyCode === 403) {
        RedKey.current.click();
      } else if (keyCode === 115 || keyCode === 405) {
        yellowKey.current.click();
        SetShowList(false);
      } else if (keyCode === 119 || keyCode === 404) {
        greenKey.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  const ChangeFav = (status) => {
    if (status) {
      fetch(
        "https://tvapi.mytv-plus.com/FavMan.php?fav=channels&action=add&item=" +
          id +
          "&user=" +
          cookies.userID
      );
    } else {
      fetch(
        "https://tvapi.mytv-plus.com/FavMan.php?fav=channels&action=remove&item=" +
          id +
          "&user=" +
          cookies.userID
      );
    }
  };
  const DoBack = () => {
    if (ShowList) {
      SetShowList(false);
    } else {
      RedBTN.current.click();
    }
  };
  const DoEnter = () => {
    if (ShowList) {
    } else {
      SetShowList(true);
      SetShowinfo(false);
    }
  };
  const DoShowLister = () => {
    SetShowList(true);
    SetShowinfo(false);
  };
  const CloseLister = () => {
    SetShowList(false);
  };
  const SetDataAndLoade = () => {
    setloaded(true);
  };
  return (
    <>
      <a
        ref={ChupKey}
        className="d-none"
        href={"/player/channel/" + NextCH}
      ></a>
      <a
        ref={ChDownKey}
        className="d-none"
        href={"/player/channel/" + PrevCH}
      ></a>
      <button className="d-none" ref={BKKEY} onClick={() => DoBack()}></button>
      <button
        className="d-none"
        ref={EnterKey}
        onClick={() => DoEnter()}
      ></button>
      <button
        className="d-none"
        ref={blueKey}
        onClick={() => DoShowLister()}
      ></button>
      <button
        className="d-none"
        ref={yellowKey}
        onClick={() => CloseLister()}
      ></button>
      <button
        className="d-none"
        ref={greenKey}
        onClick={() => ChangeFav(true)}
      ></button>
      <button
        className="d-none"
        ref={RedKey}
        onClick={() => ChangeFav(false)}
      ></button>
      {isloaded ? null : <MovieLoader />}
      <a ref={RedBTN} className="d-none" href="/app/channels"></a>
      {items.map((item) => (
        <video
          key="1"
          preload="auto"
          autoPlay
          onLoadedMetadata={() => {
            SetDataAndLoade();
          }}
          className="w-100 h-100"
          ref={playerRef}
        >
          <source src={item.CLINK} type="application/x-mpegURL" />
        </video>
      ))}
      {showfav ? (
        <div className="favdiv">
          <i
            className={
              isfav
                ? "fas fa-heart text-danger fa-3x"
                : "fas fa-heart text-white fa-3x"
            }
          />
        </div>
      ) : (
        ""
      )}
      {items.map((item) => (
        <Fragment key={item.index}>
          {ShowInfo ? <ChannelInfo data={item} /> : null}
        </Fragment>
      ))}
      {ShowList ? (
        <>
          <div className="chanlister">
            <div className="ContentHeader">
              <div className="container-fluid">
                <div className="row my-2">
                  <div className="col-6 px-1">
                    <h4 className="text-white font-weight-bold mt-2">
                      <i className="fas fa-tv mr-4" />
                      Change Channel
                    </h4>
                  </div>
                  <div className="col-3"></div>
                  <div className="col-3 px-1 mt-2">
                    <button
                      className="btn btn-white-2 rounded-pill btn-block"
                      onClick={() => SetShowList(false)}
                    >
                      <i className="far fa-times-circle float-left ml-1 mt-1" />
                      Close
                    </button>
                  </div>
                </div>
              </div>
              <div className="ContentDataChannels">
                <div className="container-fluid mt-5">
                  <div className="row">
                    {lister.map((item) => (
                      <ChannelBlock key={item.index} data={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
