export default function ChannelBlock(props) {
  return (
    <div className="col-2 p-3">
      <a
        className="rounded channellink hvr-grow"
        data-index={props.data.index}
        href={"/player/channel/" + props.data.CID}
      >
        <img
          className="img-fluid"
          src={"https://www.appmytv.com/image/" + props.data.CI}
          alt={props.data.CN}
        />
      </a>
    </div>
  );
}
