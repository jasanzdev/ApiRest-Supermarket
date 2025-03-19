import { InventoryAdjustmentTypes } from '../constants/inventoryAdjustmentTypes'

export const ApplyInventoryAdjustment = (stock: number, quantity: number, type: InventoryAdjustmentTypes): number | null => {

    const adjustmentOperations = {
        SALE: (stock: number, quantity: number) => stock >= quantity ? stock - quantity : null,
        PURCHASE: (stock: number, quantity: number) => stock + quantity,
        RETURN: (stock: number, quantity: number) => stock + quantity,
        CORRECTION: (_: number, quantity: number) => quantity
    }

    return adjustmentOperations[type]?.(stock, quantity)
}
