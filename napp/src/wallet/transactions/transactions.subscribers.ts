import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from '../../users/users/user.entity';
import { Transaction } from './transaction.entity';
import { SIGNUP_BONUS } from '../../users/auth/constants';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class TransactionsToUsersSubscriber implements EntitySubscriberInterface<User> {
  private readonly log = new Logger(TransactionsToUsersSubscriber.name);

  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>): Promise<void> {
    const transactionsRepo = event.manager.getRepository(Transaction);
    const user = event.entity as User;
    // create manually as no DI available
    const transaction = transactionsRepo.create({
      fromUserId: null,
      toUserId: user.id,
      amount: SIGNUP_BONUS,
    });
    await transactionsRepo.save(transaction)
      .then(() => {
        this.log.debug(`User ID has received a sign up bonus (${SIGNUP_BONUS}PW): ${user.id}`);
      })
      .catch((e) => {
        this.log.error(`Cannot create a transaction for the sign up bonus (user ID: ${user.id}): ${e.message}`);
      });
  }
}
