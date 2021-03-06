const DataTypes = require('sequelize');

const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },

        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },

        password: {
          type: DataTypes.STRING(100), // 암호화를 위해 충분한 공간 확보
          allowNull: false,
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글저장
        sequelize,
      },
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    /**
     * ? through: 다대다 관계에서 생성되는 중간 테이블
     * ? foreignKey: column 명을 바꿔준다.
     */
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });

    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId',
    });

    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId',
    });
  }
};
