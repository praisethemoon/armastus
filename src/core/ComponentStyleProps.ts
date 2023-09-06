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
    spaceLeft?: string | number = undefined;
    spaceRight?: string | number = undefined;
    spaceTop?: string | number = undefined;
    spaceBottom?: string | number = undefined;

    /* Border */
    borderRadius?: string | number = 0;
    borderRadiusBottomRight?: string | number = 0;
    borderRadiusBottomLeft?: string | number = 0;
    borderRadiusTopLeft?: string | number = 0;
    borderRadiusTopRight?: string | number = 0;

    borderWidth?: string | number = 0;
    borderTopWidth?: string | number = 0;
    borderRightWidth?: string | number = 0;
    borderBottomWidth?: string | number = 0;
    borderLeftWidth?: string | number = 0;

    borderColor?: string|Color;
    borderTopColor?: string|Color ;
    borderRightColor?: string|Color ;
    borderBottomColor?: string|Color ;
    borderLeftColor?: string|Color ;

    borderStyle?: string = "solid";
    borderTopStyle?: string = "solid";
    borderRightStyle?: string = "solid";
    borderBottomStyle?: string = "solid";
    borderLeftStyle?: string = "solid";

    maxWidth?: string | number = "100%";  // Default value
    maxHeight?: string | number = "100%"; // Default value

    // ignored for now, future feature
    zIndex: number = 0;
}

export default ComponentStyleProps;
