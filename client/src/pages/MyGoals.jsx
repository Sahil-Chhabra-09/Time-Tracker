import { Button } from "@mui/material";
import RenderTag from "../components/RenderTag";
import RenderModal from "../components/RenderModal";
import { useState } from "react";
import GoalFlow from "../GoalFlow/GoalFlow";

function MyGoals({
  showGoals,
  setShowGoals,
  allGoals,
  setAllGoals,
  errorStatus,
  isLoading,
}) {
  function TagList({ goals }) {
    return (
      <div>
        {goals.map((tag) => (
          <RenderTag
            tag={tag}
            setAllTags={setAllGoals}
            key={tag._id}
            isGoals={true}
          />
        ))}
      </div>
    );
  }

  const [showGoalModal, setShowGoalModal] = useState(false);

  return (
    <div>
      {showGoals && (
        <div
          className=" w-52 h-64 absolute right-0 mt-9"
          style={{ backgroundColor: "rgba(32,88,109,0.8)" }}
        >
          <div className="space-x-2 border-slate-800 border-2 p-2 h-64 overflow-y-scroll relative ">
            <div className="h-full relative flex justify-between flex-col z-20">
              {allGoals.length === 0 ? (
                errorStatus ? (
                  "Something went wrong. Try logging out and logging back in."
                ) : isLoading ? (
                  "Loading..."
                ) : (
                  "No Goals present"
                )
              ) : (
                <TagList goals={allGoals} />
              )}
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "1px solid white",
                  backgroundColor: "rgb(32,88,109)",
                  "&:hover": {
                    border: "1px solid white",
                    backgroundColor: "rgb(32,88,109)",
                  },
                  position: "sticky",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  marginTop: "20px",
                }}
                onClick={() => {
                  setShowGoalModal(true);
                  setShowGoals(false);
                }}
              >
                Add Goal
              </Button>
            </div>
          </div>
        </div>
      )}
      {showGoalModal && (
        <RenderModal open={showGoalModal}>
          <GoalFlow setShowGoalModal={setShowGoalModal} />
        </RenderModal>
      )}
    </div>
  );
}

export default MyGoals;
