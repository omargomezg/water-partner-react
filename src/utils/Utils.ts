export const cleanFilter = (filters: any): any => {
    if (!filters) return {};
    
    return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
            value !== null && value !== undefined && value !== ''
        )
    );
}

export const constants = {
	PAGE_SIZE: 20
}