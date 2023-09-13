import { Arma } from "./core/Arma";
import { BaseComponent, ComponentProps } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { TextBox } from "./core/TextBox";

export class PlaceholderComponent extends BaseComponent<{message: string}> {
    constructor(props: ComponentProps & {message: string}, children: BaseComponent[]) {
        super(props, children);
        this.setState({color: "#ff0000"})
    }

    render(){
        return (
            <Div key="placeholderRoot" style={{ width: "100%", height: "100%", borderWidth: 1, borderColor: "#000000"}}>
                
                {...this.children}
                <TextBox style={{borderWidth: 10, borderColor: "#0000ff", width: 200, height: 200}} key="placeholderText-2" halign="center" valign="center" fontAssetName="defaultFont_30">{this.props.message}</TextBox> 
                <TextBox style={{borderWidth: 50, borderRadius: 50, borderColor: "#000000", backgroundColor: this.state.color, width: 200, height: 200}} key="placeholderText" halign="center" valign="center" fontAssetName="defaultFont_30">{this.props.message}</TextBox> 
            </Div>
        )
    }

    updateLove2d(dt: number): void {
        // check if mouse is over the object
        const mouseOver = this.isMouseInside();
        if(mouseOver && this.state.color != "#00ff00"){
            print("mouse over")
            this.setState({color: "#00ff00"})
        }
        else if (!mouseOver && this.state.color != "#ff0000"){
            this.setState({color: "#ff0000"})
        }
    }


}