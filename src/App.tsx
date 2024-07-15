import { useState } from "react";

import { Button } from "./components/Button/Button";

function App() {
  const [state, setState] = useState<number>(0);

  const toggleCounter = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <>
      <div>
        <Button onClick={(e) => toggleCounter(e)}>Кнопка</Button>
        <div>Some Div</div>
      </div>
    </>
  );
}

export default App;
