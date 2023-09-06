import {Div} from "./Div";
import { BaseComponent } from "./BaseComponent";
import ComponentStyleProps from "./ComponentStyleProps";
import { parseCoordinate } from "./utils/parseCoordinate";

export class Grid extends Div {
    private gridTemplateColumns: string[] = [];
    private gridTemplateRows: string[] = [];
    /*
    constructor(props?: { style: Partial<ComponentStyleProps>, id?: string, columnsPattern: string[], rowsPattern: string[]}, children?: BaseComponent[]) {
        super(props, children);
        this.setGridTemplate(props?.columnsPattern || [], props?.rowsPattern || []);
    }

    setGridTemplate(columnsPattern: string[], rowsPattern: string[]) {
        print(columnsPattern.length, rowsPattern.length)
        this.gridTemplateColumns = columnsPattern;
        this.gridTemplateRows = rowsPattern;
    }

    render() {
        super.render()
        // Render child elements
        for (const child of this.children) {
            child.render();
        }
    }

    computeLayout(parentWidth: number, parentHeight: number, accumulatedX: number, accumulatedY: number) {
        // Compute grid dimensions based on patterns
        const columnWidths = this.computeGridDimensions(this.gridTemplateColumns, parentWidth);
        const rowHeights = this.computeGridDimensions(this.gridTemplateRows, parentHeight);

        print(columnWidths[0], rowHeights[0])
        print(columnWidths[], rowHeights[1])

        // Set positions and dimensions for child elements based on the grid layout
        let rowIndex = 0;
        let columnIndex = 0;

        let gridX = 0;
        let gridY = 0;

         // Calculate the final position of the grid
         if (this.styleProps.position == 'absolute') {
            gridX = parseCoordinate(this.styleProps.left+"", parentWidth) ;
            gridY = parseCoordinate(this.styleProps.top+"", parentHeight);
         }

        for (const child of this.children) {
            // Calculate cell width and height for the child based on its position in the grid
            const cellWidth = columnWidths[columnIndex];
            const cellHeight = rowHeights[rowIndex];


            // Set child's position and dimensions
            //print(child.computedX, gridX, child.computedY, gridY, child.computedWidth, child.computedHeight)
            // Round child's position to the nearest pixel
            child._renderProps.x = Math.round(gridX + accumulatedX + columnWidths.slice(0, columnIndex).reduce((acc, val) => acc + val, 0));
            child._renderProps.y = Math.round(gridY + accumulatedY + rowHeights.slice(0, rowIndex).reduce((acc, val) => acc + val, 0));

            child._renderProps.width = cellWidth;
            child._renderProps.height = cellHeight;


            child.computeLayout(cellWidth, cellHeight, child._renderProps.x, child._renderProps.y)

            // Increment column and row indices
            columnIndex++;
            if (columnIndex >= this.gridTemplateColumns.length) {
                columnIndex = 0;
                rowIndex++;
            }
        }
    }

    private computeGridDimensions(pattern: string[], totalSize: number): number[] {
        const fixedColumns = pattern.filter((item) => typeof item === 'string' && !item.endsWith('fr'));
        const frColumns = pattern.filter((item) => typeof item === 'string' && item.endsWith('fr'));
    
        const fixedSize = fixedColumns.reduce((acc, item) => acc + parseFloat(item), 0);
        const remainingSize = totalSize - fixedSize;
    
        const frTotal = frColumns.reduce((acc, item) => acc + parseFloat(item), 0);
    
        if (frTotal > 0) {
            const frUnitSize = remainingSize / frTotal;
    
            return pattern.map((item) => {
                if (typeof item === 'string') {
                    if (item.endsWith('fr')) {
                        return Math.floor(frUnitSize * parseFloat(item)); // Use floor instead of rounding down
                    } else {
                        return Math.floor(parseFloat(item)); // Use floor instead of rounding down
                    }
                } else {
                    return item;
                }
            });
        } else {
            // No fractional columns, distribute the fixed size evenly
            const numFixedColumns = fixedColumns.length;
            if (numFixedColumns > 0) {
                const fixedColumnWidth = totalSize / numFixedColumns;
                return pattern.map((item) => (typeof item === 'string' ? Math.floor(fixedColumnWidth) : item)); // Use floor instead of rounding down
            }
        }
    
        return [];
    }
    */
    
}
