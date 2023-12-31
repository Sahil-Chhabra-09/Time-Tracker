import RenderTag from "../components/RenderTag";

function Timeline({
  showTimeline,
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

  return (
    <div>
      {showTimeline && (
        <div
          className=" w-52 h-64 absolute right-0 mt-9"
          style={{ backgroundColor: "rgba(32,88,109,0.8)" }}
        >
          <div className="space-x-2 border-slate-800 border-2 p-2 h-64 overflow-y-scroll z-20">
            {/* <div
              className="w-max cursor-pointer pb-2"
              onClick={() => setShowTimeline(false)}
            >
              <AiOutlineClose />
            </div> */}
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
