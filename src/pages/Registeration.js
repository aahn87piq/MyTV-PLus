import { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import VK from "../common/VK";
import Logo from "../assets/img/logo.svg";
export default function Registeration() {
  const [cookies] = useCookies(["DevID", "DevBrand", "IP", "userID", "DevMod"]);
  const RegBTN = useRef(null);
  const InfBTN = useRef(null);
  const [isregistered, SetIR] = useState(false);
  const [isLoader, SetIsLoader] = useState(false);
  const [imei, SetIMEI] = useState("");
  const [registermessage, SetRM] = useState(
    "Your device had been register successfully"
  );
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 406) {
        RegisterNOW();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  const [RegAlert, SetRegAler] = useState("success");
  const RegisterNOW = () => {
    if (imei === "") {
      SetIR(true);
      SetRM("Please Fill the mobile ID field to register");
      SetRegAler("warning");
    } else {
      SetIsLoader(true);
      fetch(
        "https://tvapi.mytv-plus.com/UserRegiseration.php?mac=" +
          cookies.DevID +
          "&imei=" +
          imei +
          "&ip=" +
          cookies.IP +
          "&devmod=" +
          cookies.DevMod +
          "&devname=" +
          cookies.DevBrand
      )
        .then((res) => res.json())
        .then((result) => {
          SetIsLoader(false);
          result.map((item) => {
            if (item.id === 1) {
              SetIR(true);
              SetRM(item.mes);
              SetRegAler("success");
              setTimeout(() => {
                InfBTN.current.click();
              }, 5000);
            } else {
              SetIR(true);
              SetRM(item.mes);
              SetRegAler("danger");
            }
          });
        });
    }
  };
  return (
    <div className="regwrapper">
      <a ref={InfBTN} className="d-none" href="/app">
        DDD
      </a>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-5"></div>
          <div className="col-2">
            <img src={Logo} className="img-fluid" alt="myTV+" />
          </div>
          <div className="col-5"></div>
        </div>
        <div className="row mt-1">
          <div className="col-12">
            <h4 className="text-white text-center">
              Please visit{" "}
              <span className="text-mainpink">https://mytv-plus.com/</span> and
              download the mobile version
            </h4>
          </div>
          <div className="col-12 mt-1">
            <h5 className="mt-2 text-white text-center">
              From the about section insert the ID in the field below
              <a
                className="btn btn-sm px-4 btn-mainpink rounded-pill mx-2 my-2"
                href="/register/howto"
              >
                More Info
              </a>
            </h5>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="bg-dark text-white border-bottom border-white py-3">
              <i className="fas fa-keyboard mx-4" />
              <span id="data">{imei}</span>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row mt-1">
          <div className="col-3"></div>
          <div className="col-6">
            <VK
              lang="EN"
              show="Letters"
              onResultChange={(res) => SetIMEI(res)}
            />
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row mt-1">
          <div className="col-3"></div>
          <div className="col-6">
            <button
              autoFocus
              ref={RegBTN}
              className="btn btn-white-2 btn-block"
              onClick={() => RegisterNOW()}
            >
              <i className="fas fa-circle float-left ml-1 mt-1 text-primary" />
              Register Device
            </button>
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-6 text-center">
            {isLoader ? (
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : isregistered ? (
              <div className={"alert alert-" + RegAlert + " text-center"}>
                {registermessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
