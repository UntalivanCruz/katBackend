import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {InvoiceDetail, InvoiceDetailRelations} from '../models';

export class InvoiceDetailRepository extends DefaultCrudRepository<
  InvoiceDetail,
  typeof InvoiceDetail.prototype.id,
  InvoiceDetailRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(InvoiceDetail, dataSource);
  }
}
