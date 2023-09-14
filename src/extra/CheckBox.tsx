import { mouse } from "love";
import { Arma } from "../core/Arma";
import { BaseComponent, ComponentProps } from "../core/BaseComponent";
import { Div } from "../core/Div";
import { MouseEvent } from "../core/Events";

export class Checkbox extends BaseComponent<{checked: boolean, onChange: (checked: boolean) => void}> {
    constructor(props: ComponentProps & {checked: boolean, onChange: (checked: boolean) => void}, children: BaseComponent[]) {
        super(props, children);
        this.state = {checked: false}
    }

    render(){
        return (
            <Div key="cb-bg" style={{space: 10, width: 50, height: 50, borderWidth: 10, borderRadius: 5, borderColor: "#000000", backgroundColor: this.state.checked ? "#0000ff" : "#0cccfc"}}/>
        )
    }

    updateLove2d(dt: number): void {
        
    }

    onMouseEvent(e: MouseEvent): void {
        const mouseOver = this.isMouseInside();

        if(mouseOver && !this.state.checked){
            this.setState({checked: true})
        }
        else if(mouseOver && this.state.checked) {
            this.setState({checked: false})
        }

        e.end()
    }


}