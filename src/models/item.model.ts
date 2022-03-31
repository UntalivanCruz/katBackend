import {Entity, model, property, hasMany} from '@loopback/repository';
import {InvoiceDetail} from './invoice-detail.model';

@model()
export class Item extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    default: 0,
  })
  value?: number;

  @hasMany(() => InvoiceDetail)
  invoiceDetails: InvoiceDetail[];

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
