import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const oldOwner = await this.ownerRepository.findOneBy({ id });

    if (!oldOwner) {
      throw new NotFoundError('No owner found');
    }

    return this.ownerRepository.save({
      ...oldOwner,
      ...updateOwnerInput,
    });
  }

  async remove(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOneBy({ id });

    if (!owner) {
      throw new NotFoundError('No owner found');
    }
    await this.ownerRepository.delete(owner);

    return owner;
  }
}
