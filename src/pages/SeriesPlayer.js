import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MovieLoader from "../common/MovieLoader";
export default function SeriesPlayer() {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const { series } = useParams();
  const [metadata, setMetadata] = useState(0);
  const [curTime, SetCurtime] = useState(0);
  const [ShowControls, SetShowControls] = useState(false);
  const [btnplay, setPlayBtn] = useState(false);
  const [isloaded, setloaded] = useState(false);
  const playerRef = useRef();
  const BKKEY = useRef();
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 40) {
        SetShowControls(true);
      } else if (keyCode === 38) {
        SetShowControls(false);
      } else if (keyCode === 417 || keyCode === 102) {
        if (playerRef.current.currentTime >= playerRef.current.duration) {
          playerRef.current.currentTime = playerRef.current.duration;
          SetCurtime(playerRef.current.duration);
        } else {
          playerRef.current.currentTime = playerRef.current.currentTime + 60;
          SetCurtime(playerRef.current.currentTime + 60);
        }
        PauseMovie();
      } else if (keyCode === 412 || keyCode === 100) {
        if (playerRef.current.currentTime <= 60) {
          playerRef.current.currentTime = 0;
          SetCurtime(0);
        } else {
          playerRef.current.currentTime = playerRef.current.currentTime - 60;
          SetCurtime(playerRef.current.currentTime - 60);
        }
      } else if (keyCode === 415 || keyCode === 105) {
        playerRef.current.play();
        setPlayBtn(false);
      } else if (keyCode === 19 || keyCode === 103) {
        playerRef.current.pause();
        setPlayBtn(true);
      } else if (keyCode === 413 || keyCode === 96) {
        playerRef.current.pause();
        setPlayBtn(true);
        playerRef.current.currentTime = 0;
        SetCurtime(0);
      } else if (keyCode === 463) {
        ChangePlayerState();
      } else if (keyCode === 8 || keyCode === 461) {
        BKKEY.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);

    fetch("https://tvapi.mytv-plus.com/Episodes.php?id=" + id)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);
  const ChangePlayerState = () => {
    if (btnplay) {
      playerRef.current.play();
      setPlayBtn(false);
    } else {
      playerRef.current.pause();
      setPlayBtn(true);
    }
  };
  const PlayMovie = () => {
    playerRef.current.play();
    setPlayBtn(false);
  };
  const PauseMovie = () => {
    playerRef.current.pause();
    setPlayBtn(true);
  };
  const StopMovie = () => {
    playerRef.current.pause();
    setPlayBtn(true);
    playerRef.current.currentTime = 0;
    SetCurtime(0);
  };
  const FastForward = () => {
    if (playerRef.current.currentTime >= playerRef.current.duration) {
      playerRef.current.currentTime = playerRef.current.duration;
      SetCurtime(playerRef.current.duration);
    } else {
      playerRef.current.currentTime = playerRef.current.currentTime + 60;
      SetCurtime(playerRef.current.currentTime + 60);
    }
    PauseMovie();
  };
  const Rewind = () => {
    if (playerRef.current.currentTime <= 60) {
      playerRef.current.currentTime = 0;
      SetCurtime(0);
    } else {
      playerRef.current.currentTime = playerRef.current.currentTime - 60;
      SetCurtime(playerRef.current.currentTime - 60);
    }
  };
  const SetDataAndLoade = (params) => {
    setMetadata(params);
    setloaded(true);
  };
  return (
    <>
      {isloaded ? null : <MovieLoader />}
      <a className="d-none" ref={BKKEY} href={"/app/seriesview/" + series}></a>
      {items.map((item) => (
        <video
          key="1"
          preload="auto"
          autoPlay
          onLoadedMetadata={() => {
            SetDataAndLoade(playerRef.current.duration);
          }}
          onTimeUpdate={(e) => SetCurtime(e.target.currentTime)}
          onEnded={() => StopMovie()}
          className="w-100 h-100"
          ref={playerRef}
        >
          <source src={item.link} type="video/mp4" />
        </video>
      ))}
      {ShowControls ? (
        <div className="controlsarea">
          <div className="containert-fluid">
            <div className="row">
              <div className="col-12 px-3">
                <div className="progress mx-4">
                  <div
                    className="progress-bar bg-mainpink"
                    role="progressbar"
                    style={{ width: (curTime / metadata) * 100 + "%" }}
                    aria-valuenow={curTime}
                    aria-valuemin={0}
                    aria-valuemax={metadata}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4"></div>
              <div className="col-1 text-center">
                <button
                  className="playercontrol rounded-circle"
                  onClick={() => Rewind()}
                >
                  <i className="fas fa-2x fa-backward" />
                </button>
              </div>
              <div className="col-2 text-center">
                {btnplay ? (
                  <button
                    autoFocus
                    className="playercontrol lg rounded-circle"
                    onClick={() => PlayMovie()}
                  >
                    <i className="fas fa-4x fa-play" />
                  </button>
                ) : (
                  <button
                    autoFocus
                    className="playercontrol lg rounded-circle"
                    onClick={() => PauseMovie()}
                  >
                    <i className="fas fa-4x fa-pause" />
                  </button>
                )}
              </div>
              <div className="col-1 text-center">
                <button
                  className="playercontrol rounded-circle"
                  onClick={() => FastForward()}
                >
                  <i className="fas fa-2x fa-forward" />
                </button>
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
