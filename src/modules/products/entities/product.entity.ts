import { BaseEnity } from "src/common/entities/base.entities";
import { CategoryEntity } from "src/modules/categories/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductVariantEnity } from "./product_variant.entity";

@Entity('products')
export class ProductEntity extends BaseEnity {

    @Column()
    name:string

    @Column()
    category_id:number

    @Column()
    description:string

    @ManyToOne(()=>CategoryEntity,(category)=>category.product,{onDelete:'CASCADE'})
    @JoinColumn({name:'category_id'})
    category:CategoryEntity

    @OneToMany(()=>ProductVariantEnity,(product_variant)=>product_variant.product)
    productVariant:ProductVariantEnity[]
}