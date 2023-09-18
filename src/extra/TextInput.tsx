import { Font } from "love.graphics";
import { Arma } from "../core/Arma";
import { AssetMap } from "../core/AssetMap";
import { BaseComponent } from "../core/BaseComponent";
import ComponentStyleProps from "../core/ComponentStyleProps";
import { KeyboardEvent, KeyboardPressEventData, KeyboardTextInputEventData, MouseClickEventData, MouseEvent } from "../core/Events";
import { TextBox } from "../core/TextBox";

type TextInputProps = {fontAssetName?: string, fontSize?: number, defaultValue?: string, defaultFocused?: boolean, onChange?: (text: string) => void}

export class TextInput extends BaseComponent<TextInputProps> {

    height: number = 0;
    font: Font

    constructor(props?: {style?: Partial<ComponentStyleProps>, key?: string} & TextInputProps) {
        super(props);
        this.onTextInput = this.onTextInput.bind(this);

        this.state = {isFocused: false || false, value: props?.defaultValue || ""}
        this.font = AssetMap.loadFont(this.props.fontAssetName || "defaultFont", this.props.fontSize || 12)
        this.height = this.font.getHeight() + 10
    }

    onTextInput(text: string) {
        this.props.onTextInput(text);
    }

    render() {
        return (
            <TextBox 
                fontAssetName={this.props.fontAssetName} 
                fontSize={12} 
                halign="left" 
                valign="center" 
                style={{...this.props.style, borderColor: this.state.isFocused?"$blue300":"$blue50"}}
            >{this.state.value}</TextBox>
        );
    }

    onKeyboardEvent(e: KeyboardEvent): void {
        if((e.eventType == "input") && (this.state.isFocused)){
            const evtData = e.eventData as KeyboardTextInputEventData
            if(evtData.text == null) return;

            this.setState({value: this.state.value + evtData.text})
            e.resolve()
        }

        if((e.eventType == "pressed") && (this.state.isFocused)){
            const evtData = e.eventData as KeyboardPressEventData
            const currentVal = this.state.value as string
            if(evtData.key == "backspace"){
                this.setState({value: currentVal.substring(0, currentVal.length - 1)})
            }
            e.resolve()
        }
    }

    onMouseEvent(e: MouseEvent): void {
        /**
         * we cannot end event propagation here and all inputs needs to listen to press events
         * to unfocus if outside.
         */
        if((e.eventType == "pressed") && (e.eventData as MouseClickEventData).button == 1){
            if((this.isEventInside(e)) && (!e.isResolved())){
                if(!this.state.isFocused){
                    print("focused")
                    this.setState({isFocused: true})
                    // resolve the event
                    e.resolve()
                }
            }

            else if(!this.isEventInside(e)){
                if(this.state.isFocused){
                    this.setState({isFocused: false})
                }
            }
        }
    }
}