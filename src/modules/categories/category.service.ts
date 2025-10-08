import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntiy } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategotyDTO } from './dto/create.dto';
import { PaginaitonDTO } from 'src/common/dto/pagination.dto';
import { UpdateCategoryDTO } from './dto/update.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntiy)
    private readonly categoryRepo: Repository<CategoryEntiy>,
  ) {}

  async createCategory(dto: CreateCategotyDTO) {
    const oldCategory = await this.categoryRepo.find({
      where: { name: dto.name },
    });

    if (oldCategory.length > 0) {
      return 'không được thêm danh mục trùng lặp';
    }

    const createCategory = this.categoryRepo.create({
      name: dto.name,
      description: dto.description,
    });

    const saveCategory = await this.categoryRepo.save(createCategory);

    return {
      saveCategory,
      message: 'thêm danh mục thành công',
    };
  }

  async listCategory(pagination: PaginaitonDTO) {
    console.log(pagination);
    const { limit, page } = pagination;

    const [data, total] = await this.categoryRepo.findAndCount({
      order: {
        create_at: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      PageCount: Math.ceil(total / limit),
    };
  }

  async updateCategory(id: number, dto: UpdateCategoryDTO) {
    const category = await this.categoryRepo.find({
      where: {
        id: id,
      },
    });

    if (category.length == 0) {
      throw new BadRequestException('Không tồn tại danh mục');
    }

    await this.categoryRepo.update(id, {
      name: dto.name,
      description: dto.description,
    });

    return {
      message: 'cập nhật thành công',
    };
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw new BadRequestException('Danh Mục không tồn tại');
    }
    await this.categoryRepo.softDelete(id);
    return {
      message: 'xóa danh mục thành công',
    };
  }

  async restore(id: number) {
    const category = await this.categoryRepo.findOne({
      where: {id},
      withDeleted:true
    });
    if (!category) {
      throw new BadRequestException('Danh mục không tồn tại');
    }
    if(category.delete_at == null){
        throw new BadRequestException("Danh mục này chưa được xóa mềm")
    }
    await this.categoryRepo.restore(id)
    return {
      message: 'khôi phục thành công',
    };
  }
}
