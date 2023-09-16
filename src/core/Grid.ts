import {Div} from "./Div";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { parseCoordinate } from "./utils/parseCoordinate";

export class Grid extends Div {
    private gridTemplateColumns: string[] = [];
    private gridTemplateRows: string[] = [];
    
    constructor(props?: { style?: Partial<ComponentStyleProps>, id?: string, columnsPattern: string[], rowsPattern: string[]}, children?: BaseComponent[]) {
        super(props, children);
        this.setGridTemplate(props?.columnsPattern || [], props?.rowsPattern || []);
    }

    setGridTemplate(columnsPattern: string[], rowsPattern: string[]) {
        this.gridTemplateColumns = columnsPattern;
        this.gridTemplateRows = rowsPattern;
    }

    computeViewport(accumulatedX: number, accumulatedY: number, parentWidth: number, parentHeight: number) {
        
        if(this.props.style.position == 'absolute') {
            this.viewport.x = parseCoordinate(this.props.style.left+"", parentWidth) ;
            this.viewport.y = parseCoordinate(this.props.style.top+"", parentHeight);
        }
        else {
            this.viewport.x = accumulatedX;
            this.viewport.y = accumulatedY;
        }

        this.viewport.width = parseCoordinate(this.props.style.width+"", parentWidth);
        this.viewport.height = parseCoordinate(this.props.style.height+"", parentHeight);

        // Calculate the final position of the grid

        // Compute grid dimensions based on patterns
        const columnWidths = this.computeGridDimensions(this.gridTemplateColumns, this.viewport.width);
        const rowHeights = this.computeGridDimensions(this.gridTemplateRows, this.viewport.height);
        // Set positions and dimensions for child elements based on the grid layout
        let rowIndex = 0;
        let columnIndex = 0;

        let gridX = 0;
        let gridY = 0;

         // Calculate the final position of the grid
         if (this.props.style.position == 'absolute') {
            gridX = parseCoordinate(this.props.style.left+"", parentWidth) ;
            gridY = parseCoordinate(this.props.style.top+"", parentHeight);
         }

        for (const child of this.children) {
            // Calculate cell width and height for the child based on its position in the grid
            const cellWidth = columnWidths[columnIndex];
            const cellHeight = rowHeights[rowIndex];


            // Set child's position and dimensions
            //print(child.computedX, gridX, child.computedY, gridY, child.computedWidth, child.computedHeight)
            // Round child's position to the nearest pixel
            child.viewport.x = Math.round(gridX + accumulatedX + columnWidths.slice(0, columnIndex).reduce((acc, val) => acc + val, 0));
            child.viewport.y = Math.round(gridY + accumulatedY + rowHeights.slice(0, rowIndex).reduce((acc, val) => acc + val, 0));

            child.viewport.width = cellWidth;
            child.viewport.height = cellHeight;


            child.computeViewport(child.viewport.x, child.viewport.y, cellWidth, cellHeight)
            //print("new child coords", child.viewport.x, child.viewport.y, child.viewport.width, child.viewport.height)


            // Increment column and row indices
            columnIndex++;
            if (columnIndex >= this.gridTemplateColumns.length) {
                columnIndex = 0;
                rowIndex++;
            }
        }
    }

    private computeGridDimensions(pattern: string[], totalSize: number): number[] {
        const numColumns = pattern.length;
        const cellDimensions: number[] = [];
    
        // Calculate the total size occupied by fixed columns/rows
        let totalFixedSize = 0;
        for (const item of pattern) {
            if (typeof item === 'string') {
                if (item.endsWith('fr')) {
                    // Fractional columns/rows do not contribute to fixed size
                    continue;
                } else {
                    // Fixed columns/rows contribute to fixed size
                    totalFixedSize += parseFloat(item);
                }
            }
        }
    
        // Calculate the remaining size available for fractional columns/rows
        const remainingSize = totalSize - totalFixedSize;
    
        // Calculate the size of each fractional column/row
        const frSizes: number[] = [];
        let totalFrUnits = 0;
        for (const item of pattern) {
            if (typeof item === 'string' && item.endsWith('fr')) {
                const frUnits = parseFloat(item);
                frSizes.push(frUnits);
                totalFrUnits += frUnits;
            }
        }
    
        // Calculate the size of each fractional unit
        const frUnitSize = totalFrUnits > 0 ? remainingSize / totalFrUnits : 0;
    
        // Calculate the actual size for each cell based on the pattern
        for (const item of pattern) {
            if (typeof item === 'string') {
                if (item.endsWith('fr')) {
                    // Fractional column/row
                    cellDimensions.push(Math.floor(frSizes.shift()! * frUnitSize)); // Use floor instead of rounding down
                } else {
                    // Fixed column/row
                    cellDimensions.push(Math.floor(parseFloat(item))); // Use floor instead of rounding down
                }
            } else {
                // Non-string item (e.g., 'auto')
                cellDimensions.push(item);
            }
        }
    
        return cellDimensions;
    }
    
    
}
