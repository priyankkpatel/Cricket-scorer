import React from 'react';

function ActionButtons({ onAction, onInningsEnd }) {
  const buttons = ['0', '1', '2', '3', '4', '6', 'W', 'WD', 'NB'];

  return (
    <div className="actions">
      {buttons.map((label) => (
        <button key={label} onClick={() => onAction(label)}>
          {label}
        </button>
      ))}
      <button onClick={onInningsEnd}>End Innings</button>
    </div>
  );
}

export default ActionButtons;
