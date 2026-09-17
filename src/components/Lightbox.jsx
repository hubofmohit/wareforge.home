import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

export default function Lightbox({ image, onClose }) {
  useBodyScrollLock(Boolean(image));

  return (
    <div className={`modal${image ? " active" : ""}`} id="imageLightbox">
      <div className="modal-overlay" onClick={onClose} />
      <div className="lightbox-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <img id="lightboxImage" src={image?.src || ""} alt={image?.alt || ""} />
      </div>
    </div>
  );
}
