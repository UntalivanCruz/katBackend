import {Entity, model, property} from '@loopback/repository';

@model()
export class InvoiceDetail extends Entity {
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
  invoiceId: string;

  @property({
    type: 'string',
    required: true,
  })
  itemId: string;

  @property({
    type: 'number',
    default: 0,
  })
  quantity?: number;


  constructor(data?: Partial<InvoiceDetail>) {
    super(data);
  }
}

export interface InvoiceDetailRelations {
  // describe navigational properties here
}

export type InvoiceDetailWithRelations = InvoiceDetail & InvoiceDetailRelations;
