import React, { useEffect, useState } from "react";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(Date.now());
    }, [900]);
  }, []);
  return (
    <div className="w-max p-2">
      {new Date(currentTime).toString().split("(")[0]}
    </div>
  );
}

export default CurrentTime;
