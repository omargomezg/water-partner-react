import {
    Button,
    Drawer,
    Flex,
    Form,
    Input,
    message,
    Select,
    SelectProps,
    Spin,
} from "antd";
import {FC, useEffect, useState} from "react";
import RutInput from "../components/RutInput";
import apiClient from "../services/apiClient";
import {Client, PageResponse} from "../types";

interface MetaDataResponse {
    sectors: SelectProps[];
}

interface ICreate {
    owner: Client;
    address: string;
    role: string;
    sector: {
        id: string;
        description?: string;
    };
}

type CreateServiceProps = {
    onClose: (refresh: boolean) => void;
};

export const CreateService: FC<CreateServiceProps> = ({onClose}) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [owner, setOwner] = useState<Client>();
    const [sectors, setSectors] = useState<SelectProps[]>([]);
    const sectorId = Form.useWatch(["sector", "id"], form);

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data} = await apiClient.get<MetaDataResponse>(
                    "/api/subscriptions/metadata",
                );
                const options = data.sectors || [];
                options.push({label: "Otro", value: 0} as SelectProps);
                setSectors(options);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const handleChangeOwner = async (rut: string) => {
        try {
            const {data} = await apiClient.get<PageResponse<Client>>(
                `/api/clients`,
                {
                    params: {
                        rut,
                    },
                },
            );
            if (!data.empty) {
                setOwner(data.content[0]);
            }
        } catch (error) {
            message.error(
                "No se pudo cargar el cliente. Por favor, verifica el RUT ingresado.",
            );
        }
    };

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    const handleFinish = async (values: ICreate) => {
        values.owner = owner as Client;
        values.sector.id = String(values.sector.id);
        await apiClient.post("/api/subscriptions", values);
        message.success("Servicio creado exitosamente");
        setOpen(false);
        onClose(true);
    };

    const footer: React.ReactNode = (
        <Flex gap="medium" justify="flex-end">
            <Button
                onClick={handleClose}
                styles={{
                    root: {
                        borderColor: "#ccc",
                        color: "#171717",
                        backgroundColor: "#fff",
                    },
                }}
            >
                Cancelar
            </Button>
            <Button
                type="primary"
                htmlType="submit"
                form="create-service-form"
                styles={{root: {backgroundColor: "#171717"}}}
            >
                Crear
            </Button>
        </Flex>
    );

    return (
        <>
            <Drawer
                open={open}
                onClose={handleClose}
                title="Crear servicio"
                footer={footer}
            >
                <Spin spinning={loading}>
                    <Form
                        id="create-service-form"
                        layout="vertical"
                        form={form}
                        onFinish={handleFinish}
                    >
                        <Form.Item label="Rut del propietario" name={["owner", "rut"]}>
                            <RutInput onChange={handleChangeOwner}/>
                        </Form.Item>
                        <Form.Item
                            label="Dirección"
                            rules={[
                                {required: true, message: "La dirección es obligatoria"},
                            ]}
                            name="address"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Rol" name="role">
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Sector"
                            rules={[{required: true, message: "El rol es obligatorio"}]}
                            name={["sector", "id"]}
                        >
                            <Select options={sectors}></Select>
                        </Form.Item>
                        {<p>{form.getFieldValue("sector.id")}</p>}
                        {sectorId === 0 && (
                            <>
                                <Form.Item
                                    label="Código"
                                    name={["sector", "code"]}
                                    rules={[{required: true, message: "El código es obligatorio"}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="Nombre del sector"
                                    name={["sector", "name"]}
                                    rules={[{required: true, message: "El nombre del sector es obligatorio"}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Spin>
            </Drawer>
        </>
    );
};
