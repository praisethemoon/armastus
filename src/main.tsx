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

love.graphics.setDefaultFilter("nearest", "nearest");
love.graphics.setLineStyle("smooth")
love.graphics.setLineJoin("miter")

let root: BaseComponent =
    <Div style={{
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
        borderRadius: "20px",
    }}>
        <PlaceholderComponent message="hiiii" style={{backgroundColor: null, width: "1000px", height: "600"}}>
            <Div key={"child2"} style={{ width: "200px", height: "200px", backgroundColor: "#35A29F", borderWidth: 2, borderColor: "#000000" , backgroundImageId: "kitten", backgroundImageSize: "cover" }} />
            <Div key={"child3"} style={{ width: "200px", height: "200px", backgroundColor: "#35A29F", borderWidth: 2, borderColor: "#000000" , backgroundImageId: "kitten", backgroundImageSize: "cover" }} />
            <Div key={"child4"} style={{ width: "200px", height: "200px", backgroundColor: "#35A29F", borderWidth: 2, borderColor: "#000000" , backgroundImageId: "kitten", backgroundImageSize: "cover" }} />
            <Div key={"child5"} style={{ width: "200px", height: "200px", backgroundColor: "#35A29F", borderWidth: 2, borderColor: "#000000" , backgroundImageId: "kitten", backgroundImageSize: "cover" }} />
            <Div key={"child5"} style={{ width: "200px", height: "200px", backgroundColor: "#35A29F", borderWidth: 2, borderColor: "#000000" , backgroundImageId: "kitten", backgroundImageSize: "cover" }} />
            <Checkbox style={{width: 50, height: 50}} checked={false} onChange={(checked) => print(checked)}/>
        </PlaceholderComponent>
        
        
    </Div>

/*
  <Div style={{ width: "1000px", height: "1000px", backgroundColor: "#cccccc" }}>
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#cccccc", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ff0000", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#00ff00", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0000ff", width: "100px", height: "100px", position: "relative" }} />
      <Div style={{ backgroundColor: "#ffffff", width: "50px", height: "50px", position: "relative" }} />
      <Div style={{ backgroundColor: "#0e1c01", width: "200px", height: "200px", position: "absolute", left: "250px", top: "10px"}} />
  </Div>*/



// Set the root div's position and dimensions in pixels
//root.cssProps.width = love.graphics.getWidth(); // For example, set the width to 400 pixels
//root.cssProps.height = love.graphics.getHeight(); // For example, set the height to 300 pixels

let c = Color.fromString("#cccccc").toLove2DColor()
print(c[0], c[1], c[2], c[3])

love.draw = () => {
    root.display();
};

love.update = (dt: number) => {
    root.update(dt);
    love.window.setTitle("FPS: " + love.timer.getFPS());
}
