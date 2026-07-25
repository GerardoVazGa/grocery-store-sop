import { useBarcodeScanner } from "../hooks/useBarcodeScanner"

export function BarcodeScanner({ onDetected }) {
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

    return (
        <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {devices.length > 1 && (
                    <select
                        value={selectedDeviceId ?? ""}
                        onChange={(e) => setSelectedDeviceId(e.target.value)}
                        disabled={isActive}
                    >
                        {devices.map((device) => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label || `Cámara ${device.deviceId.slice(0, 8)}`}
                            </option>
                        ))}
                    </select>
                )}
                {!isActive ? (
                    <button onClick={startScanner} disabled={!selectedDeviceId}>
                        📷 Escanear
                    </button>
                ) : (
                    <button onClick={stopScanner}>Cancelar</button>
                )}
            </div>

            <div
                ref={scannerRef}
                style={{
                    display: isActive ? "block" : "none",
                    width: "100%",
                    maxWidth: "400px",
                    marginTop: "8px",
                    position: "relative",
                }}
            />

            {error && <p>{error}</p>}
        </div>
    )
}