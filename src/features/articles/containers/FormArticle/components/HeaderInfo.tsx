import { Space, Typography } from "antd";

const { Text } = Typography;

type Props = {
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export const HeaderInfo: React.FC<Props> = ({
  status,
  createdAt,
  updatedAt,
}) => {
  const format: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <Space
      style={{ width: "100%", justifyContent: "end" }}
      orientation={"horizontal"}
      size="small"
      wrap
    >
      <Text
        style={{
          color: status === "PUBLISHED" ? "green" : status === "DRAFT" ? "#414040" : "#411818",
          fontWeight: "bold",
        }}
        color="red"
      >
        {status === "PUBLISHED"
          ? "PUBLICADO"
          : status === "DRAFT"
            ? "BORRADOR"
            : ""}
      </Text>
      {createdAt && (
        <Text type="secondary">
          Creación: {Intl.DateTimeFormat("es-CL", format).format(createdAt)}
        </Text>
      )}
      {updatedAt && (
        <Text type="secondary">
          Actualización:{" "}
          {Intl.DateTimeFormat("es-CL", format).format(updatedAt)}
        </Text>
      )}
    </Space>
  );
};
