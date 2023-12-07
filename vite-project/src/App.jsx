import React, { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [ritual, setRitual] = useState("");
  const [frequency, setFrequency] = useState("");
  const [weeklyGrid, setWeeklyGrid] = useState([]);
  const [ritualGrid, setRitualGrid] = useState([]);
  const [frequencyGrid, setFrequencyGrid] = useState([]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ritual") {
      setRitual(value);
    } else if (name === "frequency") {
      setFrequency(value);
    }
  };

  const handleSave = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const grid = daysOfWeek.map((day) => ({
      day,
      clicked: false, // Initialize the clicked property
    }));
    setWeeklyGrid((prevWeeklyGrid) => [...prevWeeklyGrid, grid]);
    setShowModal(false);
    setRitual("");
    setFrequency("");

    const updatedRituals = [...ritualGrid, ritual];
    setRitualGrid(updatedRituals);

    const updatedFrequencies = [...frequencyGrid, frequency];
    setFrequencyGrid(updatedFrequencies);
  };

  const handleGridItemClick = (ritualIndex, dayIndex) => {
    const updatedWeeklyGrid = [...weeklyGrid];
    updatedWeeklyGrid[ritualIndex][dayIndex].clicked =
      !updatedWeeklyGrid[ritualIndex][dayIndex].clicked;
    setWeeklyGrid(updatedWeeklyGrid);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="title">Rituals</div>
        <button className="add-button" onClick={handleButtonClick}>
          +
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Add Ritual</h2>
            <div className="input-container">
              <label htmlFor="ritual">Ritual:</label>
              <input
                type="text"
                id="ritual"
                name="ritual"
                value={ritual}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="frequency">Frequency:</label>
              <input
                type="number"
                id="frequency"
                name="frequency"
                value={frequency}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}

      {ritualGrid.map((ritualName, index) => {
        const clickedCount = weeklyGrid[index].filter(
          (item) => item.clicked
        ).length;
        return (
          <div key={index} className="ritual-row">
            <div className="ritual-item">{ritualName}</div>
            <div className="weekly-grid">
              {weeklyGrid[index].map((item, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`grid-item ${item.clicked ? "clicked" : ""}`}
                  onClick={() => handleGridItemClick(index, dayIndex)}
                >
                  {item.day}
                </div>
              ))}
            </div>
            <div className="frequency-item">
              {clickedCount}/{frequencyGrid[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
