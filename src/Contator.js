import React, { useState } from 'react';

function Contador() {
  // Declara um estado "contador" com valor inicial 0
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(contador + 1); // Atualiza o estado do contador
  };

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}

export default Contador;
