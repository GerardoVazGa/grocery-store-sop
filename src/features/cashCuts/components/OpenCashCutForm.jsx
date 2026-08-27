import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCashCutStore } from "../store/cashCutStore"
import { cashCutsSchema } from "../schema/cashCutsSchema"

export function OpenCashCutForm() {
    const { openCashCut, isOpening, error } = useCashCutStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(cashCutsSchema),
        defaultValues: { openingAmount: 0 },
    })

    return (
        <div className="min-h-screen bg-primary-bg flex items-center justify-center">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-sm p-8">
                <div className="text-center mb-6">
                    <p className="text-4xl mb-3">🏪</p>
                    <h1 className="text-xl font-bold text-text">Abarrotes POS</h1>
                    <p className="text-text-muted text-sm mt-1">Apertura de caja</p>
                </div>

                <form onSubmit={handleSubmit(openCashCut)} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-text-muted mb-1">
                            Fondo inicial en caja
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                            <input
                                type="number"
                                step="0.01"
                                {...register("openingAmount")}
                                className="w-full pl-7 pr-4 py-3 rounded-xl border border-border bg-primary-bg text-text text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                placeholder="0.00"
                                autoFocus
                            />
                        </div>
                        {errors.openingAmount && (
                            <p className="text-xs text-danger mt-1">{errors.openingAmount.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isOpening}
                        className="w-full bg-primary hover:bg-primary-light text-sidebar-text font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isOpening ? "Abriendo caja..." : "Abrir caja"}
                    </button>
                </form>

                <p className="text-xs text-text-muted text-center mt-4">
                    {new Date().toLocaleDateString("es-MX", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
        </div>
    )
}