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
  Item,
  InvoiceDetail,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemInvoiceDetailController {
  constructor(
    @repository(ItemRepository) protected itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Array of Item has many InvoiceDetail',
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
    return this.itemRepository.invoiceDetails(id).find(filter);
  }

  @post('/items/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(InvoiceDetail)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Item.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceDetail, {
            title: 'NewInvoiceDetailInItem',
            exclude: ['id'],
            optional: ['itemId']
          }),
        },
      },
    }) invoiceDetail: Omit<InvoiceDetail, 'id'>,
  ): Promise<InvoiceDetail> {
    return this.itemRepository.invoiceDetails(id).create(invoiceDetail);
  }

  @patch('/items/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Item.InvoiceDetail PATCH success count',
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
    return this.itemRepository.invoiceDetails(id).patch(invoiceDetail, where);
  }

  @del('/items/{id}/invoice-details', {
    responses: {
      '200': {
        description: 'Item.InvoiceDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InvoiceDetail)) where?: Where<InvoiceDetail>,
  ): Promise<Count> {
    return this.itemRepository.invoiceDetails(id).delete(where);
  }
}
