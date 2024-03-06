import { environment } from "src/environments/environment";

export const BASE_URL: string = `http://${environment.server}:${environment.port}`;
export const HTTP_CONSTANTS = {    
    API: {
        ARTICOLI: {
            CERCA: `${BASE_URL}/api/articoli/cerca`,
        }
    }
}; 