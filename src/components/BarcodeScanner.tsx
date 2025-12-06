"use client";

import { useEffect, useRef, useState } from "react";

export default function BarcodeScanner({
  onDetect,
}: {
  onDetect: (code: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const detectorRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const hasNative = typeof (window as any).BarcodeDetector === "function";
    if (hasNative) {
      // Try native BarcodeDetector
      try {
        const Detector = (window as any).BarcodeDetector;
        const formats = Detector.getSupportedFormats
          ? Detector.getSupportedFormats()
          : ["ean_13", "code_128", "qr_code"];
        detectorRef.current = new Detector({ formats });
        setSupported(true);
      } catch (err) {
        console.warn("BarcodeDetector init failed:", err);
        setSupported(false);
      }
    } else {
      setSupported(false);
    }

    // start camera stream in either case (native or fallback)
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        // if native available: start tick loop to detect frames
        if ((window as any).BarcodeDetector && detectorRef.current) {
          tickNative();
        } else {
          // fallback attempt - try to load ZXing dynamically
          startZXingFallback();
        }
      })
      .catch((err) => {
        console.warn("Camera error:", err);
      });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
      // If ZXing had a reader active, it will be reset in fallback cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // native tick
  function tickNative() {
    if (!videoRef.current || !detectorRef.current) {
      rafRef.current = requestAnimationFrame(tickNative);
      return;
    }
    if (videoRef.current.readyState < 2) {
      rafRef.current = requestAnimationFrame(tickNative);
      return;
    }
    detectorRef.current
      .detect(videoRef.current)
      .then((results: any[]) => {
        if (results && results.length) {
          const val = results[0].rawValue || results[0].rawData || "";
          if (val) onDetect(val);
        }
        rafRef.current = requestAnimationFrame(tickNative);
      })
      .catch(() => {
        rafRef.current = requestAnimationFrame(tickNative);
      });
  }

  // ZXing fallback dynamic load
  async function startZXingFallback() {
    try {
      // dynamic import so users who don't want dependency won't fail earlier
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const codeReader = new BrowserMultiFormatReader();
      // try decode from video element directly
      if (!videoRef.current) return;
      // decodeFromVideoDevice returns a promise that resolves when stopped
      codeReader
        .decodeFromVideoDevice(
          undefined as any,
          videoRef.current,
          (result, err) => {
            if (result) {
              onDetect(result.getText());
              // we can stop after detection OR continue scanning; here continue
              // codeReader.reset(); // uncomment if you prefer single-shot
            }
            if (err && !(err as any).message?.includes("not found")) {
              // ignore "not found" type errors
              // console.warn(err);
            }
          }
        )
        .catch((e) => {
          console.warn("ZXing start failed:", e);
        });
      setSupported(true);
    } catch (err) {
      console.warn("ZXing not available or failed to load:", err);
      setSupported(false);
    }
  }

  return (
    <div>
      <div className="bg-black rounded overflow-hidden">
        <video ref={videoRef} className="w-full h-[360px] object-cover" />
      </div>

      <div className="mt-2">
        {supported === null && <div>Starting camera...</div>}
        {supported === false && (
          <div className="p-3 bg-yellow-50 rounded">
            Barcode scanning not supported in this browser. Use manual SKU
            entry.
          </div>
        )}
      </div>
    </div>
  );
}
