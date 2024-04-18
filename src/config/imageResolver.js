import { backendURIs } from "./routes"

export const imageSRCHandler = (sourceLink) => {
    return backendURIs.base + '/' + sourceLink;
}