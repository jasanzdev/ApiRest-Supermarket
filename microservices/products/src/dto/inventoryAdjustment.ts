import z from 'zod'
import { InventoryAdjustmentTypes } from '../constants/inventoryAdjustmentTypes'
import { InventoryAdjustment } from '../types/types'

const inventoryAdjustmentSchema = z.object({
    type: z.enum(InventoryAdjustmentTypes, {
        errorMap: () => {
            return {
                message: `Invalid adjustment type. It must be one of: ${InventoryAdjustmentTypes.join(', ')}.`
            }
        }
    }),
    quantity: z.number()
        .int('Quantity must be an integer.')
        .positive('Quantity must be a positive number.'),
    reason: z.string()
        .trim()
        .min(1, 'Reason cannot be empty.'),
})

export function ValidateInventoryAdjustmentInput(input: InventoryAdjustment) {
    const result = inventoryAdjustmentSchema.safeParse(input)

    if (result.error) throw result.error

    return result.data as InventoryAdjustment
}