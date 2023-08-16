import useOnclickOutside from "react-cool-onclickoutside";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Timeline({ showTimeline, setShowTimeline, allTags, errorStatus }) {
  const ref = useOnclickOutside(() => {
    setShowTimeline(false);
  });

  function TagList({ tags }) {
    return (
      <div>
        {tags.map((tag) => {
          const time = tag.time;
          const hours = time !== 0 ? Math.floor(time / 3600) : 0;
          const minutes = time !== 0 ? Math.floor((time % 3600) / 60) : 0;
          const seconds = time !== 0 ? Math.floor(time % 60) : 0;
          return (
            <div key={tag._id}>
              <p>{tag.tag}</p>
              <p>{`${hours}:${minutes}:${seconds}`}</p>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div ref={ref}>
      {showTimeline && (
        <div
          className=" w-52 h-64 absolute right-0 z-10 mt-9"
          style={{ backgroundColor: "rgba(32,88,109,0.8)" }}
        >
          <div className="space-x-2 border-slate-800 border-2 p-2 h-64 overflow-y-scroll">
            {allTags.length === 0 ? (
              errorStatus ? (
                "Something went wrong. Try logging out and logging back in."
              ) : (
                "Loading..."
              )
            ) : (
              <TagList tags={allTags} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Timeline;
