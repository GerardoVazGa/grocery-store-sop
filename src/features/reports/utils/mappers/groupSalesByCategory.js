export function groupSalesByCategory(sales) {
    const groupedSales = {}

    for(const item of sales) {
        if(!groupedSales[item.categoryId]) {
            groupedSales[item.categoryId] = {
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                totalRevenue: 0,
                totalSales: 0,
                totalQuantity: 0,
                brands: []
            }
        }

        const category = groupedSales[item.categoryId]

        category.totalRevenue += item.totalRevenue
        category.totalSales += item.totalSales
        category.totalQuantity += item.totalQuantity

        category.brands.push({
            brandId: item.brandId,
            brandName: item.brandName,
            totalSales: item.totalSales,
            totalQuantity: item.totalQuantity,
            totalRevenue: item.totalRevenue
        })
    }

    return Object.values(groupedSales)
}