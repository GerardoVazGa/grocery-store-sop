import Quagga from "@ericblade/quagga2"
import { useEffect, useRef, useState } from "react"

export function useBarcodeScanner({ onDetected }) {
    const [isActive, setIsActive] = useState(false)
    const [devices, setDevices] = useState([])
    const [selectedDeviceId, setSelectedDeviceId] = useState(null)
    const [error, setError] = useState(null)
    const scannerRef = useRef(null)
    const onDetectedRef = useRef(onDetected)
    const lastCodeRef = useRef(null);
    const timeoutRef = useRef(null);


    useEffect(() => {
        onDetectedRef.current = onDetected
    }, [onDetected])

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then((allDevices) => {
                const videoDevices = allDevices.filter((d) => d.kind === "videoinput")
                setDevices(videoDevices)
                if (videoDevices.length > 0) {
                    setSelectedDeviceId(videoDevices[0].deviceId)
                }
            })
            .catch(() => setError("No se encontraron dispositivos de video"))
    }, [])

    const stopScanner = () => {
        try {
            Quagga.offDetected()
            Quagga.stop()
        } catch (err) {
            console.error("Error al detener el escáner:", err)
        }
        setIsActive(false)
        setError(null)
    }

    useEffect(() => {
        return () => {
            try {
                Quagga.offDetected()
                Quagga.stop()
            } catch (err) {
                console.error(err)
            }
        }
    }, [])

    useEffect(() => {
        if (!isActive || !scannerRef.current || !selectedDeviceId) return

        Quagga.init({
            inputStream: {
                type: "LiveStream",
                target: scannerRef.current,
                constraints: {
                    deviceId: selectedDeviceId,
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            },
            decoder: {
                readers: [
                    "ean_reader",
                    "ean_8_reader",
                    "upc_reader",
                    "upc_e_reader",
                ],
            },
            locate: true,
        }, (err) => {
            if (err) {
                setError("No se pudo acceder a la cámara")
                setIsActive(false)
                return
            }
            Quagga.start()
        })

        const handleDetected = (result) => {
            const code = result.codeResult?.code;

            if (!code) return;

            if (lastCodeRef.current === code) return;

            lastCodeRef.current = code;

            onDetectedRef.current(code);

            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                lastCodeRef.current = null;
            }, 1000);
        }
        
        Quagga.onDetected(handleDetected)

        return () => {
            try {
                Quagga.offDetected(handleDetected)
                Quagga.stop()
            } catch (err) {
                console.error(err)
            }
        }
    }, [isActive, selectedDeviceId])

    return {
        scannerRef,
        devices,
        selectedDeviceId,
        setSelectedDeviceId,
        isActive,
        startScanner: () => {
            setIsActive(true)
            setError(null)
        },
        stopScanner,
        error
    }
}