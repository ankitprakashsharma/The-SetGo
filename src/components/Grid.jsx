import React, { useState, useEffect } from "react";
import { workoutProgram as training_plan } from "../utils/index.js";
import WorkoutCard from "./WorkoutCard";

export default function Grid() {
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
    const entry = savedWorkouts[val];
    return entry.isComplete;
  });

  function handleSave(index, data) {
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete,
      },
    };
    setSavedWorkouts(newObj);
    localStorage.setItem("setgo", JSON.stringify(newObj));
    setSelectedWorkout(null); // Reset selection after saving
  }

  function handleComplete(index, data) {
    const newObj = { ...data, isComplete: true };
    handleSave(index, newObj);
  }

  useEffect(() => {
    const savedData = localStorage.getItem("setgo");
    if (savedData) {
      setSavedWorkouts(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="training-plan-grid">
      {Object.keys(training_plan).map((workout, workoutIndex) => {
        const isLocked =
          workoutIndex === 0
            ? false
            : !completedWorkouts.includes(`${workoutIndex - 1}`);

        const type =
          workoutIndex % 3 === 0
            ? "Push"
            : workoutIndex % 3 === 1
            ? "Pull"
            : "Legs";

        const trainingPlan = Array.isArray(training_plan)
          ? training_plan[workoutIndex]
          : training_plan[workout];

        const dayNum =
          workoutIndex + 1 < 10 ? "0" + (workoutIndex + 1) : workoutIndex + 1;

        const icon =
          workoutIndex % 3 === 0 ? (
            <i className="fa-solid fa-dumbbell"></i>
          ) : workoutIndex % 3 === 1 ? (
            <i className="fa-solid fa-weight-hanging"></i>
          ) : (
            <i className="fa-solid fa-bolt"></i>
          );

        // Selected workout card
        if (workoutIndex === selectedWorkout) {
          return (
            <WorkoutCard
              savedWeights={savedWorkouts?.[workoutIndex]?.weights || {}}
              key={workoutIndex}
              trainingPlan={trainingPlan}
              workoutIndex={workoutIndex}
              type={type}
              icon={icon}
              handleSave={handleSave}
              handleComplete={handleComplete}
              dayNum={dayNum}
              goBack={() => setSelectedWorkout(null)} // <-- add this
            />
          );
        }

        // Locked/Inactive card
        return (
          <button
            onClick={() => !isLocked && setSelectedWorkout(workoutIndex)}
            className={"card plan-card" + (isLocked ? " inactive" : "")}
            key={workoutIndex}
            disabled={isLocked}
          >
            <div className="plan-card-header">
              <p>Day {dayNum}</p>
              {isLocked ? <i className="fa-solid fa-lock"></i> : icon}
            </div>
            <div className="plan-card-header">
              <h4>
                <b>{type}</b>
              </h4>
            </div>
          </button>
        );
      })}
    </div>
  );
}
