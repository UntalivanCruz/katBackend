// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  InvoiceDetail,
  Item
} from '../models';
import {InvoiceDetailRepository} from '../repositories';
// ------------------------------------
@authenticate('jwt')
export class InvoiceDetailItemController {
  constructor(
    @repository(InvoiceDetailRepository)
    public invoiceDetailRepository: InvoiceDetailRepository,
  ) { }

  @get('/invoice-details/{id}/item', {
    responses: {
      '200': {
        description: 'Item belonging to InvoiceDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async getItem(
    @param.path.string('id') id: typeof InvoiceDetail.prototype.id,
  ): Promise<Item> {
    return this.invoiceDetailRepository.item(id);
  }
}
