import styled from "styled-components";
import { Colors } from "../Theme";
const TabEl = styled.article`
  border-radius: 10px;
  background-color: #6eb855;
  border: 1px solid #6eb855;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.Gray};
  padding: 50px;
`;

export default function Tab({ children }) {
  if (children) return <>{children}</>;
  else return <TabEl>Nothing to show 🤷🏻‍♂️</TabEl>;
}
