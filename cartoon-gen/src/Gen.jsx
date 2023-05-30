import "./App.css";
import React, { useState } from "react";
import VirtualizedSelect from "react-virtualized-select";
import SearchComponent from "./SearchComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import logo1 from "./img/logo1.jpg"
import logo2 from "./img/logo2.png"

function Gen() {
  const navigate = useNavigate();
  // <lora:byeori:0.75> <lora:garam:0.75> <lora:muni:0.75> <lora:taetae:0.75>
  const options = [
    { label: "lora1", value: " <lora:byeori:0.75>," },
    { label: "lora2", value: " <lora:garam:0.75>," },
    { label: "lora3", value: " <lora:muni:0.75>," },
    { label: "lora4", value: " <lora:taetae:0.75>," },
  ];

  const [image1, setImage1] = useState("");
  const [selectedLora1, setSelecteLora1] = useState("");
  const [selectedLora2, setSelecteLora2] = useState("");
  const [selectedLora3, setSelecteLora3] = useState("");
  const [selectedLora4, setSelecteLora4] = useState("");
  const [selectedResult1, setSelectedResults1] = useState([]);
  const [selectedResult2, setSelectedResults2] = useState([]);
  const [selectedResult3, setSelectedResults3] = useState([]);
  const [selectedResult4, setSelectedResults4] = useState([]);
  const generate = async () => {
    console.log(makePrompt(selectedResult1), selectedLora1.value);
    console.log(makePrompt(selectedResult2), selectedLora2.value);
    console.log(makePrompt(selectedResult3), selectedLora3.value);
    console.log(makePrompt(selectedResult4), selectedLora4.value);
    axios
      .post("http://127.0.0.1:8000/fastapi/make", {
        prompt: [
          makePrompt(selectedResult1) + selectedLora1.value,
          makePrompt(selectedResult2) + selectedLora2.value,
          makePrompt(selectedResult3) + selectedLora3.value,
          makePrompt(selectedResult4) + selectedLora4.value,
        ],
      })
      .then((response) => {
        console.log(response);
        // setImage1(response.data.image1);
        // setImage1(decodeBase64(response.data.images[0]));
        navigate("/result", {
          state: {
            image0: response.data.images[0],
            image1: response.data.images[1],
            image2: response.data.images[2],
            image3: response.data.images[3],
          },
        });
      })
      .catch((error) => {
        console.log(error);
        // navigate("/result");
      });
  };
  const makePrompt = (stringList) => {
    let prompt = "";
    stringList.forEach((string) => {
      prompt += string.value + ", ";
    });
    return prompt;
  };
  const loraSelector = (selectedLora, setSelecteLora) => {
    return (
      <div className="lora_select">
        <VirtualizedSelect
          options={options}
          onChange={(selectValue) => setSelecteLora(selectValue)}
          value={selectedLora}
        />
      </div>
    );
  };
  const handleDeleteResult = (index, sR, setSR) => {
    const updatedResults = sR.filter((_, i) => i !== index);
    setSR(updatedResults);
  };
  return (
    <div className="App">
      <h1>카툰 제너레이터</h1>
      <div className="userInpuWrapper">
        <div className="cutWrapper_row">
          <div className="cutWrapper">
            <div className="cut_row">
              <div className="cut">
                <SearchComponent
                  type="place"
                  selectedResult={selectedResult1}
                  setSelectedResults={setSelectedResults1}
                />
              </div>
              <div className="cut">
                <SearchComponent
                  type="move"
                  selectedResult={selectedResult1}
                  setSelectedResults={setSelectedResults1}
                />
              </div>
            </div>
            {/*
            <ul>
              {selectedResult1.map((result, index) => (
                <li key={index}>
                  {result.label} {result.value}
                  <button
                    onClick={() =>
                      handleDeleteResult(
                        index,
                        selectedResult1,
                        setSelectedResults1
                      )
                    }
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
             */}

            {selectedResult1.map((result, index) => (
            <React.Fragment key={index}>
                {index > 0 && ", "} {/* 쉼표와 공백 */}
                {result.label} {result.value}
            </React.Fragment>
            ))}
            {loraSelector(selectedLora1, setSelecteLora1)}
          </div>

          <div className="cutWrapper">
            <div className="cut_row">
              <div className="cut">
                <SearchComponent
                  type="place"
                  selectedResult={selectedResult2}
                  setSelectedResults={setSelectedResults2}
                />
              </div>
              <div className="cut">
                <SearchComponent
                  type="move"
                  selectedResult={selectedResult2}
                  setSelectedResults={setSelectedResults2}
                />
              </div>
            </div>
            {/*<ul>
              {selectedResult2.map((result, index) => (
                <li key={index}>
                  {result.label} {result.value}
                  <button
                    onClick={() =>
                      handleDeleteResult(
                        index,
                        selectedResult2,
                        setSelectedResults2
                      )
                    }
                  >
                    삭제
                  </button>
                </li>
              ))}
                </ul>*/}
            {selectedResult2.map((result, index) => (
            <React.Fragment key={index}>
                {index > 0 && ", "} {/* 쉼표와 공백 */}
                {result.label} {result.value}
            </React.Fragment>
            ))}
            {loraSelector(selectedLora2, setSelecteLora2)}
          </div>
        </div>
        <div className="cutWrapper_row">
          <div className="cutWrapper">
            <div className="cut_row">
              <div className="cut">
                <SearchComponent
                  type="place"
                  selectedResult={selectedResult3}
                  setSelectedResults={setSelectedResults3}
                />
              </div>
              <div className="cut">
                <SearchComponent
                  type="move"
                  selectedResult={selectedResult3}
                  setSelectedResults={setSelectedResults3}
                />
              </div>
            </div>
            {/*<ul>
              {selectedResult3.map((result, index) => (
                <li key={index}>
                  {result.label} {result.value}
                  <button
                    onClick={() =>
                      handleDeleteResult(
                        index,
                        selectedResult3,
                        setSelectedResults3
                      )
                    }
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>*/}
            {selectedResult3.map((result, index) => (
            <React.Fragment key={index}>
                {index > 0 && ", "} {/* 쉼표와 공백 */}
                {result.label} {result.value}
            </React.Fragment>
            ))}
            {loraSelector(selectedLora3, setSelecteLora3)}
          </div>

          <div className="cutWrapper">
            <div className="cut_row">
              <div className="cut">
                <SearchComponent
                  type="place"
                  selectedResult={selectedResult4}
                  setSelectedResults={setSelectedResults4}
                />
              </div>
              <div className="cut">
                <SearchComponent
                  type="move"
                  selectedResult={selectedResult4}
                  setSelectedResults={setSelectedResults4}
                />
              </div>
            </div>
            {/*<ul>
              {selectedResult4.map((result, index) => (
                <li key={index}>
                  {result.label} {result.value}
                  <button
                    onClick={() =>
                      handleDeleteResult(
                        index,
                        selectedResult4,
                        setSelectedResults4
                      )
                    }
                  >
                    삭제
                  </button>
                </li>
              ))}
                </ul>*/}
                {selectedResult4.map((result, index) => (
            <React.Fragment key={index}>
                {index > 0 && ", "} {/* 쉼표와 공백 */}
                {result.label} {result.value}
            </React.Fragment>
            ))}
            {loraSelector(selectedLora4, setSelecteLora4)}
          </div>
        </div>
      </div>

      <div>
        <button onClick={generate}>제너레이트</button>
      </div>
      <div>
        <img src={"data:image/jpeg;base64," + image1.data} />
      </div>
      <img src={logo1} width={200}/>
      <img src={logo2} width={100} />
    </div>
  );
}

export default Gen;
