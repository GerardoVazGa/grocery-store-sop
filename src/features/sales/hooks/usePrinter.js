import { useEffect, useState } from "react"

export function usePrinter() {
    const [hasPrinter, setHasPrinter] = useState(false)
    const [printerName, setPrinterName] = useState(null)

    useEffect(() => {
        console.log(window.api.printer.getAvailable())
        window.api.printer.getAvailable()
            .then((printers) => {
                const thermal = printers.find((p) =>
                    !p.name.toLowerCase().includes("pdf") &&
                    !p.name.toLowerCase().includes("fax") &&
                    !p.name.toLowerCase().includes("microsoft") &&
                    !p.name.toLowerCase().includes("onenote")
                )
                if (thermal) {
                    setHasPrinter(true)
                    setPrinterName(thermal.name)
                }
            })
            .catch(() => setHasPrinter(false))
    }, [])

    return { hasPrinter, printerName }
}