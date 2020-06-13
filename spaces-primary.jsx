import Desktop from "./lib/Desktop.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";
import styles from "./lib/styles.jsx";
import Battery from "./lib/Battery.jsx";
import Clock from "./lib/DateTime.jsx";

const style = {
  padding: "0 8px",
  background: "rgb(68, 68, 105)",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "16px",
  position: "fixed",
  overflow: "hidden",
  left: "0px",
  bottom: "0px",
  width: "80%",
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight,
  fontSize: styles.fontSize,
  color: styles.colors.dim,
  fontWeight: styles.fontWeight
};

const battery_style = {
  padding: "0 8px",
  display: "grid",
  background: "rgb(67, 67, 80)",
  gridAutoFlow: "column",
  gridGap: "16px",
  position: "fixed",
  overflow: "hidden",
  left: "80%",
  bottom: "0px",
  width: "10%",
  border: "5px",
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight,
  fontSize: styles.fontSize,
  color: styles.colors.dim,
  fontWeight: styles.fontWeight
}

const clock_style = {
  padding: "0 8px",
  background: "rgb(97, 92, 92)",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "16px",
  position: "fixed",
  overflow: "hidden",
  left: "90%",
  bottom: "0px",
  width: "10%",
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight,
  fontSize: styles.fontSize,
  color: styles.colors.dim,
  fontWeight: styles.fontWeight
}

export const refreshFrequency = false;
export const command = "./scripts/spaces_primary.sh";

export const render = ({ output }) => {
  const data = parse(output);
  if (typeof data === "undefined") {
    return (
      <div style={style}>
        <Error msg="Error: unknown script output" side="left" />
      </div>
    );
  }
  if (typeof data.error !== "undefined") {
    return (
      <div style={style}>
        <Error msg={`Error: ${data.error}`} side="left" />
      </div>
    );
  }
  return (
    <div>
      <div style={style}>
        <Desktop output={data.spaces_primary} />
      </div>
      <div style={battery_style}>
        <Battery output={data.battery} />
      </div>
      <div style={clock_style}>
        <Clock output={data.datetime} />
      </div>
    </div>
  );
};

export default null;
