import { site } from "@/content/site";

type Caption = { no: string; title: string };

/** Ismail's photo in an amber ring, with two skill tags and a quiet label naming the section being read. */
export default function Portrait({ caption }: { caption?: Caption }) {
  const [first, second] = site.skills.flatMap((g) => g.items);
  return (
    <div className="portrait">
      <div className="portrait-ring">
        <img src="/ismail.webp" alt={`Photo of ${site.name}`} width={500} height={500} decoding="async" />
      </div>
      <span className="portrait-chip chip-a" aria-hidden="true">
        {first}
      </span>
      <span className="portrait-chip chip-b" aria-hidden="true">
        {second}
      </span>
      {caption && (
        <div className="portrait-caption" aria-hidden="true">
          <p key={caption.title}>
            {caption.no && <span>{caption.no}</span>}
            {caption.title}
            {!caption.no && <em>↓</em>}
          </p>
          {/* Filled in directly by the scroll handler in Portfolio, so scrolling doesn't re-render the page. */}
          <div className="portrait-track">
            <i />
          </div>
        </div>
      )}
    </div>
  );
}
