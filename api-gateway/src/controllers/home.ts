import { Request, Response } from 'express'

export const HomeController = (req: Request, res: Response) => {
    res.status(200).json(
        {
            routes: 'Routes for this Api Rest',
            products: 'get | get/id | post | patch/id | delete/id',
            auth: 'post/login | post/register | get/logout'
        })
}
