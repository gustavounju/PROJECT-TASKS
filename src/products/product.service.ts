import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
/* import { unlink } from 'fs/promises';
import { join } from 'path'; */

@Injectable()
export class ProductService {
  private readonly directoryUploads = process.env.DIRECTORY_UPLOADS;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async saveProduct(
    productName: string,
    price: number,
    filename: string,
  ): Promise<Product> {
    const url = `/uploads/${filename}`;
    const product = this.productRepository.create({
      productName,
      price,
      imageFilename: filename,
      imageUrl: url,
    });
    return this.productRepository.save(product);
  }
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }
  async updateProductImage(id: number, filename: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    product.imageFilename = filename;
    product.imageUrl = `/uploads/${filename}`;
    return this.productRepository.save(product);
  }
}
