export const cleanFilter = (filters: any): any => {
    if (!filters) return {};
    
    return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
            value !== null && value !== undefined && value !== ''
        )
    );
}

export const cleanRut = (rut: string) => {
    return rut.replace(/[^0-9kK]/g, '');
};

export const formatRut = (value: string): string => {
    let clean = cleanRut(value); // Solo números y K/k

    if (clean.length < 2) {
        return clean;
    }

    const dv = clean.slice(-1).toUpperCase();
    let num = clean.slice(0, -1);
    
    if (num.length > 3) {
        num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    return `${num}-${dv}`;
};

export const validateRut = (rut: string): boolean => {
    const clean = cleanRut(rut);
    if (clean.length < 2) {
        return false;
    }

    const dv = clean.slice(-1).toUpperCase();
    let num = clean.slice(0, -1);

    let suma = 0;
    let factor = 2;

    for (let i = num.length - 1; i >= 0; i--) {
        suma += parseInt(num[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const resto = suma % 11;
    const dvEsperado = 11 - resto;

    let dvCalculado;
    if (dvEsperado === 11) {
        dvCalculado = '0';
    } else if (dvEsperado === 10) {
        dvCalculado = 'K';
    } else {
        dvCalculado = String(dvEsperado);
    }
    
    return dv === dvCalculado;
};

export const constants = {
	PAGE_SIZE: 20
}