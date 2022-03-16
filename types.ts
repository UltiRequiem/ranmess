import { AVAILABLE_TAGS } from "./config.ts";

export interface Quotable {
  _id: string;
  tags: keyof typeof AVAILABLE_TAGS[number][];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface QuotableConfig {
  /** The maximum length in characters */
  maxLength: number;
  /** The minimum length in characters */
  minLength: number;
  /** Filter random quote by tag(s). Takes a list of one or more tag names,
   * separated by a comma (meaning AND) or a pipe (meaning OR).
   * A comma separated list will match quotes that have all of the given tags.
   * While a pipe (|) separated list will match quotes that have either of the
   * provided tags.
   */
  tags: string;
  /**
   * Filter random quote by authorId(s). Takes a list of one or more authorId,
   * separated by a pipe (meaning OR). A pipe (|) separated list will match
   * quotes that have either of the provided authorId.
   */
  authorId: string;
  /**
   * Filter random quote by author(s). Takes a list of one or more author names,
   * separated by a pipe (meaning OR). A pipe (|) separated list will match
   * quotes that have either of the provided author name.
   */
  author: string;
}
