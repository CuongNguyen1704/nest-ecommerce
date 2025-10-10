import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.dto';
import { PaginaitonDTO } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from './dto/update.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProdduct(@Body() dto: CreateProductDto) {
    const create = await this.productService.create(dto);
    return create;
  }

  @Get()
  async listProduct (@Query() pagination:PaginaitonDTO){
    const listProduct = await this.productService.getAll(pagination)
    return listProduct
  }

  @Put(':id')
  async updateProduct(@Param('id') id:number,@Body() dto:UpdateProductDto){
        const updateProduct = await this.productService.update(id,dto)
        return updateProduct
  }

  @Delete(':id')
  async removeProduct (@Param('id') id:number){
     const removeProduct = await this.productService.deleteProduct(id)
     return removeProduct
  }

  @Put('restore/:id')
  async restore(@Param('id') id:number){
      const restore = await this.productService.restoreProduct(id)
      return restore
  }
  
} 
