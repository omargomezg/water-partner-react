import { OpenAIFilled } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { useState } from "react";
import apiClient from "../../../../../services/apiClient";
import { AiResponse } from "../type/type";

type Props = {
  id?: string;
  permalink?: string;
  onChange: (text: string) => void;
};

export const ButtonSummaryIA: React.FC<Props> = ({
  id,
  permalink,
  onChange,
}) => {
  const [loadingSummaryIA, setLoadingSummaryIA] = useState(false);
  const handleSummaryIA = async () => {
    try {
      setLoadingSummaryIA(true);
      const { data } = await apiClient.get<AiResponse>(
        `/article/${permalink}/summary/ai`,
      );
      if (data.text) {
        onChange(data.text);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSummaryIA(false);
    }
  };
  if (!id) return null;
  return (
    <Tooltip title="Generar automáticamente con IA">
      <Button
        loading={loadingSummaryIA}
        type="link"
        icon={<OpenAIFilled />}
        onClick={handleSummaryIA}
        size="small"
      >
        Autogenerar
      </Button>
    </Tooltip>
  );
};
