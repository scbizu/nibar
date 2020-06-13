const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  return (
    <div>
      🐸 &nbsp;{output.time}
    </div>
  );
};

export default render;
