import { TextureMLApp } from "./app"

// app instance
let app: TextureMLApp = null;

// onload (cretae app)
window.onload = event => app = new TextureMLApp();