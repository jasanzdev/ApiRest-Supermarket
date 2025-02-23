import z from 'zod'
import { Roles } from '../constants/roles';
import { User } from '../types/user';
import { ValidateEmailExist, ValidateUsernameExist } from '../utils/validateUser';

const UserSchema = z.object({
    name: z.string().min(3).regex(/^(?=.*[a-zA-Z]).{3,50}$/,
        { message: 'The name must only have letters' }),
    username: z.string(),
    password: z.string().min(6).max(12)
        .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@!#$.,/*&%+<>()]).{6,12}$/,
            { message: 'The password to have at least one especial character, letters and numbers' }),
    email: z.string().email({ message: 'Invalid email format' }),
    role: z.enum(Roles)
}).superRefine(async (data, ctx) => {
    const isUsernameUnique = await ValidateUsernameExist(data.username)
    if (!isUsernameUnique) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['username'],
            message: 'The username already exists',
        });
    }

    const isEmailUnique = await ValidateEmailExist(data.email);
    if (!isEmailUnique) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['email'],
            message: 'The email already exists',
        });
    }
})

export async function validateUser(input: User) {
    const result = await UserSchema.safeParseAsync(input)
    if (result.error) {
        throw result.error
    }
    return result.data
}
