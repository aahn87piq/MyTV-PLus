export default function MoviesBlock(props) {
  return (
    <div className="col-4 p-2">
      <a
        data-index={props.data.index}
        className="hvr-grow rounded ms-lister"
        href={"/app/movie/" + props.data.id}
      >
        <img
          className="poster rounded p-1"
          src={"https://www.appmytv.com/image/" + props.data.logo}
          alt={props.data.name}
        />
        <div className="ms-data">
          <span className="movieheader d-block small">{props.data.name}</span>
          <hr className="bg-white mx-2" />
          <span className="text-center d-block small">
            {props.data.CATNAME}
          </span>
          <div className="mx-2">
            <div className="row no-gutters text-center">
              <div className="col-6">
                <div className="small rounded-pill border border-white m-1 py-1">
                  <i className="far fa-calendar-alt float-left mt-1 ml-2"></i>
                  {props.data.year}
                </div>
              </div>
              <div className="col-6">
                <div className="small rounded-pill border border-white m-1 py-1">
                  <i className="fas fa-star-half-alt float-left mt-1 ml-2"></i>
                  {props.data.rating}
                </div>
              </div>
              <div className="col-12">
                <div className="small rounded-pill border border-white m-1 py-1">
                  <i className="far fa-clock float-left mt-1 ml-2"></i>
                  {props.data.duration} Minutes
                </div>
              </div>
              <div className="col-12">
                <div className="small rounded-pill border border-white m-1 py-1">
                  <i className="fas fa-user-tie float-left mt-1 ml-2"></i>
                  {props.data.age}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
