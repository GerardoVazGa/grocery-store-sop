import { useBarcodeScanner } from "../hooks/useBarcodeScanner"

export function BarcodeScanner({ onDetected, compact = false }) {
    const {
        isActive,
        error,
        devices,
        selectedDeviceId,
        setSelectedDeviceId,
        scannerRef,
        startScanner,
        stopScanner,
    } = useBarcodeScanner({ onDetected })

    const content = (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
                {devices.length > 1 && (
                    <select
                        value={selectedDeviceId ?? ""}
                        onChange={(e) => setSelectedDeviceId(e.target.value)}
                        disabled={isActive}
                        className="min-w-56 rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none transition focus:border-primary disabled:bg-gray-100 disabled:text-text-muted"
                    >
                        {devices.map((device) => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label || `Cámara ${device.deviceId.slice(0, 8)}`}
                            </option>
                        ))}
                    </select>
                )}

                {!isActive ? (
                    <button
                        onClick={startScanner}
                        disabled={!selectedDeviceId}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-sidebar-text transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        📷 Escanear
                    </button>
                ) : (
                    <button
                        onClick={stopScanner}
                        className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        ✖ Cancelar
                    </button>
                )}
            </div>

            {isActive && (
                <div className="overflow-hidden rounded-xl border border-border bg-black shadow-inner">
                    <div className="relative mx-auto w-full max-w-md aspect-video">
                        <div ref={scannerRef} className="absolute inset-0" />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="h-24 w-72 rounded-lg border-4 border-green-400 shadow-[0_0_12px_rgba(34,197,94,.7)]" />
                        </div>
                    </div>
                    <div className="border-t border-white/10 bg-black/80 px-4 py-3 text-center text-sm text-white">
                        Coloca el código de barras dentro del recuadro
                    </div>
                </div>
            )}

            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}
        </div>
    )

    if (compact) return content

    return (
        <div className="space-y-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
            {content}
        </div>
    )
}