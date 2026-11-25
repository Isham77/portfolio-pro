import { site } from "@/content/site";

/** Ismail's photo in an amber ring, with a few small tags floating around it. */
export default function Portrait() {
  const [first, second] = site.skills.flatMap((g) => g.items);
  const company = site.experience[0]?.company;
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
      {company && (
        <span className="portrait-chip chip-c" aria-hidden="true">
          <i />
          {company}
        </span>
      )}
    </div>
  );
}
