import React, { useEffect, useRef, useState } from "react"
import { Stage, Layer, Star, Text, Path, Image } from "react-konva"
import useDimensions from 'react-use-dimensions';
import KonvaRectangle from './konvaRectangle'
import useImage from 'use-image';
import styled from 'styled-components'

// highest building number is 29 http://rooms.tigerapps.org/static/newrooms/svgz/0029-00.svgz



const initialShapes = [
    {
        x: 99,
        y: 67,
        width: 9,
        height: 4,
        fill: 'black',
        id: 0,
        shape: 'rect',
        shapescale: 1,
    },
    {
        x: 96,
        y: 57,
        width: 5,
        height: 10,
        fill: 'grey',
        id: 1,
        shape: 'rect',
        shapescale: 1
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'grey',
        id: 1,
        shape: 'circle',
        shapescale: 1
    },
]


const FullWidthContainer = styled.div`
    width: 100%; 
    height: 90vh; 
    border: 2px solid black;
    border-radius: 3px; 
    margin-top: 16px;
`

const KonvaEditor = () => {
    const [scale, setScale] = React.useState(0.1);


    const [ref, { width, height }] = useDimensions();
    const [shapes, setShapes] = React.useState(initialShapes);
    const [selectedShapeId, selectShapeId] = React.useState(null);

    const backRef = React.useRef(null);

    const [image] = useImage('http://rooms.tigerapps.org/static/newrooms/svgz/0010-02.svgz');

    // deselect when clicked on empty area
    const checkDeselect = (e) => {
        const clickedOnEmpty = (e.target === e.target.getStage());
        if (clickedOnEmpty) {
            selectShapeId(null)
        }
    }
    console.log(shapes)
    // set scale
    useEffect(() => {
        const Xscale = width / backRef?.current?.attrs?.image?.width
        const Yscale = height / backRef?.current?.attrs?.image?.height
        const minscale = Math.min(Xscale, Yscale)
        if (!isNaN(minscale)) {
            const r = minscale / scale
            setScale(minscale)
            setShapes(shapes.map((shape) => {
                return { ...shape, shapescale: shape.shapescale * r, x: shape.x * r, y: shape.y * r, width: shape.width * r, height: shape.height * r }
            }))
        }

    }, [width, height, backRef, image])


    return (
        <>
            <FullWidthContainer ref={ref}>
                <Stage width={width} height={height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
                    <Layer>
                        <Image ref={backRef} image={image} scaleX={scale} scaleY={scale} />
                    </Layer>
                    <Layer>

                        {shapes.map((props, i) => {
                            if (props.shape == 'rect') return (
                                <KonvaRectangle
                                    key={props.id}
                                    shapeProps={props}
                                    isSelected={props.id === selectedShapeId}
                                    onSelect={() => { selectShapeId(props.id) }}
                                    onChange={(newAttrs) => {
                                        const tempshapes = shapes.slice()
                                        tempshapes[i] = newAttrs
                                        setShapes(tempshapes)
                                    }}
                                />
                            )
                        })}


                    </Layer>
                </Stage>
            </FullWidthContainer>
        </>
    )
}

export default KonvaEditor

    // < Stage width = { width } height = { height } style = {{ position: 'absolute', top: 0 }}>
    //     <Layer>
    //         <Image ref={backRef} image={image} scaleX={scale} scaleY={scale} />
    //     </Layer>
    //             </Stage >