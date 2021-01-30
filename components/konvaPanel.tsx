import React, { useEffect } from "react"
import { Layer, Image } from "react-konva"
import useDimensions from 'react-use-dimensions';
import KonvaRectangle from './konvaRectangle'
import useImage from 'use-image';
import styled from 'styled-components'
import ScrollableStage from './scrollableStage'
import PrincetonFurniture from './princetonFurniture'
import { initialShapes, standardFurniture } from './shapes'


// highest building number is 29 http://rooms.tigerapps.org/static/newrooms/svgz/0029-00.svgz


const FullWidthContainer = styled.div`
    width: 100%; 
    height: 90vh; 
    border: 2px solid black;
    border-radius: 3px; 
    margin-top: 16px;
`

const KonvaEditor = ({ activeStep }) => {
    const [ref, { width, height }] = useDimensions()            // get canvas dimensions
    const [scale, setScale] = React.useState(0.1)               // scale down map to fill canvas
    const [pttopxscaler, setPttopxscaler] = React.useState(1)           // ratio of pixels to ft
    const [shapes, setShapes] = React.useState(initialShapes)   // shapes array
    const [selectedShapeId, selectShapeId] = React.useState(0)  // selected shape
    const [scaleToggle, setScaleToggle] = React.useState(false) // reset scale button

    const floorplan = React.useRef(null);
    const [floorplanSvg] = useImage('http://rooms.tigerapps.org/static/newrooms/svgz/0010-02.svgz')

    // deselect when clicked on empty area
    const checkDeselect = (e) => {
        const clickedOnEmpty = (e.target.getLayer() === floorplan.current.getLayer()) || (e.target === e.target.getStage())
        if (clickedOnEmpty) {
            selectShapeId(null)
        }
    }

    // set scale (floorplan to windowsize)
    useEffect(() => {
        const Xscale = width / floorplan?.current?.attrs?.image?.width
        const Yscale = height / floorplan?.current?.attrs?.image?.height
        const minscale = Math.min(Xscale, Yscale)
        if (!isNaN(minscale)) {
            const r = minscale / scale
            setScale(minscale)
            setShapes(shapes.map((shape) => {
                if (shape.shape !== 'img') return { ...shape, x: shape.x * r, y: shape.y * r, width: shape?.width * r, height: shape?.height * r }
                else return { ...shape, x: shape.x * r, y: shape.y * r }
            }))
        }

    }, [width, height, floorplan, floorplanSvg])

    

    useEffect(() => {
        if (activeStep == 0) setShapes(initialShapes)
        if (activeStep == 1) {
            setShapes(standardFurniture.map(furniture => {
                return ({
                    ...furniture,
                    shapescale: pttopxscaler / 10,
                })
            }))
        }
    }, [activeStep])

    // , furniture.shapescale: 10 / pixelstoft
    return (
        <>
            <button onClick={() => { setScaleToggle(() => !scaleToggle) }} >Reset Zoom</button>
            <FullWidthContainer ref={ref}>
                <ScrollableStage width={width} height={height} onMouseDown={checkDeselect} onTouchStart={checkDeselect} scaleToggle={scaleToggle}>
                    <Layer>
                        <Image ref={floorplan} image={floorplanSvg} scaleX={scale} scaleY={scale} />
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
                            if (props.shape == 'img') return (
                                <PrincetonFurniture
                                    key={props.id}
                                    shapeProps={props}
                                    
                                    setPttopxscaler={setPttopxscaler}
                                    scale={scale * props.shapescale}
                                    imagename={props.imagename}
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
                </ScrollableStage>
            </FullWidthContainer>
        </>
    )
}

export default KonvaEditor