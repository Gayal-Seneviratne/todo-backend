import { MigrationInterface, QueryRunner,  Table, TableIndex  } from "typeorm";

export class CreateTaskTable1761476607055 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'task',
      columns: [
        {
          name: 'id',
          type: 'char',
          length: '36',
          isPrimary: true,
          isNullable: false
        },
        {
          name: 'title',
          type: 'varchar',
          length: '200',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'status',
          type: 'enum',          
          enum: ['PENDING', 'IN_PROGRESS', 'DONE'],
          default: `'PENDING'`,
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    }), true);

    await queryRunner.createIndex(
      'task',
      new TableIndex({
        name: 'IDX_TASK_TITLE',
        columnNames: ['title'],
      })
    );

    await queryRunner.createIndex(
      'task',
      new TableIndex({
        name: 'IDX_TASK_STATUS',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('task', 'IDX_TASK_STATUS');
    await queryRunner.dropIndex('task', 'IDX_TASK_TITLE');
    await queryRunner.dropTable('task');    
  }   
}
