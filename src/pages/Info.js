import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
export default function Info() {
  const [cookies] = useCookies(["DevID", "IP", "userID"]);
  const RedBTN = useRef();
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 8 || keyCode === 1536) {
        RedBTN.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  return (
    <>
      <div className="ContentHeader">
        <a ref={RedBTN} className="hidden" href="/app/exit"></a>
        <div className="container-fluid">
          <div className="row my-2">
            <div className="col-12">
              <h4 className="text-white font-weight-bold mt-2">
                <i className="fas fa-info mr-4" /> System Info
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="ContentData text-white">
        <div className="contianer-fluid">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="card bg-dark rounded border">
                <div className="card-body">
                  <div className="row py-3 border-bottom ">
                    <div className="col-3">User ID :</div>
                    <div className="col-9">{cookies.userID}</div>
                  </div>
                  <div className="row py-3 border-bottom ">
                    <div className="col-3">MAC Address :</div>
                    <div className="col-9">{cookies.DevID}</div>
                  </div>
                  <div className="row py-3 border-bottom ">
                    <div className="col-3">IP Address : </div>
                    <div className="col-9">{cookies.IP}</div>
                  </div>
                  <div className="row py-3 border-bottom ">
                    <div className="col-3">Version : </div>
                    <div className="col-9">2.1.4 - beta</div>
                  </div>
                  <div className="row py-3">
                    <div className="col-12 text-center">
                      For support please contact us:&nbsp;
                      <b>
                        <i>support@mytvplus.net</i>
                      </b>
                      &nbsp;or call&nbsp;
                      <b>
                        <i>00964 66 231 2222</i>
                      </b>
                      &nbsp;-&nbsp;
                      <b>
                        <i>00964 66 231 4444</i>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
