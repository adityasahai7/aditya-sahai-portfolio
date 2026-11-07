import { Fragment, type ReactNode } from "react";

/** Keeps hyphenated words (10-Minute, 22-year-old) on one line in headings. */
export function nobr(text: string): ReactNode {
  const parts = text.split(/(\S*\w-\w\S*)/g);
  if (parts.length === 1) return text;
  return parts.map((p, i) => (/\w-\w/.test(p) ? <span key={i} style={{ whiteSpace: "nowrap" }}>{p}</span> : <Fragment key={i}>{p}</Fragment>));
}
