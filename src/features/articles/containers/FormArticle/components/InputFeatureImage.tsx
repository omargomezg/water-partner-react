import { Image } from "antd";
import { FeatureImage } from "../type/type";

type Props = {
  featureImage: FeatureImage;
  width?: string;
};
export const InputFeatureImage = ({ featureImage, width = "100%" }: Props) => {
  console.log("featureImage: ", featureImage);
  return (
    <>
      {featureImage?.id && (
        <Image
          width={width}
          src={`http://localhost:8080/file/image/${featureImage.id}?width=200`}
        />
      )}
      <p>asa</p>
    </>
  );
};
