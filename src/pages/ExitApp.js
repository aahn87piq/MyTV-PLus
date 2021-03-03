import { useEffect, useRef } from "react";
export default function ExitApp() {
  const RedBTN = useRef();
  const AppExit = () => {
    window.close();
  };
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 8 || keyCode === 461) {
        AppExit();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  return (
    <>
      <div className="ContentHeader">
        <div className="container-fluid">
          <div className="row my-2">
            <div className="col-12">
              <h4 className="text-white font-weight-bold mt-2">
                <i className="fas fa-door-open mr -4" /> Exit Application
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="ContentData">
        <div className="container-fluid my-3 py-3">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="col-12 my-3 py-3">
                <h5 className="text-white">
                  Do you want to exit application??
                </h5>
              </div>
              <div className="col-12 my-3 py-3">
                <button
                  autoFocus
                  className="btn btn-white-2 btn-block rounded-pill font-weight-bold"
                  onClick={() => AppExit()}
                >
                  Yes
                </button>
              </div>
              <div className="col-12 my-3 py-3">
                <a
                  className="btn btn-white-2 btn-block rounded-pill font-weight-bold"
                  href="/app/channels"
                >
                  No
                </a>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
