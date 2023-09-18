import { window } from "love";
import { Arma } from "./core/Arma";
import { BaseComponent } from "./core/BaseComponent";
import { Div } from "./core/Div";
import { Grid } from "./core/Grid";
import { MouseEvent } from "./core/Events";
import { Button } from "./extra/Button";
import { FAIcon } from "./extra/FAIcon";
import { Router, Switch } from "./core/Router";
import { TextBox } from "./core/TextBox";
import { KeyConstant, Scancode } from "love.keyboard";

love.graphics.setDefaultFilter("nearest", "nearest");
love.graphics.setLineStyle("smooth")
love.graphics.setLineJoin("miter")

const lastClickedButton = Arma.newState("none")

class SmartTextBox extends BaseComponent {
    routerParams = this.useState(Arma.getRouteParamsState())
    render(): BaseComponent<{}> | null {
        return (<TextBox style={{width: "100%", height: "100%"}}>{this.routerParams.get()["amount"]}</TextBox>)
    }
}

class RootComponent extends BaseComponent {
    lastClickedButton = this.useState(lastClickedButton)
    
    constructor(params?: any) {
        super(params, [])
    }

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
                            onClick={() => Arma.setRoute("/waste_money/100")}
                        >Waste Money</Button>
                        <Button
                            key="btn4"
                            style={{ width: "100%", height: "100%" }}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="newspaper" />}
                            onClick={() => Arma.setRoute("/waste_money/100/Arma")}
                        >Useless Page</Button>
                        <Button
                            key="btn5"
                            style={{ width: "100%", height: "100%"}}
                            defaultStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#4D2DB7", width: "100%", height: "100%" }}
                            hoveredStyle={{ borderRadius: 0, borderBottomWidth: 5, borderColor: "#9D44C0", backgroundColor: "#9D44C0", width: "100%", height: "100%" }}
                            icon={<FAIcon bucket="solid" icon="cogs" />}
                            onClick={() => Arma.setRoute("/settings")}
                        >Zettingz</Button>
                    </Grid>
                    <Div key="grid-1" style={{
                        width: "100%", height: "100%", backgroundColor: "$red800"
                    }}>
                        <Switch>
                            <Router  route={"/play"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#F1EFEF"}}/>
                            </Router>

                            <Router route={"/git_gud"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "#CCC8AA"}}/>
                            </Router>

                            <Router route={"/waste_money/{amount}"}>
                                <Div style={{width: "100%", height: "100%", backgroundColor: "$cyan100"}}>
                                    <SmartTextBox key="txt" style={{width: "100%", height: "100%"}}/>
                                </Div>
                            </Router>

                            <Router route={"/waste_money/{amount}/{target}"}>
                                <SmartTextBox key="txt" style={{width: "100%", height: "100%"}}/>
                            </Router>

                            <Router route={"/settings"}>
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
    Arma.mousePressed(x, y, button, isTouch, presses)
}

love.mousemoved = (x: number, y: number, dx: number, dy: number, isTouch: boolean) => {
    Arma.mouseMoved(x, y, dx, dy, isTouch)
}

love.mousereleased = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
    Arma.mouseReleased(x, y, button, isTouch, presses)
}

love.wheelmoved = (x: number, y: number) => {
    Arma.wheelMoved(x, y)
}

love.keypressed = (key: KeyConstant, scancode: Scancode, isrepeat: boolean) => {
    Arma.keyPressed(key, scancode, isrepeat)
}

love.keyreleased = (key: KeyConstant, scancode: Scancode) => {
    Arma.keyReleased(key, scancode)
}