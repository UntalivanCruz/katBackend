import {Entity, model, property, hasMany} from '@loopback/repository';
import {InvoiceDetail} from './invoice-detail.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  correlative: number;

  @property({
    type: 'date',
    required: true,
  })
  scheduled: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'array',
    itemType: 'number',
  })
  special?: number[];

  @hasMany(() => InvoiceDetail)
  invoiceDetails: InvoiceDetail[];

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
