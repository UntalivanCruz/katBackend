import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {InvoiceDetail, InvoiceDetailRelations, Invoice, Item} from '../models';
import {InvoiceRepository} from './invoice.repository';
import {ItemRepository} from './item.repository';

export class InvoiceDetailRepository extends DefaultCrudRepository<
  InvoiceDetail,
  typeof InvoiceDetail.prototype.id,
  InvoiceDetailRelations
> {

  public readonly invoice: BelongsToAccessor<Invoice, typeof InvoiceDetail.prototype.id>;

  public readonly item: BelongsToAccessor<Item, typeof InvoiceDetail.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(InvoiceDetail, dataSource);
    this.item = this.createBelongsToAccessorFor('item', itemRepositoryGetter,);
    this.registerInclusionResolver('item', this.item.inclusionResolver);
    this.invoice = this.createBelongsToAccessorFor('invoice', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoice', this.invoice.inclusionResolver);
  }
}
