import { Arma } from "../core/Arma";
import { BaseComponent } from "../core/BaseComponent";
import ComponentStyleProps from "../core/ComponentStyleProps";
import { Div } from "../core/Div";
import { MouseEvent } from "../core/Events";
import { Grid } from "../core/Grid";
import { TextBox } from "../core/TextBox";
import { FAIcon } from "./FAIcon";

export class Button extends BaseComponent {
    text: string = ""
    defaultStyle: Partial<ComponentStyleProps> = { width: 120, height: 80, borderRadius: 10, backgroundColor: "#FFB000" }
    hoveredStyle: Partial<ComponentStyleProps> = { backgroundColor: "#FFCF9D" }
    clickedStyle: Partial<ComponentStyleProps> = { backgroundColor: "#F5F5DC" }
    icon: FAIcon | null = null;

    state = { buttonState: "default" }

    constructor(props?: { style?: Partial<ComponentStyleProps>, defaultStyle?: Partial<ComponentStyleProps>, hoveredStyle?: Partial<ComponentStyleProps>, clickedStyle?: Partial<ComponentStyleProps>, key?: string, icon?: FAIcon | null, onClick?: () => void }, children?: string[]) {
        super(props, []);
        this.text = children?.join("") || ""

        /**
         * Hovered and Clicked style extends default style
         */
        this.defaultStyle = { ...this.defaultStyle, ...props?.defaultStyle }
        this.hoveredStyle = { ...this.defaultStyle, ...this.hoveredStyle, ...props?.hoveredStyle }
        this.clickedStyle = { ...this.defaultStyle, ...this.clickedStyle, ...props?.clickedStyle }
        this.icon = props?.icon || null;
    }

    render() {
        return (
            <Div style={this.state.buttonState == "default" ? this.defaultStyle : (this.state.buttonState == "clicked" ? this.clickedStyle : this.hoveredStyle)}>
                {(this.icon != null)? (
                    <Grid style={{ width: "100%", height: "100%" }} columnsPattern={["3fr", "9fr"]} rowsPattern={["1fr"]}>
                        {this.icon}
                        <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">{this.text}</TextBox>
                    </Grid>
                ):(
                    <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">{this.text}</TextBox>
                )}
            </Div>
        )
    }

    onMouseEvent(e: MouseEvent): void {
        if (e.eventType == "moved") {
            if (this.isEventInside(e)) {
                this.setState({ buttonState: "hovered" })
            }
            else {
                if (this.state.buttonState != "default")
                    this.setState({ buttonState: "default" })
            }
        }
        else if (e.eventType == "pressed") {
            if (this.isEventInside(e)) {
                this.setState({ buttonState: "clicked" })
                this.props?.onClick()
            }
        }
        else if (e.eventType == "released") {
            if (this.isEventInside(e)) {
                this.setState({ buttonState: "hovered" })
            }
            else {
                if (this.state.buttonState != "default")
                    this.setState({ buttonState: "default" })
            }
        }
    }
}