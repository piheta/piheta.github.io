import { useGLTF } from '@react-three/drei'
import { getAllModelFiles } from '../data/projectsData'

// Preload all text models from centralized data
const modelFiles = getAllModelFiles()
modelFiles.forEach(modelFile => {
    useGLTF.preload(`/${modelFile}`)
})

export function useTextModel(fileName) {
    // Load all available models unconditionally to avoid conditional hook calls
    const aboutMeGltf = useGLTF('/about-me.glb')
    const cvGltf = useGLTF('/cv.glb')
    const smidleGltf = useGLTF('/smidle.glb')
    const tidlyGltf = useGLTF('/tidly.glb')
    const bachelorGltf = useGLTF('/bachelor.glb')
    const septGltf = useGLTF('/sept.glb')

    // Map filename to the corresponding loaded model
    const modelMap = {
        'about-me.txt': aboutMeGltf,
        'cv.txt': cvGltf,
        'smidle.txt': smidleGltf,
        'tidly.txt': tidlyGltf,
        'bachelor.txt': bachelorGltf,
        'sept.txt': septGltf
    }

    // Return the specific model or null if not found
    return modelMap[fileName] || null
}
