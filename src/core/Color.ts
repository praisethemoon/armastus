
export class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    /**
     * parses a string in the following formats:
     * rgb(r,g,b)
     * rgba(r,g,b,a)
     * #rrggbb
     * #rrggbbaa
     * @param hex 
     */
    static fromString(hex: string): Color {
        // remove white space:
        hex = hex.trim().replace(" ", "").replace("\t", "").replace("\n", "");
        
        // check if rgba
        if (hex.startsWith("rgba")) {
            let values = hex.substring(5, hex.length - 1).split(",");
            return new Color(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]), parseFloat(values[3]));
        }
        // check if rgb
        if (hex.startsWith("rgb")) {
            let values = hex.substring(4, hex.length - 1).split(",");
            return new Color(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]));
        }
        // check if hex
        if (hex.startsWith("#")) {
            // check if 8 or 6
            if (hex.length == 9) {
                return new Color(parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3, 5), 16), parseInt(hex.substring(5, 7), 16), parseInt(hex.substring(7, 9), 16));
            }
            if (hex.length == 7) {
                return new Color(parseInt(hex.substring(1, 3), 16), parseInt(hex.substring(3, 5), 16), parseInt(hex.substring(5, 7), 16), 255);
            }
        }
        throw new Error("Invalid color format: `" + hex+"`");
    }

    toLove2DColor(): number[] {
        return [this.red/255, this.green/255, this.blue/255, this.alpha/255];
    }

    /**
     * Converts color to hex #rgb
     * @returns hex representation of the string
     */
    toHex(): string {
        // convert to hex by using toString(16) and add zero to values with 1 char
        let red = this.red.toString(16);
        red.length == 1 ? red = "0" + red : red = red;
        let green = this.green.toString(16);
        green.length == 1 ? green = "0" + green : green = green;
        let blue = this.blue.toString(16);
        blue.length == 1 ? blue = "0" + blue : blue = blue;
        let alpha = math.floor(this.alpha*255).toString(16);
        alpha.length == 1 ? alpha = "0" + alpha : alpha = alpha;
        return "#" + red + green + blue + alpha;
    }

    setRed(r: number): Color {
        this.red = r;
        return this;
    }

    setGreen(g: number): Color {
        this.green = g;
        return this;
    }

    setBlue(b: number): Color {
        this.blue = b;
        return this;
    }

    setAlpha(a: number): Color {
        this.alpha = a;
        return this;
    }
}

export class GradientColor {
    gradientType: string;
    angle: number = 0;
    shape: string | null;
    position: string | null;
    extent: string | null;
    colorStops: { color: Color; position: string }[];

    constructor(
        gradientType: string,
        angle: string | null,
        shape: string | null,
        position: string | null,
        extent: string | null,
        colorStops: { color: Color; position: string }[]
    ) {
        this.gradientType = gradientType;
        this.shape = shape;
        this.position = position;
        this.extent = extent;
        this.colorStops = colorStops;

        if(angle != null) {
            if(angle.endsWith("deg")) {
                this.angle = parseFloat(angle);
                // convert to rad
                this.angle = this.angle * math.pi / 180;
            }
            else if(angle.endsWith("rad")) {
                this.angle = parseFloat(angle);
            }
            else {
                this.angle = 0
            }
        }
    }
}
