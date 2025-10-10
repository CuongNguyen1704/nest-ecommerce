import { BaseEnity } from "src/common/entities/base.entities";
import { Column, Entity, OneToMany } from "typeorm";
import { ProductEntity } from "../products/entities/product.entity";

@Entity('categories')
export class CategoryEntity extends BaseEnity {
    @Column()
    name:string

    @Column()
    description:string

    @OneToMany(()=>ProductEntity,(product)=>product.category)
    product:ProductEntity[]
}