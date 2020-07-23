// Declarations that allow typescript to not panic when using the webpack
// file-loader syntax (import path from 'file')
declare module "*.gltf" {
    const content: string
    export default content
}
declare module "*.glb" {
    const content: string
    export default content
}
declare module "*.html" {
    const content: string
    export default content
}
declare module "*.md" {
    const content: string
    export default content
}
declare module "*.svg" {
    const content: string
    export default content
}
declare module "*.jpg" {
    const content: string
    export default content
}
declare module "*.jpeg" {
    const content: string
    export default content
}
declare module "*.png" {
    const content: string
    export default content
}
declare module "*.gif" {
    const content: string
    export default content
}
declare module "*.woff" {
    const content: string
    export default content
}
declare module "*.woff2" {
    const content: string
    export default content
}
