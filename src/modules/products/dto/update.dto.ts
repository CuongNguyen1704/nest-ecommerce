import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    
    @IsString()
    @IsOptional()
    name:string

    @IsNumber()
    @IsOptional()
    category_id:number

    @IsString()
    @IsOptional()
    description:string
}