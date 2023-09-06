import { Color, GradientColor} from "./Color";

export type NullableProp = string | number | null;

// src/ui-components/CSSProps.ts
class ComponentStyleProps {
    position: 'absolute' | 'relative' = 'relative';
    top: NullableProp = null;
    left: NullableProp = null;
    //bottom: NullableProp = null;
    //right: NullableProp = null;
    width: NullableProp | "unset" = "100%";
    height: NullableProp | "unset" = "100%";

    backgroundColor: Color | string | null = null;
    backgroundGradient: GradientColor | null = null;
    color: Color | "inherit" = new Color(0, 0, 0, 255);

    backgroundImageId: string | null = null;
    
    space: NullableProp = 0;
    spaceLeft: NullableProp = null;
    spaceRight: NullableProp = null;
    spaceTop: NullableProp = null;
    spaceBottom: NullableProp = null;

    /* Border */
    borderRadius: NullableProp = 0;
    borderRadiusBottomRight: NullableProp = null;
    borderRadiusBottomLeft: NullableProp = null;
    borderRadiusTopLeft: NullableProp = null;
    borderRadiusTopRight: NullableProp = null;

    borderWidth: NullableProp = 0;
    borderTopWidth: NullableProp = null;
    borderRightWidth: NullableProp = null;
    borderBottomWidth: NullableProp = null;
    borderLeftWidth: NullableProp = null;

    borderColor: string|Color|null = null ;
    borderTopColor: string|Color|null = null ;
    borderRightColor: string|Color|null = null ;
    borderBottomColor: string|Color|null = null ;
    borderLeftColor: string|Color|null = null ;

    borderStyle: string = "solid";
    borderTopStyle: string = "solid";
    borderRightStyle: string = "solid";
    borderBottomStyle: string = "solid";
    borderLeftStyle: string = "solid";

    maxWidth: NullableProp = "100%";  // Default value
    maxHeight: NullableProp = "100%"; // Default value

    // ignored for now, future feature
    zIndex: number = 0;
}

export default ComponentStyleProps;
