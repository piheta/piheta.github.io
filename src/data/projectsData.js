// Centralized file structure data
export const rootFiles = [
    { type: 'notepad', name: 'about-me.txt', hasModel: true },
    { type: 'notepad', name: 'cv.txt', hasModel: true }
]

export const projectFiles = [
    { type: 'notepad', name: 'smidle.txt', hasModel: true },
    { type: 'notepad', name: 'tidly.txt', hasModel: true }, 
    { type: 'notepad', name: 'bachelor.txt', hasModel: true },
    { type: 'notepad', name: 'sept.txt', hasModel: true }
]

export const socialLinks = [
    { icon: "/icons/linked-in.webp", text: "LinkedIn", href: "https://www.linkedin.com/in/mateusz-picheta" },
    { icon: "/icons/github.webp", text: "GitHub", href: "https://github.com/piheta" }
]

// Helper to get all files with models for preloading
export const getAllModelFiles = () => {
    return [...rootFiles, ...projectFiles]
        .filter(file => file.hasModel)
        .map(file => file.name.replace('.txt', '.glb'))
}

// Helper to map filename to model path
export const getModelPath = (fileName) => {
    const allFiles = [...rootFiles, ...projectFiles]
    const file = allFiles.find(f => f.name === fileName)
    if (file && file.hasModel) {
        return `/${fileName.replace('.txt', '.glb')}`
    }
    return null
}