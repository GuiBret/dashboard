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
    ]
  };
  snippet: string;
}
