import { Input, InputProps } from "antd";
import { FC, useState, useEffect } from "react";
import { formatRut } from "../utils/Utils"; // Asumiendo que formatRut está aquí

interface RutInputProps extends Omit < InputProps, 'onChange' > {
    value?: string;
    onChange?: (value: string) => void;
}

const RutInput: FC<RutInputProps> = ({ value = '', onChange, ...rest }) => {
    // Estado interno para manejar el valor formateado que ve el usuario
    const [inputValue, setInputValue] = useState(value);

    // Sincroniza el estado interno con el valor de la prop (útil si el formulario resetea el valor)
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatRut(rawValue);

        // 1. Actualiza el estado local para mostrar el valor formateado en el input.
        setInputValue(formattedValue);

        // 2. Notifica al Form.Item padre (y al store del formulario) el valor formateado
        // Esto es CLAVE para que Antd sepa qué valor validar.
        if (onChange) {
            onChange(formattedValue);
        }
    };

    return (
        <Input
            {...rest}
            value={inputValue}
            onChange={handleChange}
            placeholder="Ej: 12.345.678-9"
        />
    );
};

export default RutInput;