import React, { useState } from "react";
import "./ProfitCalculator.css";

function ProfitCalculator() {
  // inputs
  const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState(1); // in acres
  const [costPerAcreMode, setCostPerAcreMode] = useState(true); // true = costs are per-acre
  const [seedCost, setSeedCost] = useState(2000); // per acre or total
  const [fertCost, setFertCost] = useState(1500);
  const [labourCost, setLabourCost] = useState(3000);
  const [irrigCost, setIrrigCost] = useState(800);
  const [yieldPerAcre, setYieldPerAcre] = useState(20); // quintals per acre (example)
  const [pricePerQuintal, setPricePerQuintal] = useState(2300); // ₹ per quintal

  // results
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const parseNum = (v) => {
    const n = Number(String(v).replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // Validation
    if (area <= 0) {
      setError("Area should be greater than 0 acres.");
      return;
    }
    if (yieldPerAcre <= 0) {
      setError("Yield per acre should be greater than 0.");
      return;
    }
    if (pricePerQuintal <= 0) {
      setError("Price per quintal must be greater than 0.");
      return;
    }

    // Costs (either per-acre mode or total mode)
    const s = parseNum(seedCost);
    const f = parseNum(fertCost);
    const l = parseNum(labourCost);
    const i = parseNum(irrigCost);

    let totalInvestment = 0;
    if (costPerAcreMode) {
      // costs are per acre -> multiply by area
      const perAcre = s + f + l + i;
      totalInvestment = perAcre * parseNum(area);
    } else {
      // costs are total (already aggregated)
      totalInvestment = s + f + l + i;
    }

    // Yield and revenue
    const totalYield = parseNum(yieldPerAcre) * parseNum(area); // quintals
    const revenue = totalYield * parseNum(pricePerQuintal);

    const netProfit = revenue - totalInvestment;
    const roiPercent = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;

    // Round numbers to 2 decimals or integers where appropriate
    const res = {
      crop,
      area: Number(area),
      totalInvestment: Math.round(totalInvestment * 100) / 100,
      totalYield: Math.round(totalYield * 100) / 100,
      revenue: Math.round(revenue * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      roiPercent: Math.round(roiPercent * 100) / 100,
      details: {
        seed: s,
        fert: f,
        labour: l,
        irrig: i,
        yieldPerAcre: Number(yieldPerAcre),
        pricePerQuintal: Number(pricePerQuintal),
        costMode: costPerAcreMode ? "per-acre" : "total",
      },
    };

    setResult(res);
  };

  const handleReset = () => {
    setCrop("Wheat");
    setArea(1);
    setCostPerAcreMode(true);
    setSeedCost(2000);
    setFertCost(1500);
    setLabourCost(3000);
    setIrrigCost(800);
    setYieldPerAcre(20);
    setPricePerQuintal(2300);
    setResult(null);
    setError("");
  };

  return (
    <div className="profit-page">
      <h2>💹 Crop Profit Calculator</h2>
      <p className="muted">
        Enter your inputs (costs can be per-acre or total). Calculator shows investment,
        expected revenue and ROI.
      </p>

      <form className="calc-form" onSubmit={handleCalculate}>
        <div className="row">
          <label>Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)}>
            <option>Wheat</option>
            <option>Rice</option>
            <option>Soybean</option>
            <option>Cotton</option>
            <option>Vegetable</option>
            <option>Custom</option>
          </select>
        </div>

        <div className="row">
          <label>Area (acres)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div className="row toggle-row">
          <label>Costs mode</label>
          <div>
            <label className="inline">
              <input
                type="radio"
                checked={costPerAcreMode}
                onChange={() => setCostPerAcreMode(true)}
              />
              Per acre (costs enter per acre)
            </label>
            <label className="inline" style={{ marginLeft: 12 }}>
              <input
                type="radio"
                checked={!costPerAcreMode}
                onChange={() => setCostPerAcreMode(false)}
              />
              Total (costs are total)
            </label>
          </div>
        </div>

        <div className="row">
          <label>Seed cost ({costPerAcreMode ? "₹ / acre" : "₹ total"})</label>
          <input
            type="number"
            min="0"
            step="1"
            value={seedCost}
            onChange={(e) => setSeedCost(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Fertilizer cost ({costPerAcreMode ? "₹ / acre" : "₹ total"})</label>
          <input
            type="number"
            min="0"
            step="1"
            value={fertCost}
            onChange={(e) => setFertCost(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Labour cost ({costPerAcreMode ? "₹ / acre" : "₹ total"})</label>
          <input
            type="number"
            min="0"
            step="1"
            value={labourCost}
            onChange={(e) => setLabourCost(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Irrigation / Other cost ({costPerAcreMode ? "₹ / acre" : "₹ total"})</label>
          <input
            type="number"
            min="0"
            step="1"
            value={irrigCost}
            onChange={(e) => setIrrigCost(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Expected yield per acre (quintals)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={yieldPerAcre}
            onChange={(e) => setYieldPerAcre(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Expected price (₹ per quintal)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={pricePerQuintal}
            onChange={(e) => setPricePerQuintal(e.target.value)}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button type="submit" className="btn primary">Calculate</button>
          <button type="button" onClick={handleReset} className="btn">Reset</button>
        </div>
      </form>

      {result && (
        <div className="result-card">
          <h3>Result — {result.crop}</h3>
          <div className="result-grid">
            <div>
              <strong>Area</strong>
              <p>{result.area} acres</p>
            </div>
            <div>
              <strong>Total Investment</strong>
              <p>₹ {result.totalInvestment.toLocaleString()}</p>
            </div>
            <div>
              <strong>Expected Yield</strong>
              <p>{result.totalYield.toLocaleString()} quintals</p>
            </div>
            <div>
              <strong>Estimated Revenue</strong>
              <p>₹ {result.revenue.toLocaleString()}</p>
            </div>
            <div>
              <strong>Net Profit</strong>
              <p className={result.netProfit >= 0 ? "green" : "red"}>
                ₹ {result.netProfit.toLocaleString()}
              </p>
            </div>
            <div>
              <strong>ROI</strong>
              <p>{result.roiPercent}%</p>
            </div>
          </div>

          <div className="advice">
            <h4>Quick Advice</h4>
            {result.netProfit > 0 ? (
              <p className="green">Good — Expected profit. Consider investing in quality seeds & market timing.</p>
            ) : (
              <p className="red">Warning — Negative profit. Review costs and check market price / yield assumptions.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfitCalculator;
