import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create.dto';
import { CategoryService } from '../categories/category.service';
import { PaginaitonDTO } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateProductDto) {
    const product = await this.productRepo.findOne({
      where: { name: dto.name },
    });
    if (product) {
      throw new BadRequestException('Không đặt trùng tên');
    }

    await this.categoryService.findById(dto.category_id);

    const createProduct = this.productRepo.create({
      name: dto.name,
      category_id: dto.category_id,
      description: dto.description,
    });

    await this.productRepo.save(createProduct);

    return {
      message: 'tạo sản phẩm thành công',
    };
  }

  async getAll(pagination: PaginaitonDTO) {
    const { page, limit } = pagination;
    const [data, total] = await this.productRepo.findAndCount({
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

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new BadRequestException('Sản phẩm không tồn tại');
    }

    await this.categoryService.findById(dto.category_id);

    await this.productRepo.update(id, {
      name: dto.name,
      category_id: dto.category_id,
      description: dto.description,
    });

    return {
      message: 'cập nhật sản phẩm thành công',
    };
  }

  async softDeletByCategoryId(id: number) {
    await this.productRepo.softDelete({
      category: { id: id },
    });
  }

  async restore(id:number){
      await this.productRepo.restore({
        category:{id:id}
      })
  }

  async deleteProduct(id:number){
    const product = await this.productRepo.findOne({
      where:{id:id}
    })

    if(!product){
      throw new BadRequestException("Sản phẩm không tồn tại")
    }

    await this.productRepo.softDelete(id)

    return {
      message:"xóa sản phẩm thành công"
    }
    
  }

  async restoreProduct(id:number){
      const productSoftDelete = await this.productRepo.findOne({
        where:{id},
        withDeleted:true
      })

      if(productSoftDelete?.delete_at ==  null){
        throw new BadRequestException("Sản phẩm này chưa được xóa mềm")
      }

      await this.productRepo.restore(id)

      return {
        message:"Khôi phục thành công sản phẩm"
      }
  }
}
