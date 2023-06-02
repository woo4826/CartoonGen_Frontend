import spinner from "./img/spinner.gif"

function Loading () {
return(
    <div className="Loading">
    <div className="Loading-Title">AI가 만화를 생성하고 있어요</div>
    <div className="spinner-wrapper">
        <img id="spinner" src={spinner}></img>
    </div>
    </div>
)
}
export default Loading;