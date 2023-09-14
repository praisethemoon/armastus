export type MouseEventType = "hover" | "click" | "drag"
export type MouseEventData = {x: number, y: number, button: number, isTouch: boolean, presses: number}

export class MouseEvent {
    eventType: MouseEventType
    spread: boolean;
    eventData: MouseEventData

    constructor(eventType: MouseEventType, eventData: MouseEventData){
        this.eventType = eventType;
        this.spread = true;
        this.eventData = eventData
    }

    end(){
        this.spread = false
    }
}