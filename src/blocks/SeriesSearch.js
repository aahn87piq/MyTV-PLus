export default function SeriesBlock(props) {
  return (
    <div className="col-4 p-2">
      <a
        data-index={0}
        className="hvr-grow rounded ms-lister"
        href={"/app/seriesview/" + props.data.serid}
      >
        <img
          className="img-fluid rounded p-1"
          src={"https://www.appmytv.com/image/" + props.data.logo}
          alt={props.data.name}
        />
        <div className="ms-data">
          <p className="movieheader">{props.data.name}</p>
          <hr className="bg-white mx-2" />
          <p className="movieheader">
            <span className="small">{props.data.CATNAME}</span>
          </p>
          <div className="mx-2">
            <div className="row no-gutters text-center">
              <div className="col-12">
                <div className="small rounded-pill border border-white m-1 py-1">
                  <i className="far fa-calendar-alt float-left mt-1 ml-2"></i>
                  {props.data.year}
                </div>
              </div>
              <div className="col-12">
                <div className="small rounded-pill border border-white m-1 py-1">
                  <i className="fas fa-star-half-alt float-left mt-1 ml-2"></i>
                  {props.data.rating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
