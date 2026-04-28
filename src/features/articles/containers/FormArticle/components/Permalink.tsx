import { Typography } from "antd";
const { Text } = Typography;

type Props = {
  permalink?: string;
  title?: string;
};

export const Permalink = ({ permalink, title }: Props) => {
  return (
    <Text
      type="secondary"
      ellipsis={{ tooltip: title }}
      style={{ fontSize: "0.8rem" }}
    >
      Permalink: {permalink || window.location.pathname}
    </Text>
  );
};
