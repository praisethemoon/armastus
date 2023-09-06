import { window } from "love";
import { Arma } from "./core/Arma";
//import { TextBox } from "./ui/components/Text";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { Color } from "./core/Color";
import { Grid } from "./core/Grid";

let root: BaseComponent =
    <Div style={{ width: "1000px", height: "800px", backgroundColor: "#cccccc", borderRadius:20, space: 50, borderWidth: 20 }}>
        <Grid style={{ backgroundColor: "#cccccc00", width: "1000px", height: "800px", position: "relative" }} columnsPattern={["1fr", "4fr"]} rowsPattern={["1fr", "1fr"]}>
            <Div key={"obj1"} style={{ backgroundColor: "#ff0000", width: "100%", height: "100%", position: "relative" }} />
            <Div style={{ backgroundColor: "#00ff00", width: "100%", height: "100%", position: "relative"}} />
            <Div style={{ backgroundColor: "#0000ff", width: "100%", height: "100%", position: "relative", borderRadius: "20px" }} />
            <Div style={{ backgroundColor: "#ff00ffe0", width: "100%", height: "100%", position: "relative", space: 10, spaceLeft: 100, spaceRight: 100, borderRadius: "50px" }} />
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
}