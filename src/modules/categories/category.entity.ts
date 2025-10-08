import { BaseEnity } from "src/common/entities/base.entities";
import { Column, Entity } from "typeorm";

@Entity('categories')
export class CategoryEntiy extends BaseEnity {
    @Column()
    name:string

    @Column()
    description:string
}