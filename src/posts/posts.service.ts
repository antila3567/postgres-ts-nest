import { FilesService } from './../files/files.service';
import { CreatePostDto } from './dto/createPostDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
    private readonly filesService: FilesService,
  ) {}
  async createPost(dto: CreatePostDto, image: string) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
