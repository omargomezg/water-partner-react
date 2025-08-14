import {Button, Card, Flex, Image, Typography} from "antd";
import {FC} from "react";

const plantData = [
    {
        id: 1,
        name: 'Planta 12',
        pincture: 'https://journals.openedition.org/nuevomundo/docannexe/image/70730/img-3.jpg'
    },{
        id: 2,
        name: 'Planta 212',
        pincture: 'https://journals.openedition.org/nuevomundo/docannexe/image/70730/img-3.jpg'
    },{
        id: 3,
        name: 'Planta 312',
        pincture: 'https://journals.openedition.org/nuevomundo/docannexe/image/70730/img-3.jpg'
    },
]
const {Meta} = Card

const ProductList: FC = () => {
    return <div>
        <Flex align="center" justify="space-between">
            <Typography.Title level={3} className="primary--color">
                My Listing
            </Typography.Title>
            <Button type="link" className="gray--color">
                View All
            </Button>
        </Flex>

        <Flex align="center" gap="large">
            {plantData.map(plant => (
                <Card key={plant.id} hoverable className="plant-card">
                    <Image src={plant.pincture} style={{width: '130px'}} />
                    <Meta title={plant.name} style={{marginTop: '1rem'}} />
                </Card>
            ))}
        </Flex>

    </div>
}

export default ProductList