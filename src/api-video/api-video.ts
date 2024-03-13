import { slugyfy } from "../helpers/strigHelpers";
import { Video } from "../models/video";
import { db } from "./database";

/************************** fonction d'ajout de video ****************** */
export const addVideo = async (video: Video) => {
    try {
        video.slug = slugyfy(video.title)
        await db.addData("videos", video)
        return {
            isSuccess: true,
            message: "video added succesfully"
        }


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}

/************************** fonction de mise a jour de video ****************** */

export const updateVideo = async (video: Video) => {
    try {
        await db.updateData("videos", video)
        return {
            isSuccess: true,
            message: "video updated succesfully"
        }


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}


/************************** fonction de recuperation  d'une video ****************** */


export const getVideo = async (_id: number) => {
    try {
        const video = await db.getData("videos", _id)
        return {
            isSuccess: true,
            result: video
        }


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}

/************************** fonction de recuperation  de toutes les videos ****************** */

export const getAllVideo = async () => {
    try {
        const videos = await db.getAllData("videos")
        return {
            isSuccess: true,
            result: videos,
        }


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}

/************************** fonction de suppression  d'une video ****************** */


export const deleteVideo = async (_id: number) => {
    try {
        await db.deleteData("videos", _id)
        return {
            isSuccess: true,
            message: "video deleted succesfully"
        }


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}


/************************** fonction de recherche d'une video ****************** */



export const seachVideoBySlug = async (slug: string) => {
    try {

        const videos = await db.search("videos", "slug", slug)
        return {
            isSuccess: true,
            result: videos[0]

        }


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}

/**************************fonction de recuperation de video par page  ****************** */


export const getVideoByPage = async (page = 1,pageSize=10) => {
    try {
      return  await db.getDataWithPagination("videos",page,pageSize)
      


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}
// fonction de recuperation de video par page 

export const findVideo = async (keyword:string,field='title', page = 1,pageSize=10) => {
    try {
      return  await db.searchByTag("videos",field,keyword,page,pageSize)
      


    } catch (error) {
        console.log({ error });
        return {
            isSuccess: false,
            error
        }


    }
}
/*
getDataWithPagination(dbTable: string, currentPage: number,
     pageSize: number): Promise<{ isSuccess: boolean;
         results?: Record<string, any>[]; totalPages?: number;
          currentPage?: number;
           nextPage?: number | null; previousPage?: number | null; }>
            Retrieves paginated data from the specified table in the database,
             including information about total pages, current page, next page, and previous page.
*/
