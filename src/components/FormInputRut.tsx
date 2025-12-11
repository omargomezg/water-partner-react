import { Form } from "antd";
import { FC } from "react";
import { validateRut } from "../utils/Utils"; // Asumiendo que validateRut está aquí
import RutInput from "./RutInput";

interface FormInputRutProps {
    name: string;
    label?: string;
}

const FormInputRut: FC<FormInputRutProps> = ({ name, label = "RUT" }) => {
    return (
        <Form.Item label={label} name={name}
            rules={[
                { required: true, message: `Por favor ingrese ${label}` },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value) {
                            return Promise.resolve();
                        }
                        if (validateRut(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(`El ${label} ingresado no es válido.`));
                    },
                }),
            ]}
        >
            <RutInput />
        </Form.Item>
    );
};

export default FormInputRut;