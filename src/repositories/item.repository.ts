import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Item, ItemRelations, InvoiceDetail} from '../models';
import {InvoiceDetailRepository} from './invoice-detail.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {

  public readonly invoiceDetails: HasManyRepositoryFactory<InvoiceDetail, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('InvoiceDetailRepository') protected invoiceDetailRepositoryGetter: Getter<InvoiceDetailRepository>,
  ) {
    super(Item, dataSource);
    this.invoiceDetails = this.createHasManyRepositoryFactoryFor('invoiceDetails', invoiceDetailRepositoryGetter,);
    this.registerInclusionResolver('invoiceDetails', this.invoiceDetails.inclusionResolver);
  }
}
