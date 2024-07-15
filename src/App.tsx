import { Button } from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
  return (
    <>
      <div>
        <Button>Кнопка</Button>
        <div>Some Div</div>
        <Button size="big">Вторая кнопка</Button>
        <Input placeholder="Email" />
      </div>
    </>
  );
}

export default App;
