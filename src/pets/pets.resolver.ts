import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from '../owners/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query((returns) => Pet)
  async getPet(@Args('id', { type: () => Int }) id: number) {
    return this.petService.findOne(id);
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petService.getOwner(pet.ownerId);
  }

  @Query((returns) => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Mutation((returns) => Pet)
  createPet(@Args('createPet') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petService.createPet(createPetInput);
  }
}
