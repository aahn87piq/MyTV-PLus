export default function ChannelInfo(props) {
  return (
    <div className="chaninfo">
      <div className="container-fluid text-white">
        <div className="row">
          <div className="col-2">
            <img
              className="img-fluid"
              src={"https://www.appmytv.com/image/" + props.data.CI}
              alt={props.data.CN}
            />
          </div>
          <div className="col-10 mt-4">
            <div className="row">
              <div className="col-12">
                <h2>{props.data.CN}</h2>
              </div>
              <div className="col-12 mt-2">
                <h4 className="py-1">
                  <span id="chnlang">{props.data.CLANG}</span>
                  <span className="mx-2">|</span>
                  <span id="chncat">{props.data.CCAT}</span>
                  <span className="mx-2">|</span>
                  <span id="chnpack">{props.data.CPACK}</span>
                </h4>
              </div>
              <div className="col-3 mt-3">
                <span className="d-block text-white">
                  <i className="fas fa-circle text-success mr" /> Add To
                  Favourite
                </span>
              </div>
              <div className="col-3 mt-3">
                <span className="d-block text-white">
                  <i className="fas fa-circle text-danger mr" /> Remove From
                  Favourite
                </span>
              </div>
              <div className="col-3 mt-3">
                <span className="d-block text-white">
                  <i className="fas fa-circle text-primary mr" /> Change Channel
                </span>
              </div>
              <div className="col-3 mt-3">
                <span className="d-block text-white">
                  <i className="fas fa-circle text-warning mr" /> Close Menu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
