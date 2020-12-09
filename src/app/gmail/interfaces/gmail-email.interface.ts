export class GmailEmail {
  id: string;
  internalDate: number;
  labelIds: Array<string>;
  payload: {
    headers: [
      {
        name:string,
        value: string
      }
    ],
    parts: [
      {
        mimeType: string,
        body: {
          data: string
        }
      }
    ]
  };
  snippet: string;
}
