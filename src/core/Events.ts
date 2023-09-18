import { KeyConstant, Scancode } from "love.keyboard"

export type MouseEventType = "pressed" | "released" | "moved" | "wheel"

export type MouseClickEventData = {x: number, y: number, button: number, isTouch: boolean, presses?: number}
export type MouseMoveEventData = {x: number, y: number, dx: number, dy: number, isTouch: boolean}
export type MouseWheelEvent = {x: number, y: number}

export class MouseEvent {
    eventType: MouseEventType
    spread: boolean;
    eventData: MouseClickEventData | MouseMoveEventData | MouseWheelEvent

    constructor(eventType: MouseEventType, eventData: MouseClickEventData | MouseMoveEventData | MouseWheelEvent){
        this.eventType = eventType;
        this.spread = true;
        this.eventData = eventData
    }

    end(){
        this.spread = false
    }
}

export type KeyboardEventType = "pressed" | "released"
export type KeyboardPressEventData = {key: KeyConstant, scancode: Scancode, isrepeat: boolean}
export type KeybardReleaseEventData = {key: KeyConstant, scancode: Scancode}

export class KeyboardEvent {
    eventType: KeyboardEventType
    spread: boolean;
    eventData: KeyboardPressEventData | KeybardReleaseEventData

    constructor(eventType: KeyboardEventType, eventData: KeyboardPressEventData | KeybardReleaseEventData){
        this.eventType = eventType;
        this.spread = true;
        this.eventData = eventData
    }

    end(){
        this.spread = false
    }

}