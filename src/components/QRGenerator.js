import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRGenerator = ({ defaultText = JSON.stringify({ product: "Nitrogen Fertilizer", id: 1, price: "₹500" }) }) => {
  const [text, setText] = useState(defaultText);

  return (
    <div style={{ width: "90%", margin: "20px auto", fontFamily: "Arial" }}>
      <h3>QR Generator (for testing)</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%", fontSize: "14px" }}
      />
      <div style={{ marginTop: 10 }}>
        <QRCodeSVG value={text || "empty"} size={160} />
      </div>
    </div>
  );
};

export default QRGenerator;
