import { getTypedObjectKeys } from "@yamori-shared/react-utilities";
import { COLORS } from "../constants";
import { ColorPicker } from "./color-picker";

export const Colors: React.FC = () => {
  return (
    <details>
      <summary>Colors</summary>
      <ul>
        {getTypedObjectKeys(COLORS).map((color) => (
          <li key={color}>
            <ColorPicker name={color} />
          </li>
        ))}
      </ul>
    </details>
  );
};
