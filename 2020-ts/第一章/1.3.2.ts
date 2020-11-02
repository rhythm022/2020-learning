class Grid {
    Width:number = 0;
    Height:number = 0;
    Padding:number;

    constructor(Padding:number) {
        this.Padding = Padding
    }

}

class Margin{
    Left :number = 0;
    Top :number = 0;
    Padding?:number;

}

function ConsolidateGrid(grid:Grid,margin:Margin):Grid & Margin {
let consolidateGrid = <Grid & Margin>{}
    consolidateGrid.Height = grid.Height
    consolidateGrid.Width = grid.Width
    consolidateGrid.Left = margin.Left
    // consolidateGrid.Top = margin.Top


    return consolidateGrid
}


const aa = ConsolidateGrid(
    new Grid(10),
    new Margin(),
)


console.log(
    aa
)






























