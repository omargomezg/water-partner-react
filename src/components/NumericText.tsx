const NumericText = ({ value }: { value: number }) => {
    return (
        <span>{value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
    );
};

export default NumericText;