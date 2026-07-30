import bcrypt from "bcryptjs";
import { asyncHandler } from "../../helper/asyncHandler";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

export const LoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) throw Error('Email and Password both are required !')

  const emailExist = await prisma.user.findFirst({ where: { email: email } });
  if (!emailExist) throw Error("User not found !!!");

  const pass = bcrypt.compare(password, emailExist.password)
  if(!pass) throw Error('Invalid Password')

  // generate token
  const accessToken = jwt.sign(
    { id: emailExist.id },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: `${process.env.ACCESS_TOKEN_EXPIREIN}`} as any,
  );

  res.status(200).cookie('accessToken', accessToken).json({data: emailExist, token: accessToken})
});
