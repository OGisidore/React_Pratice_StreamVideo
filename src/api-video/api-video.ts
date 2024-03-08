import { video } from "../models/video";
import { db } from "./database";

/************************** fonction d'ajout de video ****************** */
export const addVideo = async (video:video)=>{
    try {
        await db.addData("videos",video)
        return {
            isSuccess : true,
            message : "video added succesfully"
        }

        
    } catch (error) {
        console.log({error});
        return {
            isSuccess : false,
            error
        }
        
        
    }
}

/************************** fonction de mise a jour de video ****************** */

export const updateVideo = async (video:video)=>{
    try {
        await db.updateData("videos",video)
        return {
            isSuccess : true,
            message : "video updated succesfully"
        }

        
    } catch (error) {
        console.log({error});
        return {
            isSuccess : false,
            error
        }
        
        
    }
}


/************************** fonction de recuperation  d'une video ****************** */


export const getVideo = async (_id:number)=>{
    try {
       const video =  await db.getData("videos",_id)
        return {
            isSuccess : true,
            result : video
        }

        
    } catch (error) {
        console.log({error});
        return {
            isSuccess : false,
            error
        }
        
        
    }
}

/************************** fonction de recuperation  de toutes les videos ****************** */

export const getAllVideo = async ()=>{
    try {
       const videos =  await db.getAllData("videos")
        return {
            isSuccess : true,
            result : videos,
        }

        
    } catch (error) {
        console.log({error});
        return {
            isSuccess : false,
            error
        }
        
        
    }
}

/************************** fonction de suppression  d'une video ****************** */


export const deleteVideo = async (_id:number)=>{
    try {
       await db.deleteData("videos", _id)
        return {
            isSuccess : true,
            message : "video deleted succesfully"
        }

        
    } catch (error) {
        console.log({error});
        return {
            isSuccess : false,
            error
        }
        
        
    }
}



