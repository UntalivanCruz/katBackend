import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Invoice,
  InvoiceDetail,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceInvoiceDetailController {
  constructor(
    @repository(InvoiceRepository) protected invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Array of Invoice has many InvoiceDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InvoiceDetail)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InvoiceDetail>,
  ): Promise<InvoiceDetail[]> {
    return this.invoiceRepository.invoiceDetails(id).find(filter);
  }

  @post('/invoices/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Invoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(InvoiceDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Invoice.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceDetail, {
            title: 'NewInvoiceDetailInInvoice',
            exclude: ['id'],
            optional: ['invoiceId']
          }),
        },
      },
    }) invoiceDetail: Omit<InvoiceDetail, 'id'>,
  ): Promise<InvoiceDetail> {
    return this.invoiceRepository.invoiceDetails(id).create(invoiceDetail);
  }

  @patch('/invoices/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Invoice.InvoiceDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceDetail, {partial: true}),
        },
      },
    })
    invoiceDetail: Partial<InvoiceDetail>,
    @param.query.object('where', getWhereSchemaFor(InvoiceDetail)) where?: Where<InvoiceDetail>,
  ): Promise<Count> {
    return this.invoiceRepository.invoiceDetails(id).patch(invoiceDetail, where);
  }

  @del('/invoices/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Invoice.InvoiceDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InvoiceDetail)) where?: Where<InvoiceDetail>,
  ): Promise<Count> {
    return this.invoiceRepository.invoiceDetails(id).delete(where);
  }
}
