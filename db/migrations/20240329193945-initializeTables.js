'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	  await queryInterface.createTable('users', {
		  id: {
			  type: Sequelize.INTEGER,
			  primaryKey: true,
			  autoIncrement: true
		
		  },
		  username: {
			  type: Sequelize.STRING,
			  allowNull: false
		  },
		  password: {
			  type: Sequelize.STRING,
			  allowNull: false
		  },
		  createdAt: {
			  type: Sequelize.DATE,
			  allowNull: false
		  },
		  updatedAt: {
			  type: Sequelize.DATE,
			  allowNull: false
		  }
	  });
	await queryInterface.createTable('chat_rooms', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});
	  await queryInterface.createTable('messages', {
	  	id: {
			type : Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}, 
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		chatRoomId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'chat_rooms',
				key: 'id'
			}
		},
		message: {
			type: Sequelize.STRING,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false
		}
	  });
		await queryInterface.createTable('chat_room_users', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			chatRoomId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'chat_rooms',
					key: 'id'
				}
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	  await queryInterface.createTable('read_receipts', {
		  id: {
			  type: Sequelize.INTEGER,
			  primaryKey: true,
			  autoIncrement: true
		  },
		  messageId: {
			  type: Sequelize.INTEGER,
			  allowNull: false,
			  references: {
				  model: 'messages',
				  key: 'id'
			  }
		  },
		  userId: {
			  type: Sequelize.INTEGER,
			  allowNull: false,
			  references: {
				  model: 'users',
				  key: 'id'
			  }
		  },
		  createdAt: {
			  type: Sequelize.DATE,
			  allowNull: false
		  },
		  updatedAt: {
			  type: Sequelize.DATE,
			  allowNull: false
		  }
	  });
  },

  async down (queryInterface, Sequelize) {
	  await quertInterface.dropTable('users');
	  await queryInterface.dropTable('chat_rooms');
	  await queryInterface.dropTable('messages');
	  await queryInterface.dropTable('chat_room_users');
	  await queryInterface.dropTable('read_receipts');
  }
};
