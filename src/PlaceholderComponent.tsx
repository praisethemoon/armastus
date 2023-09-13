import { Arma } from "./core/Arma";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { TextBox } from "./core/TextBox";


export class PlaceholderComponent extends BaseComponent<{message: string}> {
    render(){
        return (
            <Div key="placeholderRoot" style={{backgroundColor: "#00FF00", width: "100%", height: "100%"}}>
                <TextBox style={{borderWidth: 10, borderColor: "#000000", width: 200, height: 200}} key="placeholderText" halign="center" valign="center" fontAssetName="defaultFont_30">{this.props.message}</TextBox> 
                {...this.children}
                <TextBox style={{borderWidth: 10, borderColor: "#0000ff", width: 200, height: 200}} key="placeholderText" halign="center" valign="center" fontAssetName="defaultFont_30">{this.props.message}</TextBox> 
            </Div>
        )
    }
}