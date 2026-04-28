import { Typography } from "antd";
const { Text } = Typography;

type Props = {
  permalink?: string;
  title?: string;
};

export const Permalink: React.FC<Props> = ({ permalink, title }) => {
  return (
    <Text
      type="secondary"
      ellipsis={{ tooltip: title }}
      style={{ fontSize: "0.8rem" }}
    >
      permalink: {permalink || window.location.pathname}
    </Text>
  );
};
