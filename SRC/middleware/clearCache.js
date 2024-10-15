import { clearCache } from "../utils/cacheManager.js"


export const  cleanCache=async (req, res, next) => {
    await next()

  clearCache(req.user._id)
}