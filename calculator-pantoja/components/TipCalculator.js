'use client';

import { useState } from 'react';
import styles from '../styles/TipCalculator.module.css';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState('5');

  const billAmount = parseFloat(bill) || 0;
  const numPeople = parseInt(people) || 1;
  
  const tipAmount = billAmount * (tipPercent / 100);
  const totalAmount = billAmount + tipAmount;
  const tipPerPerson = tipAmount / numPeople;
  const totalPerPerson = totalAmount / numPeople;

  const handleTipClick = (percent) => {
    setTipPercent(percent);
    setCustomTip('');
  };

  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    setCustomTip(value);
    if (value) {
      setTipPercent(parseFloat(value) || 0);
    }
  };

  const handleReset = () => {
    setBill('');
    setTipPercent(15);
    setCustomTip('');
    setPeople('5');
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.title}>
        <h1>
          SPLI
          <br />
          TTER
        </h1>
      </div>

      {/* Calculator Card */}
      <div className={styles.card}>
        {/* Left Side - Inputs */}
        <div className={styles.inputSection}>
          {/* Bill Input */}
          <div className={styles.inputGroup}>
            <label>Bill</label>
            <div className={styles.inputWrapper}>
              <span className={styles.icon}>$</span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0"
                className={styles.input}
              />
            </div>
          </div>

          {/* Tip Percentage Selection */}
          <div className={styles.inputGroup}>
            <label>Select Tip %</label>
            <div className={styles.tipGrid}>
              {[5, 10, 15, 25, 50].map((percent) => (
                <button
                  key={percent}
                  onClick={() => handleTipClick(percent)}
                  className={`${styles.tipButton} ${
                    tipPercent === percent && !customTip ? styles.active : ''
                  }`}
                >
                  {percent}%
                </button>
              ))}
              <input
                type="number"
                value={customTip}
                onChange={handleCustomTipChange}
                placeholder="Custom"
                className={styles.customInput}
              />
            </div>
          </div>

          {/* Number of People */}
          <div className={styles.inputGroup}>
            <label>Number of People</label>
            <div className={styles.inputWrapper}>
              <span className={styles.icon}>👤</span>
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                min="1"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Results */}
        <div className={styles.resultSection}>
          <div className={styles.results}>
            {/* Tip Amount Per Person */}
            <div className={styles.resultRow}>
              <div>
                <div className={styles.resultLabel}>Tip Amount</div>
                <div className={styles.resultSubLabel}>/ person</div>
              </div>
              <div className={styles.amount}>
                ${tipPerPerson.toFixed(2)}
              </div>
            </div>

            {/* Total Per Person */}
            <div className={styles.resultRow}>
              <div>
                <div className={styles.resultLabel}>Total</div>
                <div className={styles.resultSubLabel}>/ person</div>
              </div>
              <div className={styles.amount}>
                ${totalPerPerson.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}