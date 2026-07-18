import { asyncHandler } from "../../helper/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";

export const registerController = asyncHandler(async (req, res) => {
    /**
     * get name email password = req.body
     * if(empty) return
     * check email exist or not
     * if (exist) throw error
     * create
     */

    const {name, email, password} = req.body 

    if(!name || !email || !password) {
        throw Error('Name, email, password field are required !!!')
    }

    const existEmail = await prisma.user.findFirst({where: {email}})
    if(existEmail) throw Error('User already exist !!!')

    const create = await prisma.user.create({data: {
        name,
        email,
        password
    }})

    res.status(201).json({message: 'successfully created', user: create})
})