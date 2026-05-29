import { Button } from "antd";
import { FC } from "react";

type AddUserComponentProps = {
  subscriptionId: string;
};

export const AddUserComponent: FC<AddUserComponentProps> = ({
  subscriptionId,
}) => {
  return (
    <>
      <Button type="dashed">Añadir usuario</Button>
    </>
  );
};
