import type { GameMap } from "@/models/game-map.interface";
import axios, { type AxiosResponse } from "axios";

export default{

     getAllMaps():Promise<AxiosResponse<GameMap[], any>>{
        return axios.get<GameMap[]>('/api/maps');
    },

    getMapById(gameMapId: number):Promise<AxiosResponse<GameMap, any>>{
        return axios.get<GameMap>(`api/maps/${gameMapId}`);
    }

}
