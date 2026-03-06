import { SUPPORTED_ELEMENTS } from "../constants";
import { useStore } from "../store";

export const Elements: React.FC = () => {
  const elements = useStore((state) => state.elements);

  console.log(elements);
  return (
    <table>
      <thead></thead>
      <tbody>
        {SUPPORTED_ELEMENTS.map(({ name, tag: Tag, props }) => (
          <tr key={name ?? Tag}>
            <td scope="row">{name?.toLowerCase() ?? Tag}</td>
            <td>
              <Tag {...props} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
