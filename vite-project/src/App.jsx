// App.jsx
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
      ritual,
      frequency,
    }));
    setWeeklyGrid(grid);
    setShowModal(false);
    setRitual("");
    setFrequency("");

    const updatedRituals = [...ritualGrid, ritual];
    setRitualGrid(updatedRituals);

    const updatedFrequencies = [...frequencyGrid, frequency];
    setFrequencyGrid(updatedFrequencies);
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

      <div className="grid-container">
        <div className="ritual-grid">
          {ritualGrid.map((ritualName, index) => (
            <div key={index} className="ritual-item">
              {ritualName}
            </div>
          ))}
        </div>

        <div className="frequency-grid">
          {frequencyGrid.map((freq, index) => (
            <div key={index} className="frequency-item">
              {freq}
            </div>
          ))}
        </div>
      </div>

      <div className="weekly-grid">
        {weeklyGrid.map((item, index) => (
          <div key={index} className="grid-item">
            <div>{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
