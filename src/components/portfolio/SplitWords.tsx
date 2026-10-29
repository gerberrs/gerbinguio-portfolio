import { Fragment } from "react";

/**
 * Splits a heading into masked words for the `data-words` rise in
 * useScrollAnimations: each word sits in an overflow-clipped box and slides up
 * into view. The spaces stay real text, so wrapping and screen readers are
 * unaffected. Put `data-words` on the heading itself.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <span data-word className="inline-block">
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
