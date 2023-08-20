import { AiOutlineClose } from "react-icons/ai";
import RenderTag from "../components/RenderTag";
import useOnclickOutside from "react-cool-onclickoutside";

function Timeline({
  showTimeline,
  setShowTimeline,
  allTags,
  setAllTags,
  errorStatus,
  isLoading,
}) {
  function TagList({ tags }) {
    return (
      <div>
        {tags.map((tag) => (
          <RenderTag tag={tag} setAllTags={setAllTags} key={tag._id} />
        ))}
      </div>
    );
  }

  const ref = useOnclickOutside(() => {
    setShowTimeline(false);
  });

  return (
    <div className="z-20">
      {showTimeline && (
        <div
          className=" w-52 h-64 absolute right-0 mt-9"
          style={{ backgroundColor: "rgba(32,88,109,0.8)" }}
          ref={ref}
        >
          <div className="space-x-2 border-slate-800 border-2 p-2 h-64 overflow-y-scroll">
            <div
              className="w-max cursor-pointer pb-2"
              onClick={() => setShowTimeline(false)}
            >
              <AiOutlineClose />
            </div>
            {allTags.length === 0 ? (
              errorStatus ? (
                "Something went wrong. Try logging out and logging back in."
              ) : isLoading ? (
                "Loading..."
              ) : (
                "No timeline present"
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
