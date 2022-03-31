import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InvoiceDetail,
  Invoice,
} from '../models';
import {InvoiceDetailRepository} from '../repositories';

export class InvoiceDetailInvoiceController {
  constructor(
    @repository(InvoiceDetailRepository)
    public invoiceDetailRepository: InvoiceDetailRepository,
  ) { }

  @get('/invoice-details/{id}/invoice', {
    responses: {
      '200': {
        description: 'Invoice belonging to InvoiceDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async getInvoice(
    @param.path.string('id') id: typeof InvoiceDetail.prototype.id,
  ): Promise<Invoice> {
    return this.invoiceDetailRepository.invoice(id);
  }
}
