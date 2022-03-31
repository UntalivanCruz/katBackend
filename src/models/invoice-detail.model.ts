import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Invoice} from './invoice.model';
import {Item} from './item.model';

@model()
export class InvoiceDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'number',
    default: 0,
  })
  quantity?: number;

  @belongsTo(() => Invoice)
  invoiceId: string;

  @belongsTo(() => Item)
  itemId: string;

  constructor(data?: Partial<InvoiceDetail>) {
    super(data);
  }
}

export interface InvoiceDetailRelations {
  // describe navigational properties here
}

export type InvoiceDetailWithRelations = InvoiceDetail & InvoiceDetailRelations;
