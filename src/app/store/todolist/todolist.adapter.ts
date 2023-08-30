import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<MyEntity> = createEntityAdapter<MyEntity>();
