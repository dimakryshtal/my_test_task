import { FileValidator, Injectable } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import * as sharp from 'sharp';

export type MinImageSizeValidatorOptions = {
  minHeight: number;
  minWidth: number;
};

@Injectable()
export class ImageSizeValidator extends FileValidator<MinImageSizeValidatorOptions, IFile> {
  async isValid(file?: Express.Multer.File): Promise<boolean> {
    const { width, height } = await sharp(file.buffer).metadata();

    return width >= this.validationOptions.minWidth && height >= this.validationOptions.minHeight;
  }
  buildErrorMessage(): string {
    return `Image size is too small. Minimum width: ${this.validationOptions.minWidth}px, 
            minimum height: ${this.validationOptions.minHeight}px`;
  }

  constructor(protected readonly validationOptions: MinImageSizeValidatorOptions) {
    super(validationOptions);
  }
}
