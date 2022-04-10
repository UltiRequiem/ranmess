export interface Quotable {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
  tags: string[];
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

export interface QuotableAuthor {
  /** A unique id for this author */
  _id: string;
  /** A brief, one paragraph bio of the author. Source wiki API. */
  bio: string;
  /** A one-line description of the author. */
  description: string;
  /** The link to the author's wikipedia page or official website. */
  link: string;
  /** The authors full name. */
  name: string;
  /** A slug is a URL-friendly ID derived from the authors name. */
  slug: string;
  /** The number of quotes by this author. */
  quoteCount: string;
}

export interface TagResponse {
  /** The number of all tags by this request. */
  count: number;
  /** The array of tags. */
  results: {
    _id: string;
    name: string;
  }[];
}
