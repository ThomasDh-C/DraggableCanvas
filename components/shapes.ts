export interface Shape {
    id?: number,
    shape: string,
    imagename?: string,
    x: number,
    y: number,
    shapescale?: number,
    resizable?: boolean,
    width?: number,
    height?: number,
    rotation?: number,
    fill?: string,
}

export const initialShapes: Array<Shape> = [
    {
        id: 0,
        shape: 'img',
        imagename: 'thirtytwofoot',
        x: 10,
        y: 10,
        shapescale: 1,
        resizable: true,
    },
]

export const standardFurniture = (x: number, y: number): Array<Shape> => {
    return (
        [
            {
                shape: 'img',
                imagename: 'bed',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'bookshelf',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'chair',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'desk',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'dresser',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'wardrobe',
                x: x,
                y: y,
                rotation: 90,
            },

        ]
    )
}

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
