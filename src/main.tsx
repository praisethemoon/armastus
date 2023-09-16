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
import { FAIcon } from "./extra/FAIcon";

love.graphics.setDefaultFilter("nearest", "nearest");
love.graphics.setLineStyle("smooth")
love.graphics.setLineJoin("miter")

let root: BaseComponent =
    <Div key="main" style={{ width: love.window.getMode()[0], height: love.window.getMode()[1] }}>
        <Grid style={{ width: "400", height: "400"}}
            columnsPattern={["1fr"]}
            rowsPattern={["1fr", "10fr"]}>
            <Grid style={{ width: "100%", height: "100%" }}
                columnsPattern={["1fr", "1fr", "1fr", "1fr", "1fr"]}
                rowsPattern={["1fr"]}>
                <Button
                    style={{ width: "100%", height: "100%" }}
                    defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                    hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                    icon={<FAIcon bucket="solid" icon="play-circle" />}
                >Play and Fail</Button>
                <Button
                    style={{ width: "100%", height: "100%" }}
                    defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                    hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                    icon={<FAIcon bucket="solid" icon="sad-cry" />}
                >Git Gud</Button>
                <Button
                    style={{ width: "100%", height: "100%" }}
                    defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                    hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                    icon={<FAIcon bucket="solid" icon="money-bill" />}
                >Waste Money</Button>
                <Button
                    style={{ width: "100%", height: "100%" }}
                    defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                    hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                    icon={<FAIcon bucket="solid" icon="newspaper" />}
                >Useless Page</Button>
                <Button
                    style={{ width: "100%", height: "100%" }}
                    defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                    hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                    icon={<FAIcon bucket="solid" icon="cogs" />}
                >Zettingz</Button>
            </Grid>
            <Div key="grid-1" style={{
                width: "100%", height: "100%", backgroundColor: "#EC53B0"
            }}>
                {/*<TextBox halign="center" valign="center" style={{ width: "100%", height: "100%" }} fontAssetName="defaultFont_30">Mai Raet &lt;3</TextBox>*/}
                <Button style={{ width: 120, height: 80 }}>Hello</Button>
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