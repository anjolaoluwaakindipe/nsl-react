export const isAnyKeyEmptyInAnObj = (
    obj: Record<string, any>,
    exceptions: string[] | null | undefined
): boolean | null => {
    let result = false;
    if (!obj) {
        return null;
    }
    for (var key in obj) {
        if (exceptions) {
            if (exceptions.includes(key)) {
                continue;
            }
        }
        if (typeof obj[key] === "object" && obj.hasOwnProperty(key)) {
            isAnyKeyEmptyInAnObj(obj[key], exceptions);
        } else {
            if (
                obj[key] === "" ||
                obj[key] === null ||
                obj[key] === undefined
            ) {
                result = true;
            }
        }
        console.log(key);
    }
    return result;
};
