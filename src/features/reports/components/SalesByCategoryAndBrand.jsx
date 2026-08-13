import { useSalesByCategoryAndBrand } from "../hooks/useSalesByCategoryAndBrand";
import { useReportsPeriodStore } from "../store/reportsStore";

const periodLabel = {
    day: "hoy",
    week: "esta semana",
    month: "este mes",
}

export function SalesByCategoryAndBrand() {
    const { period } = useReportsPeriodStore()
    const { salesByCategoryAndBrand, isLoading, error } = useSalesByCategoryAndBrand(period)

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-gray-500">Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
                Error al cargar la información.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Ventas por categoría y marca {periodLabel[period]}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Resumen de unidades vendidas e ingresos por categoría.
                </p>
            </div>

            {salesByCategoryAndBrand.map((category) => (
                <section
                    key={category.categoryId}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                    <div className="border-b bg-gray-50 px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {category.categoryName}
                        </h3>
                    </div>

                    <div className="grid gap-4 border-b p-6 md:grid-cols-2">
                        <div className="rounded-lg bg-metric-blue-bg p-4">
                            <p className="text-sm text-metric-blue-text">
                                Unidades vendidas
                            </p>
                            <p className="mt-1 text-2xl font-bold text-metric-blue-text">
                                {category.totalQuantity}
                            </p>
                        </div>

                        <div className="rounded-lg bg-metric-green-bg p-4">
                            <p className="text-sm text-metric-green-text">
                                Ingresos
                            </p>
                            <p className="mt-1 text-2xl font-bold text-metric-green-text">
                                $
                                {Number(category.totalRevenue).toLocaleString(
                                    "es-MX",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-table-header-bg">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-table-header-text ">
                                        Marca
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-table-header-text">
                                        Unidades
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-table-header-text">
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {category.brands.map((brand) => (
                                    <tr
                                        key={brand.brandId}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {brand.brandName}
                                        </td>

                                        <td className="px-6 py-4 text-center text-gray-600">
                                            {brand.totalQuantity}
                                        </td>

                                        <td className="px-6 py-4 text-right font-semibold text-green-700">
                                            $
                                            {Number(
                                                brand.totalRevenue
                                            ).toLocaleString("es-MX", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
        </div>
    );
}