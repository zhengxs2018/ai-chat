export interface IContactPayload {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  date?: number | string | Date;
}

export interface IMessagePayload {
  id: string;
  type?: string;
  content: string;
  self: boolean;
  date: Date | number;
  talker: IContactPayload;
}

export type ContactContentProps = {
  active: boolean;
  index: number;
  payload: IContactPayload;
};

export type MessageContentProps = {
  index: number;
  payload: IMessagePayload;
};
