export function parseCoordinate(value: string, parentSize: number): number {
    if (value.endsWith('px')) {
        return parseInt(value); // Parse pixel value
    } else if (value.endsWith('%')) {
        const percentage = parseInt(value) / 100;
        return parentSize * percentage; // Calculate percentage value
    } else if (value == "unset") {
        return parentSize; // Default to 0 if the format is not recognized
    }
    else {
        return parseInt(value);
    }
}

