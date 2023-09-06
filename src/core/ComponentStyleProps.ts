import { Color } from "./Color";

// src/ui-components/CSSProps.ts
class ComponentStyleProps {
    position?: 'absolute' | 'relative';
    top?: string | number = 0;
    left?: string | number = 0;
    //bottom?: string | number = 0;
    //right?: string | number = 0;
    width?: string | number | "unset" = "100%";
    height?: string | number | "unset" = "100%";

    backgroundColor?: Color | string = "#cccccc";
    color?: Color | "inherit" = new Color(0, 0, 0, 255);

    backgroundImageId?: string = undefined;
    
    space?: string | number = 0;
    spaceLeft?: string | number = 0;
    spaceRight?: string | number = 0;
    spaceTop?: string | number = 0;
    spaceBottom?: string | number = 0;

    /* Border */
    borderRadius?: string | number = undefined;
    borderRadiusBottomRight?: string | number = undefined;
    borderRadiusBottomLeft?: string | number = undefined;
    borderRadiusTopLeft?: string | number = undefined;
    borderRadiusTopRight?: string | number = undefined;

    borderWidth?: string | number = 0;
    borderTopWidth?: string | number = 0;
    borderRightWidth?: string | number = 0;
    borderBottomWidth?: string | number = 0;
    borderLeftWidth?: string | number = 0;

    borderColor?: Color;
    borderTopColor?: Color ;
    borderRightColor?: string ;
    borderBottomColor?: string ;
    borderLeftColor?: string ;

    borderStyle?: string = "solid";
    borderTopStyle?: string = "solid";
    borderRightStyle?: string = "solid";
    borderBottomStyle?: string = "solid";
    borderLeftStyle?: string = "solid";

    maxWidth?: string | number = "100%";  // Default value
    maxHeight?: string | number = "100%"; // Default value

    zIndex: number = 0;
}

export default ComponentStyleProps;
