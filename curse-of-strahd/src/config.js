import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    assetsDir: path.join(__dirname, "../assets"),
    dataDir: null,
    fortunes: null,
    npcs: null
}