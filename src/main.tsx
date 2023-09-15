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

love.graphics.setDefaultFilter("nearest", "nearest");
love.graphics.setLineStyle("smooth")
love.graphics.setLineJoin("miter")

let root: BaseComponent =
    <Div key="main" style={{
        width: "1000px", height: "800px",
        backgroundColor: new GradientColor("linear", "270deg", null, null, null, [
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
        ]),
        borderRadius: "0px",
        borderColor: "#ffffff",
        borderWidth: 20
    }}>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
    <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>
            <Checkbox defaultChecked={false} onChange={(checked) => print(checked)} style={{width: 50, height: 50}}/>

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
    print("mouse pressed", x, y, button, isTouch, presses)
    root.onMouseEvent(new MouseEvent("click", {x, y, button, isTouch, presses}))
}