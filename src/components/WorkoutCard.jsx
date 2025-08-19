import React, { useState } from "react";
import { exerciseDescriptions } from "../utils";
import Modal from "./Modal";

export default function WorkoutCard(props) {
  // Ensure warmup & workout always exist
  const {
    trainingPlan,
    workoutIndex,
    type,
    icon,
    dayNum,
    savedWeights,
    handleSave,
    handleComplete,
  } = props;
  const { warmup, workout } = trainingPlan || {};
  const [showExerciseDescription, setShowExerciseDescription] = useState(null);
  const [weights, setWeights] = useState(savedWeights || {});

  function handleAddWeight(title, weight) {
    const newObj = {
      ...weights,
      [title]: weight,
    };
    setWeights(newObj);
  }

  //   const showExerciseDescription = {
  //     name: "sdcsdv",
  //     description: "sdcv sdv sdv",
  //   };

  return (
    <div className="workout-container">
      {/* Modal Example */}
      {showExerciseDescription && (
        <Modal
          showExerciseDescription={showExerciseDescription}
          handleCloseModal={() => {
            setShowExerciseDescription(null);
          }}
        />
      )}

      {/* Workout Card Header */}
      <div className="workout-card card">
        <div className="plan-card-header">
          <p>Day {dayNum}</p>
          {icon}
        </div>
        <div className="plan-card-header">
          <h2>
            <b>{type} Workout</b>
          </h2>
        </div>
      </div>

      {/* Warmup Section */}
      <div className="workout-grid">
        <div className="exercise-name">
          <h4>Warmup</h4>
        </div>
        <h6>Sets</h6>
        <h6>Reps</h6>
        <h6 className="weight-input">Max Weight</h6>

        {warmup.map((warmupExercise, warmupIndex) => (
          <React.Fragment key={warmupIndex}>
            <div className="exercise-name">
              <p>
                {warmupIndex + 1}. {warmupExercise.name}
              </p>
              <button
                onClick={() =>
                  setShowExerciseDescription({
                    name: warmupExercise.name,
                    description: exerciseDescriptions[warmupExercise.name],
                  })
                }
                className="help-icon"
              >
                <i className="fa-regular fa-circle-question"></i>
              </button>
            </div>
            <p className="exercise-info">{warmupExercise.sets}</p>
            <p className="exercise-info">{warmupExercise.reps}</p>
            <input className="weight-input" placeholder="N/A" disabled />
          </React.Fragment>
        ))}
      </div>

      {/* Workout Section */}
      <div className="workout-grid">
        <div className="exercise-name">
          <h4>Workout</h4>
        </div>
        <h6>Sets</h6>
        <h6>Reps</h6>
        <h6 className="weight-input">Max Weight</h6>

        {workout.map((workoutExercise, windex) => (
          <React.Fragment key={windex}>
            <div className="exercise-name">
              <p>
                {windex + 1}. {workoutExercise.name}
              </p>
              <button
                onClick={() =>
                  setShowExerciseDescription({
                    name: workoutExercise.name,
                    description: exerciseDescriptions[workoutExercise.name],
                  })
                }
                className="help-icon"
              >
                <i className="fa-regular fa-circle-question"></i>
              </button>
            </div>
            <p className="exercise-info">{workoutExercise.sets}</p>
            <p className="exercise-info">{workoutExercise.reps}</p>
            <input
              value={weights[workoutExercise.name] || ""}
              onChange={(e) =>
                handleAddWeight(workoutExercise.name, e.target.value)
              }
              className="weight-input"
              placeholder="14"
            />
          </React.Fragment>
        ))}
      </div>

      {/* Buttons */}
      <div className="workout-buttons">
        <button
          onClick={() => {
            handleSave(workoutIndex, { weights });
          }}
        >
          Save & Exit
        </button>
        <button
          onClick={() => {
            handleComplete(workoutIndex, { weights });
          }}
          disabled={Object.keys(weights).length !== workout.length}
        >
          Complete
        </button>
      </div>
    </div>
  );
}
