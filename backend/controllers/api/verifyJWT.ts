import { Request,Response } from "express";

function verifyJWT(req:Request , res:Response) {
  res.status(200).send({});
}

export default verifyJWT;