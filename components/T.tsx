import { isTodo, SHOW_TODO } from "@/content/site";

/** Renders a content string. Unfilled [placeholder] details are outlined locally and hidden when published. */
export default function T({ children }: { children: string }) {
  if (!isTodo(children)) return <>{children}</>;
  return SHOW_TODO ? <span className="todo">{children.slice(1, -1)}</span> : null;
}
