import { Form } from 'antd';
import { FC } from 'react';
import { validateRut } from '../utils/Utils';
import RutInput from './RutInput';

interface FormInputRutProps {
	name?: string;
	label?: string;
	required?: boolean;
	style?: React.CSSProperties;
}

const FormInputRut: FC<FormInputRutProps> = ({ name, label = 'RUT', required = false, style }) => {
	return (
		<Form.Item
			label={label}
			name={name}
			style={style}
			rules={[
				{ required: required, message: `Por favor ingrese ${label}` },
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
