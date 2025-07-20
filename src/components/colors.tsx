import { getTypedObjectKeys } from "@yamori-shared/react-utilities";
import { INITIAL_STATE } from "../constants";
import { ColorPicker } from "./color-picker";

export const Colors: React.FC = () => {
  return (
    <details open>
      <summary>Colors</summary>
      <ul>
        {getTypedObjectKeys(INITIAL_STATE.colors).map((color) => (
          <li key={color}>
            <ColorPicker name={color} />
          </li>
        ))}
      </ul>
    </details>
  );
};
