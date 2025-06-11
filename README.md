# Interactive 3D Car Showcase

This is a real-time 3D car experience built with **React**, **Three.js**, and **@react-three/fiber**, showcasing dynamic car models, camera transitions, reflections, lighting, and smooth animations—all rendered in the browser.

---

## Features

- **Animated Car Transitions**: Vehicles drive in and out of view with custom logic and animation timing.
- **Custom Camera Controls**: Orbit controls with auto-rotation during intro screen.
- **Real-Time Environment**: Dynamic lighting, shadows, and real-time environment reflections using cube cameras.
- **Vehicle Switching**: Swap between different car models (e.g., Corvette C7, McLaren P1).
- **UI Transitions**: Smooth interface animations via `react/motion`.
- **Optimized for Performance**:
  - DRACO compression for 3D models
  - Preload and reuse GLTF scenes efficiently

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React** | Frontend framework |
| **Three.js** | 3D rendering |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful abstractions for Three.js (e.g., `Environment`, `PerspectiveCamera`, `OrbitControls`) |
| **Valtio** | Lightweight state management |
| **Framer Motion** | UI transitions and animations |
| **GLTF + DRACO** | Compressed 3D models with faster load time |
| **Sketchfab** | Model source (licensed under CC-BY-4.0) |

## Models & Attribution
Corvette C7 and McLaren P1 3D models provided by creators on Sketchfab, used under CC-BY-4.0.

## Future Enhancements (Ideas)
* Environment switching
* Model loading indicators
* Car customization UI
* Mobile enable
* Performance tuning (LOD, lazy loading)

## License
This project is for personal/demo use. All 3D models and textures belong to their respective authors as credited.
