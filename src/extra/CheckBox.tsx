import { mouse } from "love";
import { Arma } from "../core/Arma";
import { BaseComponent, ComponentProps } from "../core/BaseComponent";
import { Div } from "../core/Div";

export class Checkbox extends BaseComponent<{checked: boolean, onChange: (checked: boolean) => void}> {
    constructor(props: ComponentProps & {checked: boolean, onChange: (checked: boolean) => void}, children: BaseComponent[]) {
        super(props, children);
        this.state = {checked: false}
    }

    render(){
        print("rerendering checkbox", this.state.checked)
        return (
            <Div key="cb-bg" style={{width: 50, height: 50, backgroundColor: this.state.checked ? "#00ff00" : "#ff0000"}}/>
        )
    }

    updateLove2d(dt: number): void {
        const mouseOver = this.isMouseInside();

        if(mouseOver && !this.state.checked){
            this.setState({checked: true})
        }
        else if(!mouseOver && this.state.checked) {
            this.setState({checked: false})
        }
    }


}