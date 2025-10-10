import { BaseEnity } from "src/common/entities/base.entities";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('product_variant')
export class ProductVariantEnity extends BaseEnity {

    @Column()
    product_id:number

    @Column()
    color:string

    @Column()
    size:string

    @Column()
    stock:number

    @Column()
    price:number

    @Column()
    image:string

    @Column()
    status:string

    @ManyToOne(()=>ProductEntity,(product)=>product.productVariant,{onDelete:'CASCADE'})
    @JoinColumn({name:"product_id"})
    product:ProductEntity

}