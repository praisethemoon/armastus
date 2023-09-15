import { window } from "love";
import { Arma } from "./core/Arma";
//import { TextBox } from "./ui/components/Text";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { Color, GradientColor } from "./core/Color";
import { Grid } from "./core/Grid";
import { TextBox } from "./core/TextBox";
import { PlaceholderComponent } from "./PlaceholderComponent";
import { Checkbox } from "./extra/CheckBox";
import { MouseEvent } from "./core/Events";
import { Button } from "./extra/Button";

love.graphics.setDefaultFilter("nearest", "nearest");
love.graphics.setLineStyle("smooth")
love.graphics.setLineJoin("miter")

let root: BaseComponent =
    <Div key="main" style={{ width: love.window.getMode()[0], height: love.window.getMode()[1] }}>
        <Grid style={{ width: "100%", height: "100%" }}
            columnsPattern={["1fr"]}
            rowsPattern={["1fr", "10fr"]}>
            <Grid style={{ width: "100%", height: "100%"}}
                columnsPattern={["1fr", "1fr", "1fr", "1fr", "1fr"]}
                rowsPattern={["1fr"]}>
                <Div key="grid-1" style={{ width: "100%", height: "100%", backgroundColor: "#F5F5DC", borderBottomWidth: 5, borderColor: "#000000"}}>
                    <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Play</TextBox>
                </Div>
                <Div key="grid-1" style={{ width: "100%", height: "100%", backgroundColor: "#BB2525", borderBottomWidth: 20, borderWidth: 0, borderColor: "#000000" }}>
                    <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Git Gud</TextBox>
                </Div>
                <Div key="grid-1" style={{ width: "100%", height: "100%", backgroundColor: "#FF6969"}}>
                    <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Waste Money</TextBox>
                </Div>
                <Div key="grid-1" style={{ width: "100%", height: "100%", backgroundColor: "#FFF5E0",  }}>
                    <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Useless Page</TextBox>
                </Div>
                <Div key="grid-1" style={{ width: "100%", height: "100%", backgroundColor: "#FFCF9D",  borderBottomWidth: 5, borderColor: "#000000"}}>
                    <TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Zettingz</TextBox>
                </Div>
            </Grid>
            <Div key="grid-1" style={{ width: "100%", height: "100%", backgroundColor: new GradientColor("linear", "270deg", null, null, null, [
                {color: Color.fromString("hsl(240deg, 100%, 20%)"), position: "0%"},
                {color: Color.fromString("hsl(289deg, 100%, 21%) "), position: "21%"},
                {color: Color.fromString("hsl(315deg, 100%, 27%)"), position: "30%"},
                {color: Color.fromString("hsl(329deg, 100%, 36%)"), position: "39%"},
                {color: Color.fromString("hsl(337deg, 100%, 43%)"), position: "46%"},
                {color: Color.fromString("hsl(357deg, 91%, 59%)"), position: "54%"},
                {color: Color.fromString("hsl(17deg, 100%, 59%)"), position: "61%"},
                {color: Color.fromString("hsl(34deg, 100%, 53%)"), position: "69%"},
                {color: Color.fromString("hsl(45deg, 100%, 50%)"), position: "79%"},
                {color: Color.fromString("hsl(55deg, 100%, 50%)"), position: "100%"},
            ]) }}>
                {/*<TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Mai Raet &lt;3</TextBox>*/}
                <Button style={{width: 120, height: 80}}>Hello</Button>
            </Div>
        </Grid>
    </Div>

love.draw = () => {
    root.display();
    //love.graphics.setColor(1, 0, 0, 1)
    //love.graphics.rectangle("line", 20, 20, 20, 20)
};

love.update = (dt: number) => {
    root.update(dt);
    love.window.setTitle("FPS: " + love.timer.getFPS());
}

love.mousepressed = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
    //print("mouse pressed", x, y, button, isTouch, presses)
    root.onMouseEvent(new MouseEvent("pressed", { x, y, button, isTouch, presses }))
}

love.mousemoved = (x: number, y: number, dx: number, dy: number, isTouch: boolean) => {
    //print("mouse moved", x, y, dx, dy, isTouch)
    root.onMouseEvent(new MouseEvent("moved", { x, y, button: undefined, isTouch, presses: undefined }))
}

love.mousereleased = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
    //print("mouse released", x, y, button, isTouch, presses)
    root.onMouseEvent(new MouseEvent("released", { x, y, button, isTouch, presses }))
}