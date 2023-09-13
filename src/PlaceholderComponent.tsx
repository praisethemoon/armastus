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
        print("rerendering placeholder")
        return (
            <Div key="placeholderRoot" style={{ width: "100%", height: "100%"}}>
                <TextBox style={{borderWidth: 50, borderRadius: 50, borderColor: "#000000", backgroundColor: this.state.color, width: 200, height: 200}} key="placeholderText" halign="center" valign="center" fontAssetName="defaultFont_30">{this.props.message}</TextBox> 
                {...this.children}
                <TextBox style={{borderWidth: 10, borderColor: "#0000ff", width: 200, height: 200}} key="placeholderText-2" halign="center" valign="center" fontAssetName="defaultFont_30">{this.props.message}</TextBox> 
            </Div>
        )
    }

    updateLove2d(dt: number): void {
        // check if mouse is over the object
        const mousePosition = love.mouse.getPosition();
        const mouseOver = this.isPointInside(mousePosition[0], mousePosition[1]);
        if(mouseOver && this.state.color != "#00ff00"){
            print("mouse over")
            this.setState({color: "#00ff00"})
        }
        else if (!mouseOver && this.state.color != "#ff0000"){
            this.setState({color: "#ff0000"})
        }
    }

    isPointInside(x: number, y: number): boolean {
        const bounds = [this.viewport.x, this.viewport.y, this.viewport.width+this.viewport.x, this.viewport.height+this.viewport.y];
        return x >= bounds[0] && x <= bounds[0] + bounds[2] && y >= bounds[1] && y <= bounds[1] + bounds[3];
    }

}