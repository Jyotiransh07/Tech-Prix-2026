"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Volume2, VolumeX, Flame, ChevronRight, Activity } from "lucide-react";

export default function F1SteeringWheel() {
    const [gear, setGear] = useState<number | "N">(1);
    const [rpm, setRpm] = useState<number>(6500); // 4000 to 12500
    const [drsActive, setDrsActive] = useState<boolean>(false);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
    const [stratMode, setStratMode] = useState<string>("QUALIFYING // MODE 1");
    const [revving, setRevving] = useState<boolean>(false);

    const audioCtxRef = useRef<AudioContext | null>(null);

    // Calculate speed based on gear & RPM
    const gearRatios: { [key: string]: number } = {
        N: 0,
        1: 18,
        2: 28,
        3: 38,
        4: 48,
        5: 58,
        6: 68,
        7: 78,
        8: 88,
    };
    const speed = Math.round(
        gear === "N"
            ? 0
            : (gearRatios[String(gear)] * rpm) / 3200 * (drsActive ? 1.12 : 1.0)
    );

    // Play synthetic engine sound using Web Audio API
    const triggerEngineSound = (freqMultiplier = 1.0) => {
        if (!audioEnabled) return;
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === "suspended") {
                ctx.resume();
            }

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            const baseFreq = gear === "N" ? 110 : 120 + (typeof gear === "number" ? gear * 35 : 0);
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(baseFreq * freqMultiplier, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * freqMultiplier * 1.8, ctx.currentTime + 0.35);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(1200, ctx.currentTime);

            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch {
            // Audio fallback
        }
    };

    const handleGearUp = () => {
        if (gear === "N") {
            setGear(1);
            setRpm(5500);
        } else if (typeof gear === "number" && gear < 8) {
            setGear(gear + 1);
            setRpm(5200);
            triggerEngineSound(1.3);
        }
    };

    const handleGearDown = () => {
        if (gear === 1) {
            setGear("N");
            setRpm(3500);
        } else if (typeof gear === "number" && gear > 1) {
            setGear(gear - 1);
            setRpm(8500);
            triggerEngineSound(0.95);
        }
    };

    const handleRevThrottle = () => {
        setRevving(true);
        setRpm((prev) => Math.min(12500, prev + 2200));
        triggerEngineSound(1.6);
        setTimeout(() => {
            setRevving(false);
            setRpm((prev) => Math.max(5000, prev - 1800));
        }, 400);
    };

    // Shift lights calculation (15 LEDs total)
    const shiftProgress = Math.min(1, Math.max(0, (rpm - 4000) / 8500));
    const activeLedsCount = Math.round(shiftProgress * 15);

    return (
        <section className="steering-widget-section" id="steering-cockpit">
            <div className="f1-container">
                <div className="section-header-block text-center">
                    <span className="spec-kicker">// COCKPIT SIMULATOR</span>
                    <h2 className="section-title-large">INTERACTIVE F1 COCKPIT HUD</h2>
                    <p className="section-summary text-center">
                        Test the telemetry controls, shift gears, activate DRS mode, and rev the V6 Turbo sound engine in real time.
                    </p>
                </div>

                <div className="wheel-dashboard-card">
                    {/* Top Shift Lights Bar */}
                    <div className="shift-lights-bar">
                        {Array.from({ length: 15 }).map((_, i) => {
                            let colorClass = "green";
                            if (i >= 5 && i < 10) colorClass = "yellow";
                            if (i >= 10) colorClass = "red";
                            const isActive = i < activeLedsCount;
                            const isFlashing = activeLedsCount >= 14 && isActive;
                            return (
                                <div
                                    key={i}
                                    className={`shift-led ${colorClass} ${isActive ? "active" : ""} ${isFlashing ? "flash" : ""}`}
                                ></div>
                            );
                        })}
                    </div>

                    {/* Steering Wheel Main Display Screen */}
                    <div className="steering-lcd-screen">
                        <div className="lcd-header">
                            <span className="lcd-brand">TECH PRIX TELEMETRY v2.6</span>
                            <span className={`drs-pill ${drsActive ? "drs-open" : ""}`}>
                                {drsActive ? "DRS OPEN // ⚡" : "DRS CLOSED"}
                            </span>
                        </div>

                        <div className="lcd-body-grid">
                            {/* Speed readout */}
                            <div className="lcd-block speed-block">
                                <span className="lcd-label">SPEED</span>
                                <span className="lcd-big-val">{speed}</span>
                                <span className="lcd-unit">KM/H</span>
                            </div>

                            {/* Central Gear readout */}
                            <div className="lcd-block gear-center-block">
                                <span className="lcd-label">GEAR</span>
                                <span className={`lcd-gear-digit ${revving ? "gear-rev-pulse" : ""}`}>{gear}</span>
                            </div>

                            {/* RPM & Delta readout */}
                            <div className="lcd-block rpm-block">
                                <span className="lcd-label">RPM</span>
                                <span className="lcd-big-val">{rpm}</span>
                                <span className="lcd-delta-text text-green">-0.428s LAP DELTA</span>
                            </div>
                        </div>

                        <div className="lcd-footer">
                            <span className="strat-mode">{stratMode}</span>
                            <span className="telemetry-live-tag">
                                <Activity size={12} className="inline-icon spin" /> REALTIME CAN-BUS STREAM
                            </span>
                        </div>
                    </div>

                    {/* Steering Wheel Interactive Buttons Control Panel */}
                    <div className="wheel-controls-panel">
                        {/* Gear Down */}
                        <button className="wheel-btn gear-btn" onClick={handleGearDown} title="Shift Down">
                            <span className="btn-label">GEAR -</span>
                            <span className="btn-key">[-]</span>
                        </button>

                        {/* Rev Throttle */}
                        <button
                            className={`wheel-btn throttle-btn ${revving ? "active-rev" : ""}`}
                            onClick={handleRevThrottle}
                            title="Rev V6 Engine"
                        >
                            <Flame size={18} />
                            <span className="btn-label">REV THROTTLE</span>
                        </button>

                        {/* DRS Toggle */}
                        <button
                            className={`wheel-btn drs-btn ${drsActive ? "active-drs" : ""}`}
                            onClick={() => setDrsActive(!drsActive)}
                            title="Toggle Drag Reduction System"
                        >
                            <Zap size={18} />
                            <span className="btn-label">{drsActive ? "DRS ACTIVE" : "ENABLE DRS"}</span>
                        </button>

                        {/* Gear Up */}
                        <button className="wheel-btn gear-btn" onClick={handleGearUp} title="Shift Up">
                            <span className="btn-label">GEAR +</span>
                            <span className="btn-key">[+]</span>
                        </button>

                        {/* Sound Engine Toggle */}
                        <button
                            className={`wheel-btn sound-btn ${audioEnabled ? "active-audio" : ""}`}
                            onClick={() => {
                                setAudioEnabled(!audioEnabled);
                                triggerEngineSound(1.2);
                            }}
                            title="Toggle Audio Engine"
                        >
                            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                            <span className="btn-label">{audioEnabled ? "AUDIO ON" : "AUDIO OFF"}</span>
                        </button>
                    </div>

                    {/* Mode Selector Buttons */}
                    <div className="mode-selector-strip">
                        <span className="strip-title">ENGINE MAP:</span>
                        {["QUALIFYING // MODE 1", "RACE PACE // MODE 2", "OVERTAKE // MODE 3"].map((mode) => (
                            <button
                                key={mode}
                                className={`mode-chip ${stratMode === mode ? "active" : ""}`}
                                onClick={() => setStratMode(mode)}
                            >
                                {mode} <ChevronRight size={12} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
