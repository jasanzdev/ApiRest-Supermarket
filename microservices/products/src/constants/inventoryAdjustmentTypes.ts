export const InventoryAdjustmentTypes = ['SALE', 'PURCHASE', 'RETURN', 'CORRECTION'] as const

export type InventoryAdjustmentTypes = typeof InventoryAdjustmentTypes[number]