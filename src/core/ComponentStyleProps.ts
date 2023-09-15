import { Color, GradientColor} from "./Color";

export type NullableProp = string | number | null;
export type OverflowProp = "hidden" | "visible" | "scroll";

export type ColorProp = Color | string | GradientColor | null

//export type ImageRenderProp = "repeat-x" | "repeat-y" | "repeat" | "no-repeat" | null
export type ImageSizeProp = "cover" | "contain" | "fill" | [number|string, number|string] | string | number | null

// src/ui-components/CSSProps.ts
class ComponentStyleProps {
    position: 'absolute' | 'relative' = 'relative';
    top: NullableProp = null;
    left: NullableProp = null;
    //bottom: NullableProp = null;
    //right: NullableProp = null;
    width: NullableProp | "unset" = "100%";
    height: NullableProp | "unset" = "100%";

    backgroundColor: ColorProp = null;
    color: ColorProp = new Color(0, 0, 0, 255);

    backgroundImageId: string | null = null;
    //backgroundImageRender: ImageRenderProp = "repeat";
    backgroundImageSize: ImageSizeProp = '100%';
    
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

    borderColor: ColorProp = null ;
    borderTopColor: ColorProp = null ;
    borderRightColor: ColorProp = null ;
    borderBottomColor: ColorProp = null ;
    borderLeftColor: ColorProp = null ;

    borderStyle: string = "solid";
    borderTopStyle: string = "solid";
    borderRightStyle: string = "solid";
    borderBottomStyle: string = "solid";
    borderLeftStyle: string = "solid";

    maxWidth: NullableProp = "unset";  // Default value
    maxHeight: NullableProp = "unset"; // Default value

    overflowX?: OverflowProp = "scroll" 
    overflowY?: OverflowProp = "scroll"

    // ignored for now, future feature
    zIndex: number = 0;
}

export default ComponentStyleProps;
