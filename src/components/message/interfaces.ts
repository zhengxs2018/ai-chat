export interface IContact {
  id: string;
  name: string;
  avatar?: string;
  desc?: string;
  date?: number | string | Date;
}

export interface IMessagePayload {
  id: string;
  type: string;
  content: string;
  self: boolean;
  date: number;
  talker: IContact;
}

export type ContactContentProps = {
  isActive: boolean;
  index: number;
  payload: IContact;
};

export type MessageContentProps = {
  index: number;
  payload: IMessagePayload;
};
