import { FC } from "react";

interface DiameterTextProps {
    diameter: string;
}

const DiameterText: FC<DiameterTextProps> = ({ diameter }) => {
    switch (diameter) {
        case "THIRTEEN":
            return <>13 mm</>;
        case "NINETEEN":
            return <>19 mm</>;
        case "TWENTY_FIVE":
            return <>25 mm</>;
        case "THIRTY_EIGHT":
            return <>38 mm</>;
        default:
            return <>'Desconocido'</>;
    }   
};

export default DiameterText;