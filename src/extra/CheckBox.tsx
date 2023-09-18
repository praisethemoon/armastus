import { mouse } from "love";
import { Arma } from "../core/Arma";
import { BaseComponent, ComponentProps } from "../core/BaseComponent";
import { Div } from "../core/Div";
import { MouseEvent } from "../core/Events";
import { TextBox } from "../core/TextBox";
import ComponentStyleProps from "../core/ComponentStyleProps";

export class Checkbox extends BaseComponent<{defaultChecked: boolean, onChange: (checked: boolean) => void}> {
    constructor(props: { style?: Partial<ComponentStyleProps>, key?: string } & {defaultChecked: boolean, onChange: (checked: boolean) => void}, children: BaseComponent[]) {
        super(props, children);
        this.state = {checked: props.defaultChecked}
    }

    render(){
        return (<Div key="cb-dev">
            <Div key="cb-inner" style={{width: "100%", height: "100%", backgroundColor: this.state.checked?"#FFCC70FF":"#FFCC7070", borderWidth: 2, borderColor: "#00000000"}}/>
        </Div>)
    }

    onMouseEvent(e: MouseEvent): void {
        const mouseOver = this.isEventInside(e);

        if(mouseOver && !this.state.checked && !e.isResolved()){
            this.setState({checked: true})
            this.props.onChange(true)
            e.resolve()
        }
        else if(mouseOver && this.state.checked && !e.isResolved()) {
            this.setState({checked: false})
            this.props.onChange(false)
            e.resolve()
        }

        super.onMouseEvent(e);
    }


}