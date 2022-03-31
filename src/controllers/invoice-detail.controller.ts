import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InvoiceDetail} from '../models';
import {InvoiceDetailRepository} from '../repositories';

export class InvoiceDetailController {
  constructor(
    @repository(InvoiceDetailRepository)
    public invoiceDetailRepository : InvoiceDetailRepository,
  ) {}

  @post('/invoice-details')
  @response(200, {
    description: 'InvoiceDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(InvoiceDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceDetail, {
            title: 'NewInvoiceDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    invoiceDetail: Omit<InvoiceDetail, 'id'>,
  ): Promise<InvoiceDetail> {
    return this.invoiceDetailRepository.create(invoiceDetail);
  }

  @get('/invoice-details/count')
  @response(200, {
    description: 'InvoiceDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InvoiceDetail) where?: Where<InvoiceDetail>,
  ): Promise<Count> {
    return this.invoiceDetailRepository.count(where);
  }

  @get('/invoice-details')
  @response(200, {
    description: 'Array of InvoiceDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvoiceDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InvoiceDetail) filter?: Filter<InvoiceDetail>,
  ): Promise<InvoiceDetail[]> {
    return this.invoiceDetailRepository.find(filter);
  }

  @patch('/invoice-details')
  @response(200, {
    description: 'InvoiceDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceDetail, {partial: true}),
        },
      },
    })
    invoiceDetail: InvoiceDetail,
    @param.where(InvoiceDetail) where?: Where<InvoiceDetail>,
  ): Promise<Count> {
    return this.invoiceDetailRepository.updateAll(invoiceDetail, where);
  }

  @get('/invoice-details/{id}')
  @response(200, {
    description: 'InvoiceDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvoiceDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InvoiceDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<InvoiceDetail>
  ): Promise<InvoiceDetail> {
    return this.invoiceDetailRepository.findById(id, filter);
  }

  @patch('/invoice-details/{id}')
  @response(204, {
    description: 'InvoiceDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceDetail, {partial: true}),
        },
      },
    })
    invoiceDetail: InvoiceDetail,
  ): Promise<void> {
    await this.invoiceDetailRepository.updateById(id, invoiceDetail);
  }

  @put('/invoice-details/{id}')
  @response(204, {
    description: 'InvoiceDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() invoiceDetail: InvoiceDetail,
  ): Promise<void> {
    await this.invoiceDetailRepository.replaceById(id, invoiceDetail);
  }

  @del('/invoice-details/{id}')
  @response(204, {
    description: 'InvoiceDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.invoiceDetailRepository.deleteById(id);
  }
}
