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
