export interface Shape {
    x: number,
    y: number,
    width?: number,
    height?: number,
    rotation?: number,
    fill?: string,
    id: number,
    shape: string,
    imagename?: string,
    shapescale?: number,
    resizable?: boolean
}

export const initialShapes: Array<Shape> = [
    {
        x: 10,
        y: 10,
        id: 0,
        rotation: 0,
        shape: 'img',
        imagename: 'twentyfoot',
        shapescale: 1,
        resizable: true,
    },
]

export const standardFurniture: Array<Shape> = [
    {
            x: 10,
            y: 10,
            id: 2,
            rotation: 90,
            shape: 'img',
            imagename: 'bed3',
            shapescale: (5.44 / 8.5) * 0.22,
        },
        {
            x: 10,
            y: 10,
            id: 3,
            rotation: 90,
            shape: 'img',
            imagename: 'bookshelf',
            shapescale: (5.44 / 8.5) * 0.22,
        },
]
// imagename: 'dormbed',
//         shapescale: (5.44 / 8.5) * 0.4,
// {
//     x: 99,
//     y: 67,
//     width: 9,
//     height: 4,
//     fill: 'black',
//     id: 0,
//     shape: 'rect',
//     shapescale: 1,
// },
// {
//     x: 96,
//     y: 57,
//     width: 5,
//     height: 10,
//     fill: 'grey',
//     id: 1,
//     shape: 'rect',
//     shapescale: 1
// },
// {
//     x: 10,
//     y: 10,
//     id: 2,
//     rotation: 90,
//     shape: 'img',
//     imagename: 'bed3',
//     shapescale: (5.44 / 8.5) * 0.22,
// },
// {
//     x: 10,
//     y: 10,
//     id: 3,
//     rotation: 90,
//     shape: 'img',
//     imagename: 'bookshelf',
//     shapescale: (5.44 / 8.5) * 0.22,
// },
