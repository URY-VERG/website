import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null);
  const html5QrcodeRef = useRef(null);

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id; // first camera
          html5QrcodeRef.current = new Html5Qrcode(scannerRef.current.id);

          html5QrcodeRef.current.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
              setScannedData(decodedText); // QR scan success
            },
            (errorMessage) => {
              // optional error callback
              console.warn(errorMessage);
            }
          );
        }
      })
      .catch((err) => console.error("Camera error:", err));

    return () => {
      if (html5QrcodeRef.current) {
        html5QrcodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleClear = () => setScannedData(null);

  return (
    <div style={{ width: "90%", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>QR Scanner</h2>
      <div id="qr-reader" ref={scannerRef} style={{ width: 300, height: 300 }}></div>

      <button onClick={handleClear} style={{ marginTop: 10 }}>
        Clear Result
      </button>

      {scannedData && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
          <h3>Scanned Data:</h3>
          <pre>{scannedData}</pre>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
