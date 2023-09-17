
export function printObject(obj: any, indent: string = ''): void {
    if (typeof obj === 'object') {
        print(`${indent}{`);
        const oldIndent = indent;
        indent += '  ';
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (typeof value === 'object') {
                    print(`${indent}${key}: {`);
                    printObject(value, `${indent}  `);
                    print(`${indent}}`);
                } else {
                    print(`${indent}${key}: ${value}`);
                }
            }
        }
        print(`${oldIndent}}`);
    } 
    else if (typeof obj === 'function') {
        print(indent + obj.toString());
    }
    else {
        print(indent + obj);
    }
}