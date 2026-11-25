import { site } from "@/content/site";

/** Ismail's photo in an amber ring, with two skill tags floating beside it. */
export default function Portrait() {
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
    </div>
  );
}
