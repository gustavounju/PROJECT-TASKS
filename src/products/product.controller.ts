import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  NotFoundException,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
@ApiTags('Products') // Agrupa endpoints en Swagger
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // CREATE product with image
  @Post()
  @ApiOperation({ summary: 'Crear un producto con imagen' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productName: { type: 'string' },
        price: { type: 'number' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['productName', 'price', 'image'],
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    // @Body() body: CreateProductDto,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: CreateProductDto,
  ) {
    const { productName, price } = body;
    return this.productService.saveProduct(
      productName,
      Number(price),
      file.filename,
    );
  }
  // GET all products
  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  async findAll() {
    return this.productService.findAll();
  }

  // GET one product
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // UPDATE image for specific product
  @Put(':id/image')
  @ApiOperation({ summary: 'Actualizar imagen del producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['image'],
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.updateProductImage(id, file.filename);
  }
}
