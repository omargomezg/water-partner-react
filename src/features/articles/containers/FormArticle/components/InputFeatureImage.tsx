import { Image, Tooltip } from "antd";
import { FeatureImage } from "../type/type";

type Props = {
  featureImage: FeatureImage;
  width?: string;
};
export const InputFeatureImage: React.FC<Props> = ({
  featureImage,
  width = "100%",
}) => {
  const imgUrl = featureImage?.id
    ? `http://localhost:8080/file/image/${featureImage.id}`
    : "http://localhost:8080/img/Image-not-found.png";

  const handleClickImage = () => {}

  return (
    <>
      <Tooltip title={featureImage?.title}>
        <img
          style={{ width, cursor: "pointer", borderRadius: "8px" }}
          onClick={handleClickImage}
          width={width}
          alt={featureImage?.alt}
          src={imgUrl}
        />
      </Tooltip>
    </>
  );
};
