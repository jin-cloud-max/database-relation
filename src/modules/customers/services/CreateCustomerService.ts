import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const costumerEmail = await this.customersRepository.findByEmail(email);

    if (costumerEmail) {
      throw new AppError('E-mail already exist');
    }

    const costumer = await this.customersRepository.create({
      name,
      email,
    });

    return costumer;
  }
}

export default CreateCustomerService;
