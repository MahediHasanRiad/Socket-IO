import { asyncHandler } from "../../helper/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcryptjs";

export const registerController = asyncHandler(async (req, res) => {
  /**
   * get name email password = req.body
   * if(empty) return
   * check email exist or not
   * if (exist) throw error
   * create
   */

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw Error("Name, email, password field are required !!!");
  }

  const existEmail = await prisma.user.findFirst({ where: { email } });
  if (existEmail) throw Error("User already exist !!!");

  const hashPass = await bcrypt.hash(password, 10)

  const create = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPass,
    },
  });

  res.status(201).json({ message: "successfully created", user: create });
});
