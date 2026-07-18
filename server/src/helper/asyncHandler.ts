import type { NextFunction, Request, Response } from 'express'

type AsyncHandlerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>

export const asyncHandler = (fn: AsyncHandlerType) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req, res, next)
    } catch (error: any) {
        console.error(error?.response?.data?.message || error.message || error)
        next(error)
    }
}