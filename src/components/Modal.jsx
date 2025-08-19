import ReactDOM from "react-dom";

export default function Modal({ showExerciseDescription, handleCloseModal }) {
  if (!showExerciseDescription) return null; // don't render if no data

  const { name = "", description = "" } = showExerciseDescription;

  return ReactDOM.createPortal(
    <div className="modal-container">
      <button className="modal-underlay" onClick={handleCloseModal} />
      <div className="modal-content">
        <h6>Name</h6>
        <h2 className="skill-name">
          {name ? name.replaceAll("-", " ") : "No name"}
        </h2>
        <h6>Description</h6>
        <p>{description || "No description available"}</p>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
