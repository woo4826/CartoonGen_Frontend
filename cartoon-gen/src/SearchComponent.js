import React, { useState } from 'react';
import placeData from './data/place.json';
import moveData from './data/move.json';
import VirtualizedSelect from 'react-virtualized-select'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const SearchComponent = (props) => {
    var data = props.type === "move" ? moveData : placeData;
    const selectedResult = props.selectedResult;
    const setSelectedResults = props.setSelectedResults;
    const options = data.list;
    const [selectValue, setSelectedValue] = useState([]);

    const handleSelectResult = (item) => {
        setSelectedResults(prevList => {
            return [...prevList, item[0]]
        })
        console.log(selectedResult)
    };

    return (
        <div>
            <VirtualizedSelect
                placeholder={props.type === "move" ? "행동" : "장소"}
                width="100%"
                options={options}
                onChange={(selectValue) => handleSelectResult(selectValue.map((item) => item))}
                value={selectValue}
                multi={true}
            />
        </div>
    );
};

export default SearchComponent;