"use client"
import { Canvas } from "@react-three/fiber";

// const Sphere = () => {
//     return(
//         <mesh position = {[-1, 0, 0]}>
//             <sphereGeometry args = {[3, 32, 32]} />
//             <meshStandardMaterial color = "green" />
//         </mesh>
//     )
// }
 
// function PhoneMockup({
//   children,
//   className = "",
//   rotation = 0,
//   scale = 1,
// }: {
//   children: React.ReactNode
//   className?: string
//   rotation?: number
//   scale?: number
// }) 


const Cube = (
    { position, size, color} :{
        position: [number, number, number];
        size: [number, number, number];
        color?: string | number;
    }) => {
    return(
        <mesh position = {position}>
             <boxGeometry args = {size} />
             <meshStandardMaterial color = {color} />
        </mesh>
    )
}



export default function threejs(){
    return(
        <Canvas>
            <ambientLight intensity = {0.9} />
            <Cube position = {[1, 0, 0]} size = {[2, 2, 2]} color = "#FF0000" />
            <Cube position = {[-1, 0, 0]} size = {[2, 2, 2]} color = "#00FF00" />

            <Cube position = {[-1, 2, 0]} size = {[2, 2, 2]} color = "#0000FF" />
            <Cube position = {[1, 2, 0]} size = {[2, 2, 2]} color = "#000000" />
        </Canvas>
    )
}