import { Tooltip } from "antd";
import { FeatureImage } from "../type/type";
import { useNavigate } from "react-router-dom";

type Props = {
  articleId?: string;
  featureImage: FeatureImage;
  width?: string;
};
export const InputFeatureImage: React.FC<Props> = ({
  articleId,
  featureImage,
  width = "100%",
}) => {
  const navigate = useNavigate();
  const imgUrl = featureImage?.id
    ? `http://localhost:8080/file/image/${featureImage.id}`
    : "http://localhost:8080/img/Image-not-found.png";

  const handleClickImage = () => {
    if (articleId) {
      navigate(`/articles/${articleId}/feature-image`);
    }
  };

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
