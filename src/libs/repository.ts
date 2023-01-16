import { ObjectLiteral } from 'typeorm';
import { datasource } from '../databases';

export abstract class Repository<T extends ObjectLiteral> {
  private readonly entity;

  private readonly datasource;

  protected constructor(entity: any) {
    this.entity = entity;
    this.datasource = datasource;
  }

  protected getManager() {
    return this.datasource.getRepository<T>(this.entity);
  }
}
