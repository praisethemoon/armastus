import { window } from "love";
import { Arma } from "./core/Arma";
//import { TextBox } from "./ui/components/Text";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { Color, GradientColor } from "./core/Color";
import { Grid } from "./core/Grid";
import { TextBox } from "./core/TextBox";

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
        borderRadius: "100px",
        borderWidth: "50px",
    }}>
        <Grid style={{ width: "1000px", height: "800px", position: "relative" }} columnsPattern={["1fr", "1fr"]} rowsPattern={["1fr", "1fr"]}>
            <Div key={"obj1"} style={{ width: "100%", height: "100%", position: "relative", backgroundColor: "#071952" }} />
            <Div style={{ width: "100%", height: "100%", position: "relative", backgroundColor: "#088395" }} />
            <Div style={{ width: "100%", height: "100%", backgroundColor: "#35A29F"}} />
            <Div key={"id1"} style={{
                width: "100%", height: "100%", position: "relative",
                backgroundColor: new GradientColor(
                    "linear",
                    "0deg",
                    null,
                    null,
                    null,
                    [
                        { color: Color.fromString("#ff0000"), position: "0%" },
                        { color: Color.fromString("#0000ff"), position: "70%" },
                        { color: Color.fromString("#cccccc"), position: "100%" },
                    ]
                ),


            }}>
                <TextBox halign="right" valign="center" textAlign="justify" style={{ color: "#00ffff"}} fontAssetName="defaultFont" fontSize={20}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum tristique ipsum quis porta. Morbi non lacus at nisi placerat egestas. Pellentesque lobortis vehicula efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer sem nibh, tincidunt ut finibus quis, rhoncus nec est. Nulla facilisi. Integer ac fringilla enim. Nunc imperdiet pulvinar ex eget pharetra. Fusce aliquet libero nec magna sodales cursus. Donec quam nunc, convallis eu accumsan nec, efficitur ut erat. Donec egestas ipsum nec ligula auctor porttitor sed nec ligula. Sed a pellentesque nibh, in condimentum erat. Nullam sodales molestie tortor, non condimentum elit dignissim vitae. In ultricies facilisis rutrum.

                </TextBox>
            </Div>
        </Grid>
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
    root.render();
};

love.update = (dt: number) => {
    root.update(dt);
    love.window.setTitle("FPS: " + love.timer.getFPS());
}