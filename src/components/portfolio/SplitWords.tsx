import { Fragment } from "react";

/**
 * Splits text into words for useScrollAnimations. Default (`masked`): each word
 * sits in an overflow-clipped box for the `data-words` rise on headings. With
 * `masked={false}` the words are plain spans for the `data-fill-words` scrubbed
 * read-along on paragraphs. The spaces stay real text, so wrapping and screen
 * readers are unaffected. Put the data attribute on the parent element.
 */
export function SplitWords({ text, masked = true }: { text: string; masked?: boolean }) {
  const words = text.split(" ");
  if (!masked) {
    return (
      <>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span data-word>{word}</span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </>
    );
  }
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
