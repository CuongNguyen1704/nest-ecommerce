import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategotyDTO } from "./dto/create.dto";
import { PaginaitonDTO } from "src/common/dto/pagination.dto";
import { UpdateCategoryDTO } from "./dto/update.dto";

@Controller('category')

export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Post('create')
    async CreateCategory(@Body() dto:CreateCategotyDTO){
        const category = await this.categoryService.createCategory(dto)
        return category
    }

    @Get('list')
    async listCategory (@Query() pagination:PaginaitonDTO){
        const listCategory = await this.categoryService.listCategory(pagination)
        return listCategory 
    }

    @Put(':id')
    async UpdateCategory (@Param('id') id:number,@Body() dto:UpdateCategoryDTO){
        const updateCategory = await this.categoryService.updateCategory(id,dto)
        return updateCategory
    }

    @Delete(':id')
    async DeleteCategory(@Param('id') id:number){
        const remove = await this.categoryService.delete(id)
        return remove
    }

    @Put('restore/:id')
    async Restore(@Param('id') id:number){
        const restore = await this.categoryService.restore(id)
        return restore
    }
}