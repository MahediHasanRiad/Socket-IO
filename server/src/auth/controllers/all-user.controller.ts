import { asyncHandler } from "../../helper/asyncHandler";
import { prisma } from "../../lib/prisma";

export const AllUserController = asyncHandler(async(req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json({users, message: 'success'})
    } catch (error) {
        console.error(error)
    }
})