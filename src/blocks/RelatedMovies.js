import { useEffect, useState } from "react";
export default function RelatedMovies(props) {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch("https://tvapi.mytv-plus.com/Movies.php?type=view&MV=" + props.tag)
      .then((res) => res.json())
      .then((result) => {
        setMovie(result);
      });
  }, []);
  return (
    <>
      {movie.map((item) => (
        <div className="col-2 p-2">
          <a
            data-index={item.index}
            className="hvr-grow rounded ms-lister"
            href={"/app/movie/" + item.id}
          >
            <img
              className="poster rounded p-1"
              src={"https://www.appmytv.com/image/" + item.logo}
              alt={item.name}
            />
            <div className="ms-data">
              <p className="movieheader">{item.name}</p>
              <hr className="bg-white mx-2" />
              <p className="movieheader">
                <span className="small">{item.CATNAME}</span>
              </p>
              <div className="mx-2">
                <div className="row no-gutters text-center">
                  <div className="col-6">
                    <div className="small rounded-pill border border-white m-1 py-1">
                      <i className="far fa-calendar-alt float-left mt-1 ml-2"></i>
                      {item.year}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="small rounded-pill border border-white m-1 py-1">
                      <i className="fas fa-star-half-alt float-left mt-1 ml-2"></i>
                      {item.rating}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="small rounded-pill border border-white m-1 py-1">
                      <i className="far fa-clock float-left mt-1 ml-2"></i>
                      {item.duration} Minutes
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="small rounded-pill border border-white m-1 py-1">
                      <i className="fas fa-user-tie float-left mt-1 ml-2"></i>
                      {item.age}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}
