import { Card } from "antd";
import { ReactNode } from "react";

interface Props  {
 children: ReactNode;
 title?: ReactNode;
 extra?: ReactNode;
}

export const CardStyle: React.FC<Props> = ({ children, title, extra }) => {
  return (
    <Card
      title={title}
      extra={extra}
      style={{
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      {children}
    </Card>
  );
};
