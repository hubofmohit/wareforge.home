import { useEffect, useRef, useState } from "react";
import { useStats } from "../context/StatsContext";
import { useTilt } from "../hooks/useTilt";
import Icon from "./Icon";

const EMAIL = "gargmohit0104@gmail.com";
const STATES = ["ONLINE", "AVAILABLE", "READY"];

function CopyEmailButton() {
  const { trackClick } = useStats();
  const [copied, setCopied] = useState(false);
  const [label, setLabel] = useState("Copy email");
  const timeoutRef = useRef(null);

  async function handleCopy() {
    const restore = () => {
      timeoutRef.current = setTimeout(() => {
        setLabel("Copy email");
        setCopied(false);
      }, 1800);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = EMAIL;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setLabel("Copied!");
      setCopied(true);
      trackClick("copy_email");
      restore();
    } catch (e) {
      setLabel("Copy failed");
      restore();
    }
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <button
      type="button"
      className={`access-btn ghost${copied ? " copied" : ""}`}
      onClick={handleCopy}
    >
      <Icon name="copy" />
      <span>{label}</span>
    </button>
  );
}

export default function Access() {
  const { trackClick } = useStats();
  const cardRef = useTilt({ strength: 60, translateY: -4, translateZ: 0 });
  const [status, setStatus] = useState(STATES[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % STATES.length;
      setStatus(STATES[i]);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="access" className="contact-section">
      <h2 className="section-title">
        <span className="title-number">07.</span>
        <span className="title-text">Get Access</span>
      </h2>

      <div className="contact-content">
        <p className="contact-text">
          WareForge brings warehouse layout and inventory management together in one
          workspace. Create your warehouse, define its zones, add your inventory, and
          keep the entire structure organized as your operation changes.
        </p>
        <div className="access-card" id="accessCard" ref={cardRef}>
          <span className="access-corner tl" />
          <span className="access-corner tr" />
          <span className="access-corner bl" />
          <span className="access-corner br" />
          <div className="access-scanline" />
          <div className="access-grid-bg" />

          <div className="access-avatar-wrap">
            <span className="access-ring" />
            <span className="access-ring ring-2" />
            <div className="access-avatar">MG</div>
            <span className="access-status-dot" title="Available for new access requests" />
          </div>

          <div className="access-body">
            <span className="access-eyebrow">
              <span className="access-live-dot" />
              Wanna access? Connect with me
            </span>
            <h3 className="access-title">
              Mohit <span className="access-title-sep">—</span> Builder of WareForge
            </h3>
            <p className="access-desc">
              This app isn't public yet. If you'd like a login, want to try it for your
              own warehouse, or just want to talk through the idea, reach out directly
              and I'll get you set up.
            </p>
            <div className="access-actions">
              <a
                href={`mailto:${EMAIL}?subject=Access%20to%20WareForge`}
                className="access-btn primary"
                onClick={() => trackClick("get_access_email")}
              >
                <Icon name="mail" />
                <span>{EMAIL}</span>
              </a>
              <CopyEmailButton />
            </div>
          </div>

          <div className="access-readout">
            <span className="access-readout-label">STATUS</span>
            <span className="access-readout-value" id="accessStatusText">
              ● {status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}