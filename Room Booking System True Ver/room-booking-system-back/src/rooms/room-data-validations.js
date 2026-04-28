export function validateName(name){
    try{
        if (name === undefined) return
        if (!name || typeof name !== 'string'){
            throw new Error('Invalid Data Type')
        }
        const nameRegex = /^([A-Z][a-z]+|[0-9]+)( ([A-Z][a-z]+|[0-9]+))*$/
        if (!nameRegex.test(name)){
            throw new Error('Invalid Room Name')
        }
        return
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function normalizeCapacity(capacity){
    try{
        if (capacity === undefined) return undefined
        if (typeof capacity === 'number'){
            if(!Number.isInteger(capacity)){
                throw new Error('capacity must be an Integer')
            }
            if(!Number.isSafeInteger(capacity)){
                throw new Error('capacity too large')
            }
            capacity = String(capacity)
        }
        if (!capacity || typeof capacity !== 'string' || capacity.trim() === ''){
            throw new Error('Invalid Data Type')
        }
        const capacityRegex = /^[1-9][0-9]*$/
        if (!capacityRegex.test(capacity)){
            throw new Error('Capacity must only contain numbers with no leading zeroes')
        }
        return Number(capacity)
    }
    catch(error){
        throw new Error(`Data Validation Error: ${error.message}`)
    }
}

export function normalizeOperational(operational){
    try{
        if (operational === undefined) return undefined
        if (typeof operational === 'boolean'){
            return operational
        }
        if (typeof operational === 'string') {
            const v = operational.trim().toLowerCase();

            if (v === 'true') return true;
            if (v === 'false') return false;
        }
        throw new Error('Invalid Operational Value')
    }
    catch(error){
        throw new Error(`Data Validation Error ${error.message}`)
    }
}
