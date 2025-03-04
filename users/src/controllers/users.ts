import { RequestHandler } from "express";
import CatchErrors from "../utils/catchError";

export default class UserController {

    static readonly getUsers: RequestHandler = CatchErrors(async (req, res) => {
        res.status(200).send('Get all users')
    })

    static readonly getUserById: RequestHandler = CatchErrors(async (req, res) => {
        res.status(200).send('Get user by id')
    })

    static readonly createUser: RequestHandler = CatchErrors(async (req, res) => {
        res.status(200).send('Create users')
    })

    static readonly updateUser: RequestHandler = CatchErrors(async (req, res) => {
        res.status(200).send('Update user')
    })

    static readonly deleteUser: RequestHandler = CatchErrors(async (req, res) => {
        res.status(200).send('Delete user')
    })
}
