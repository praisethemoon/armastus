import { window } from "love";
import { Arma } from "./core/Arma";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { Grid } from "./core/Grid";
import { MouseEvent } from "./core/Events";
import { Button } from "./extra/Button";
import { FAIcon } from "./extra/FAIcon";
import { Router, Switch } from "./core/Router";

love.graphics.setDefaultFilter("nearest", "nearest");
love.graphics.setLineStyle("smooth")
love.graphics.setLineJoin("miter")

const lastClickedButton = Arma.newState("none")

class RootComponent extends BaseComponent {
    lastClickedButton = this.useState(lastClickedButton)

    render() {
        return (
            <Div key="main" style={{ width: love.window.getMode()[0], height: love.window.getMode()[1] }}>
                <Grid style={{ width: "100%", height: "100%" }}
                    columnsPattern={["1fr"]}
                    rowsPattern={["1fr", "10fr"]}>
                    <Grid style={{ width: "100%", height: "100%" }}
                        columnsPattern={["1fr", "1fr", "1fr", "1fr", "1fr"]}
                        rowsPattern={["1fr"]}>
                        <Button
                            key="btn1"
                            style={{ width: "100%", height: "100%" }}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="play-circle" />}
                            onClick={() => Arma.setRoute("/play")}
                        >Play and Fail</Button>
                        <Button
                            key="btn2"
                            style={{ width: "100%", height: "100%" }}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="sad-cry" />}
                            onClick={() => Arma.setRoute("/git_gud")}
                        >Git Gud</Button>
                        <Button
                            key="btn3"
                            style={{ width: "100%", height: "100%" }}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="money-bill" />}
                            onClick={() => Arma.setRoute("/waste_money")}
                        >Waste Money</Button>
                        <Button
                            key="btn4"
                            style={{ width: "100%", height: "100%" }}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="newspaper" />}
                            onClick={() => Arma.setRoute("/useless")}
                        >Useless Page</Button>
                        <Button
                            key="btn5"
                            style={{ width: "100%", height: "100%", zIndex: 1000 }}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="cogs" />}
                            onClick={() => Arma.setRoute("/settings")}
                        >Zettingz</Button>
                    </Grid>
                    <Div key="grid-1" style={{
                        width: "100%", height: "100%", backgroundColor: "#EC53B0"
                    }}>
                        <Switch>
                            <Router exact={true} route={"/play"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#F1EFEF"}}/>
                            </Router>

                            <Router exact={false} route={"/git_gud"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#CCC8AA"}}/>
                            </Router>

                            <Router exact={false} route={"/waste_money"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#7D7C7C"}}/>
                            </Router>

                            <Router exact={false} route={"/useless"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#191717"}}/>
                            </Router>

                            <Router exact={false} route={"/settings"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#FF00FF"}}/>
                            </Router>
                        </Switch>
                    </Div>
                </Grid>
            </Div>
        )
    }
}

let root = new RootComponent()
Arma.setRoot(root)

love.draw = () => {
    Arma.render()
};

love.update = (dt: number) => {
    Arma.update(dt)
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