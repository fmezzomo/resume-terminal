import React, { useState } from 'react';

const CommandInput = ({ onCommand }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite um comando..."
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CommandInput;
