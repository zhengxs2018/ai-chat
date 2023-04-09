export interface IContact {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  date?: number | string | Date;
}

export interface IMessagePayload {
  id: string;
  type: string;
  content: string;
  self: boolean;
  date: Date | number;
  talker: IContact;
}

export type ContactContentProps = {
  active: boolean;
  index: number;
  payload: IContact;
};

export type MessageContentProps = {
  index: number;
  payload: IMessagePayload;
};
