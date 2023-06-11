import "./App.css";
import React, { useState } from "react";
import VirtualizedSelect from "react-virtualized-select";
import SearchComponent from "./SearchComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import logo1 from "./img/logo1.jpg";
import logo2 from "./img/logo2.png";
import Loading from "./Loading";
function Gen() {
  const navigate = useNavigate();
  // <lora:byeori:0.75> <lora:garam:0.75> <lora:muni:0.75> <lora:taetae:0.75>
  const options = [
    { label: "별이", value: " <lora:byeori:0.75>," },
    { label: "가람", value: " <lora:garam:0.75>," },
    { label: "무니", value: " <lora:muni:0.75>," },
    { label: "태태", value: " <lora:taetae:0.75>," },
  ];

  const [image1, setImage1] = useState("");
  const [selectedLora1, setSelecteLora1] = useState("");
  const [selectedLora2, setSelecteLora2] = useState("");
  const [selectedLora3, setSelecteLora3] = useState("");
  const [selectedLora4, setSelecteLora4] = useState("");
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [string3, setString3] = useState("");
  const [string4, setString4] = useState("");
  const [selectedResult1, setSelectedResults1] = useState([]);
  const [selectedResult2, setSelectedResults2] = useState([]);
  const [selectedResult3, setSelectedResults3] = useState([]);
  const [selectedResult4, setSelectedResults4] = useState([]);
  const [backgroundSelected1, setBackgroundSelected1] = useState(false);
  const [backgroundSelected2, setBackgroundSelected2] = useState(false);
  const [backgroundSelected3, setBackgroundSelected3] = useState(false);
  const [backgroundSelected4, setBackgroundSelected4] = useState(false);

  const [loading, setLoading] = useState(false);
  const generate = async () => {
    setLoading(true);
    console.log(makePrompt(selectedResult1), selectedLora1.value,backgroundSelected1?"simple background":"".toString());
    console.log(makePrompt(selectedResult2), selectedLora2.value,backgroundSelected2?"simple background":"".toString());
    console.log(makePrompt(selectedResult3), selectedLora3.value,backgroundSelected3?"simple background":"".toString());
    console.log(makePrompt(selectedResult4), selectedLora4.value,backgroundSelected4?"simple background":"".toString());
    axios
      .post("http://121.129.210.64:18902/fastapi/make", {
        prompt: [
          string1 +backgroundSelected1?"simple background":"" +selectedLora1.value  ,
          string2 +backgroundSelected2?"simple background":"" +selectedLora2.value,
          string3 +backgroundSelected3?"simple background":"" +selectedLora3.value,
          string4 +backgroundSelected4?"simple background":"" +selectedLora4.value,
        ],
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        // setImage1(response.data.image1);
        // setImage1(decodeBase64(response.data.images[0]));
        var state = {
          image0: response.data.images[0] + backgroundSelected1?"simple background":"",
          image1: response.data.images[1]+ backgroundSelected2?"simple background":"",
          image2: response.data.images[2]+ backgroundSelected3?"simple background":"",
          image3: response.data.images[3]+ backgroundSelected4?"simple background":"",
        };
        console.log(state);
        navigate("/result", {
          state: {
            image0: response.data.images[0] ,
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
  const handleChangeValue = (index, newValue) => {
    setSelectedResults1((prevState) => {
      const updatedResults = [...prevState];
      updatedResults[index].value = newValue;
      return updatedResults;
    });
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="App">
          <div>
            <h1 className="cutTitle">네컷만화 생성기</h1>
            <span className="cutManual">
              각 컷에 들어갈 내용을 드롭박스를 클릭해 입력해주세요.
            </span>
            <br />
            <span className="cutManual">
              '배경없애기' 체크박스를 활성화 하면 배경이 없는 만화가 만들어져요.
            </span>
            <div className="userInpuWrapper">
              <div className="cutWrapper_row">
                <div className="cutWrapper">
                  <div className="cut_row">
                    <div className="cut">
                      <SearchComponent
                        type="place"
                        selectedResult={selectedResult1}
                        setString={setString1}
                        setSelectedResults={setSelectedResults1}
                        backgroundSelected = {backgroundSelected1}
                        setBackgroundSelected = {setBackgroundSelected1}
                      />
                    </div>
                    <div className="cut">
                      <SearchComponent
                        type="move"
                        setString={setString1}
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
                  <input
                    className="input_text"
                    value={string1}
                    onChange={(e) => {
                      setString1(e.target.value);
                    }}
                  />
                  {/* {selectedResult1.map((result, index) => (
              <React.Fragment key={index}>
                <input
                  style={{ display: "inline-block", float: "left" }}
                  type="text"
                  value={result.value}
                  onChange={(e) => handleChangeValue(index, e.target.value)}
                />
              </React.Fragment>
            ))} */}
                  {loraSelector(selectedLora1, setSelecteLora1)}
                </div>

                <div className="cutWrapper">
                  <div className="cut_row">
                    <div className="cut">
                      <SearchComponent
                        type="place"
                        selectedResult={selectedResult2}
                        setString={setString2}
                        setSelectedResults={setSelectedResults2}
                        backgroundSelected = {backgroundSelected2}
                        setBackgroundSelected = {setBackgroundSelected2}
                      />
                    </div>
                    <div className="cut">
                      <SearchComponent
                        type="move"
                        selectedResult={selectedResult2}
                        setString={setString2}
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
                  <input
                    className="input_text"
                    value={string2}
                    onChange={(e) => {
                      setString2(e.target.value);
                    }}
                  />
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
                        setString={setString3}
                        setSelectedResults={setSelectedResults3}
                        backgroundSelected = {backgroundSelected3}
                        setBackgroundSelected = {setBackgroundSelected3}
                      />
                    </div>
                    <div className="cut">
                      <SearchComponent
                        type="move"
                        selectedResult={selectedResult3}
                        setString={setString3}
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
                  <input
                    className="input_text"
                    value={string3}
                    onChange={(e) => {
                      setString3(e.target.value);
                    }}
                  />
                  {loraSelector(selectedLora3, setSelecteLora3)}
                </div>

                <div className="cutWrapper">
                  <div className="cut_row">
                    <div className="cut">
                      <SearchComponent
                        type="place"
                        selectedResult={selectedResult4}
                        setString={setString4}
                        setSelectedResults={setSelectedResults4}
                        backgroundSelected = {backgroundSelected4}
                        setBackgroundSelected = {setBackgroundSelected4}
                      />
                    </div>
                    <div className="cut">
                      <SearchComponent
                        type="move"
                        selectedResult={selectedResult4}
                        setString={setString4}
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
                  <input
                    className="input_text"
                    value={string4}
                    onChange={(e) => {
                      setString4(e.target.value);
                    }}
                  />
                  {loraSelector(selectedLora4, setSelecteLora4)}
                </div>
              </div>
            </div>

            <div>
              <button id="generateBtn" onClick={generate}>
                생성
              </button>
            </div>
            <div>
              {/*<img src={"data:image/jpeg;base64," + image1.data} /> */}
            </div>
            <div className="footer">
              <img id="img1" src={logo1} width={200} />
              <img src={logo2} width={100} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gen;
