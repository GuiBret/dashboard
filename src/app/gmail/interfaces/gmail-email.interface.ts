export class GmailEmail {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: Payload;
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}

interface Payload {
  partId: string;
  mimeType: string;
  filename: string;
  headers: Header[];
  body: Body;
  parts: GmailEmailPart[];
}

export class GmailEmailPart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: Header[];
  body: Body;
}

interface Body {
  size: number;
  data?: string;
}

interface Header {
  name: string;
  value: string;
}
