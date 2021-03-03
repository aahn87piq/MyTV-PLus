import step1 from "../assets/img/step1.jpg";
import step2 from "../assets/img/step2.jpg";
import step3 from "../assets/img/step3.jpg";
import Logo from "../assets/img/logo.svg";
import { useEffect, useRef } from "react";
export default function RegisterationInfo() {
  const RedBTN = useRef(null);
  useEffect(() => {
    function handlekeydownEvent(event) {
      const { keyCode } = event;
      if (keyCode === 8 || keyCode === 461) {
        RedBTN.current.click();
      }
    }
    document.addEventListener("keydown", handlekeydownEvent);
  }, []);
  return (
    <div className="regwrapper">
      <a ref={RedBTN} className="d-none" href="/register"></a>
      <div className="container-fluid my-2 py-4">
        <div className="row">
          <div className="col-5"></div>
          <div className="col-2">
            <img src={Logo} className="img-fluid" alt="myTV+" />
          </div>
          <div className="col-5"></div>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="row text-white text-center">
              <div className="col-4">Step 1: Open Option Menu</div>
              <div className="col-4">Step 2: Click on about section</div>
              <div className="col-4">Step 3: Insert the shown mobile id</div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <img src={step1} alt className="img-fluid" />
              </div>
              <div className="col-4">
                <img src={step2} alt className="img-fluid" />
              </div>
              <div className="col-4">
                <img src={step3} alt className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
