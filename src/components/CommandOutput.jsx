import React from 'react';

const CommandOutput = ({ output }) => {
  return (
    <div className="output">
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

export default CommandOutput;
