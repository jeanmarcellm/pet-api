import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import Status from './status'
import Service from './service';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
        modelName: 'user',
        defaultScope: {
          include: [User, Service, Status],
          attributes: { exclude: ['imageId', 'deleted_at'] },
        }, 
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(Image);  
  }  
}

export default User;
