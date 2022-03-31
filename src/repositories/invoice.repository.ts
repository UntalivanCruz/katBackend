import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Invoice, InvoiceRelations, InvoiceDetail} from '../models';
import {InvoiceDetailRepository} from './invoice-detail.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly invoiceDetails: HasManyRepositoryFactory<InvoiceDetail, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('InvoiceDetailRepository') protected invoiceDetailRepositoryGetter: Getter<InvoiceDetailRepository>,
  ) {
    super(Invoice, dataSource);
    this.invoiceDetails = this.createHasManyRepositoryFactoryFor('invoiceDetails', invoiceDetailRepositoryGetter,);
    this.registerInclusionResolver('invoiceDetails', this.invoiceDetails.inclusionResolver);
  }
}
