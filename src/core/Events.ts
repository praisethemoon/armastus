import { KeyConstant, Scancode } from "love.keyboard"

export type MouseEventType = "pressed" | "released" | "moved" | "wheel"

export type MouseClickEventData = {x: number, y: number, button: number, isTouch: boolean, presses?: number}
export type MouseMoveEventData = {x: number, y: number, dx: number, dy: number, isTouch: boolean}
export type MouseWheelEvent = {x: number, y: number}

export class MouseEvent {
    eventType: MouseEventType
    private resolved: boolean;
    eventData: MouseClickEventData | MouseMoveEventData | MouseWheelEvent

    constructor(eventType: MouseEventType, eventData: MouseClickEventData | MouseMoveEventData | MouseWheelEvent){
        this.eventType = eventType;
        this.resolved = false;
        this.eventData = eventData
    }

    /**
     * Marks the event as resolved.
     * Depending on the logic, some components may respect it, others may not
     */
    resolve(){
        this.resolved = true
    }

    /**
     * 
     * @returns true if the event is resolved, false otherwise
     */
    isResolved(){
        return this.resolved
    }

}

export type KeyboardEventType = "pressed" | "released" | "input"
export type KeyboardPressEventData = {key: KeyConstant, scancode: Scancode, isrepeat: boolean}
export type KeybardReleaseEventData = {key: KeyConstant, scancode: Scancode}
export type KeyboardTextInputEventData = {text: string}

export class KeyboardEvent {
    eventType: KeyboardEventType
    resolved: boolean;
    eventData: KeyboardPressEventData | KeybardReleaseEventData | KeyboardTextInputEventData

    constructor(eventType: KeyboardEventType, eventData: KeyboardPressEventData | KeybardReleaseEventData | KeyboardTextInputEventData){
        this.eventType = eventType;
        this.resolved = false;
        this.eventData = eventData
    }

    /**
     * Marks the event as resolved.
     * Depending on the logic, some components may respect it, others may not
     */
    resolve(){
        this.resolved = true
    }

    /**
     * 
     * @returns true if the event is resolved, false otherwise
     */
    isResolved(){
        return this.resolved
    }

}