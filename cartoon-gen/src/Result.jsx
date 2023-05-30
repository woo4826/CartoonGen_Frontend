import { useLocation } from "react-router-dom";
import { useState } from "react";
function Result() {
  let location = useLocation();
  console.log(location);
  const [image0, setImage0] = useState(location.state.image0);
  const [image1, setImage1] = useState(location.state.image1);
  const [image2, setImage2] = useState(location.state.image2);
  const [image3, setImage3] = useState(location.state.image3);
  return (
    <div className="result">
      <div className="result_row">
        <img src={"data:image/jpeg;base64," + image0} alt="image1" />
        <img src={"data:image/jpeg;base64," + image1} alt="image1" />
      </div>
      <div className="result_row">
        <img src={"data:image/jpeg;base64," + image2} alt="image1" />
        <img src={"data:image/jpeg;base64," + image3} alt="image1" />
      </div>
    </div>
  );
}
export default Result;
