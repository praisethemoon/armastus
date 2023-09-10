import { window } from "love";
import { Arma } from "./core/Arma";
//import { TextBox } from "./ui/components/Text";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { Color, GradientColor } from "./core/Color";
import { Grid } from "./core/Grid";
import { TextBox } from "./core/TextBox";

let root: BaseComponent =
    <Div style={{
        width: "1000px", height: "800px",
        backgroundColor:"#cccccc",
        borderRadius: "50px",
        borderWidth: 50,
        borderColor: "#ff0000",
    }}>
        <Grid style={{ width: "1000px", height: "800px", position: "relative" }} columnsPattern={["1fr", "1fr"]} rowsPattern={["1fr", "1fr"]}>
            <Div key={"obj1"} style={{ width: "100%", height: "100%", position: "relative" }} />
            <Div style={{ width: "100%", height: "100%", position: "relative" }} />
            <Div style={{ width: "100%", height: "100%", backgroundColor: "#cccccca1"}} />
            <Div style={{
                width: "100%", height: "100%", position: "relative", space: 50, spaceLeft: 100, spaceRight: 100,
                backgroundColor: new GradientColor(
                    "linear",
                    "0deg",
                    null,
                    null,
                    null,
                    [
                        { color: Color.fromString("#ff000010"), position: "0%" },
                        { color: Color.fromString("#0000ff10"), position: "70%" },
                        { color: Color.fromString("#cccccc10"), position: "100%" },
                    ]
                ),
                borderRadiusBottomLeft: "50px",
                borderRadiusBottomRight: "50px",
                borderBottomWidth: 50,
                borderBottomColor: "#ffff00",
                borderRadiusTopLeft: "25px",
                borderRadiusTopRight: "25px",
                borderColor: "#ff0000",

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