import React, { useState } from "react";
import placeData from "./data/place.json";
import moveData from "./data/move.json";
import VirtualizedSelect from "react-virtualized-select";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

const SearchComponent = (props) => {
  var data = props.type === "move" ? moveData : placeData;
  const selectedResult = props.selectedResult;
  const setSelectedResults = props.setSelectedResults;
  const setString = props.setString;
  const options = data.list;
  const [selectValue, setSelectedValue] = useState([]);
  const [backgroundSelected, setBackgroundSelected] = useState(false);

  const handleBackgroundSelection = (event) => {
    setBackgroundSelected(event.target.checked);
  };

  const handleSelectResult = (item) => {
    setString((prevString) => {
      return prevString + (prevString !== "" ? ", " : "") + item[0].value;
    });
    // setSelectedResults(prevList => {
    //     return [...prevList, item[0]]
    // })
    // console.log(selectedResult)
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {props.type !== "move" && (
        <div style={{ flex: 0.9, marginRight: 10, marginTop: 5 }}>
          <label>
            <input
              type="checkbox"
              checked={backgroundSelected}
              onChange={handleBackgroundSelection}
            />
            배경 없애기
          </label>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <VirtualizedSelect
          placeholder={props.type === "move" ? "행동" : "장소"}
          width="100%"
          options={options}
          onChange={(selectValue) =>
            handleSelectResult(selectValue.map((item) => item))
          }
          value={selectValue}
          multi={true}
          disabled={!props.type === "move" || backgroundSelected}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
